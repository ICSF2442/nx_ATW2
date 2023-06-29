import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  model: any = {};


  constructor(private router:Router, private rest: RestService, private user: UserSessionService){
  }

  ngOnInit(): void {
  }




  goToLogin(){
    this.router.navigate(['/login']);
  }
//username: string, email:string, password: string, birthday:Date
  register(){
    if(this.model.password == this.model.rep_password){
      this.user.register(this.model.username, this.model.email, this.model.password, this.model.birthday);
    }else{
      alert("Passwords não correspondem!")
    }
    
  }

}
