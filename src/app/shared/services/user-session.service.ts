import { EventEmitter, Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor(private rest: RestService, private router: Router) { 

    this.checkSession().then((res: any) => {
      if(!this.getSessionStatus()){
        this.router.navigate(['/login']);
      }
    })

  }
  private sessionStatus: boolean = false;

  sessionUpdated: EventEmitter<any> = new EventEmitter();

  getSessionStatus(): boolean {
    return this.sessionStatus;
  }

  checkSession(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.rest.request("users/checkSession.php").then((res: any) => {
        this.sessionStatus = res.result.status;
        resolve(res.result.status);
      })
    });
  }
  

  login(email: string, password: string): Promise<any>{
    return new Promise((resolve, reject) => {
    this.rest.request("users/accessUser.php", {
      email: email,
      password: password
    }).then((res: any)=> {
      if(res.isError){
        console.log("credenciais inválidas");
        this.sessionStatus = false;
      } else {
        console.log("logado");
        this.sessionStatus = true;
        
      }
      this.sessionUpdated.emit(this.sessionStatus);
    })
  });
  }
  register(username: string, email:string, password: string, birthday:Date ): Promise<any>{
    return new Promise((resolve, reject) => {
      this.rest.request("users/createUser.php", {
        username: username,
        email: email,
        password: password,
        birthday: birthday
      }).then((res:any)=> {
        if(res.isError){
          console.log("Erro");
        } else {
          console.log("Usuario criado");
          this.router.navigate(['/login']);
        }
      })
    })
  }

  

}
