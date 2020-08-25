import { SignupComponent } from './signup/signup.component';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';

import { AuthGuard } from './auth.guard';
import { CatalougeComponent } from './catalouge/catalouge.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'/products',pathMatch:'full'},
  {path:'products', component: ProductListComponent},
  {path:'login', component: LoginComponent},
  {path:'catalouge', component:CatalougeComponent, canActivate:[AuthGuard]},
  {path:'addUpdate/:id',component:AddUpdateProductComponent},
  {path:'register',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
