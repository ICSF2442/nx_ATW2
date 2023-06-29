import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculusComponent } from './calculus.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CalculusComponent
  ],
  imports: [
    CommonModule, FormsModule
  ]
})
export class CalculusModule { }
