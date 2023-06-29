import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/shared/services/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  modal_1_shown: boolean = false;
  calculusList: any[] = [];
  new_calculus: any = '';
  constructor(private rest: RestService, private router: Router){
  }


  ngOnInit(): void {
    this.getCalculusList();
  }


  getCalculusList(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.rest.request("calculus/getListCalculus.php", {

      }).then((res:any)=> {
        if(res.isError){
          console.log("Erro");
        } else {
          console.log(res.result);
          this.calculusList = res.result;
          console.log("Obtido lista de candidatos!");
        }
      })
    })
  }
  goToLogout(){
    this.rest.request("users/logoutUser.php", {}).then((res:any) => {
      this.router.navigate(['/login']);
    })
  }
  goToCalculusList(){
    this.router.navigate(['/user']);
  }

  createNewCalculus(){
    
    if(!this.new_calculus || this.new_calculus.trim().length == 0){
      alert("Insira um nome!");
      return;
    }
    return new Promise((resolve, reject) => {
      this.rest.request("calculus/addCalculus.php", {
        name: this.new_calculus,
      }).then((res:any)=> {
        if(res.isError){
          console.log("Erro");
        } else {
          this.new_calculus = null;
          this.getCalculusList();
          this.modal_1_shown = false;
        }
      })
    })

  }

  goToCalculus(id: any){
    this.router.navigate(['/calculus', id]);
  }

}
