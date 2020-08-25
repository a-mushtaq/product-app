import { TokenIntercepterService } from './token-intercepter.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CatalougeComponent } from './catalouge/catalouge.component';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    LoginComponent,
    CatalougeComponent,
    AddUpdateProductComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenIntercepterService,
    multi:true
  },AddUpdateProductComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
