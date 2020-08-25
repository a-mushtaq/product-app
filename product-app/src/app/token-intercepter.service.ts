import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import{HttpInterceptor} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{

  constructor(private authService:AuthenticationService) { }
  intercept(req, next) {
    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.authService.getToken()}` 
      }
    })

    return next.handle(tokenizedReq);
  }
}
