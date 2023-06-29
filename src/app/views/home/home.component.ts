import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private rest:RestService, private user: UserSessionService){

  }

  ngOnInit(): void {
    /*this.rest.request("users/accessUser.php",
      {
        email:"icsf@gmail.com",
        password:"123"
      }).then((res: any) => {
      console.log("Bem-vindo", res.result.username);
    })*/
    
  }



}
