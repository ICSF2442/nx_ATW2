import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: any = {};

  sessionUpdatedSubscribe?: Subscription;

  constructor(private router:Router, private rest: RestService, private user: UserSessionService){
  }

  ngOnInit(): void {
    this.user.sessionUpdated.subscribe((res: any) => {
      console.log("Sessão atualizada!");
    });
  }

  ngOnDestroy(): void {
    if(this.sessionUpdatedSubscribe){
      this.sessionUpdatedSubscribe.unsubscribe();
    }
  }

  goToRegister(){
    this.router.navigate(['/register']);

  }

  login(){
    this.user.login(this.model.email, this.model.password);
    this.router.navigate(['/user']);
  }
}
