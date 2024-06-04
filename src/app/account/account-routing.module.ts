import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationLoginComponent } from './organization-login/organization-login.component';


const routes: Routes = [
  {
    path: 'login',
    component: OrganizationLoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
