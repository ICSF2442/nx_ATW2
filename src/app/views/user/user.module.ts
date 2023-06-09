import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ModalComponent } from 'src/app/modal/modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,ModalComponent
  ],
  imports: [
    CommonModule, FormsModule
  ]
})
export class UserModule { }
