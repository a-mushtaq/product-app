import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthenticationService, private router:Router){}
 
  canActivate():boolean
  {
    if(this.authService.isLoggedIn()) return true;
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
