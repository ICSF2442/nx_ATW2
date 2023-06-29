import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RestService } from 'src/app/shared/services/rest.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[RestService, UserSessionService]
})
export class HomeModule { }
