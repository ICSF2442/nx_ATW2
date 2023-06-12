import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UserComponent } from './views/user/user.component';

const routes: Routes = [
  {path:'login',loadChildren:()=>import('./views/login/login.module').then(m=>m.LoginModule),component:LoginComponent},
  {path:'register',loadChildren:()=>import('./views/register/register.module').then(m=>m.RegisterModule),component:RegisterComponent},
  {path:'user',loadChildren:()=>import('./views/user/user.module').then(m=>m.UserModule),component:UserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
