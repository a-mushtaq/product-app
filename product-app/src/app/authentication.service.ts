import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  _url='http://localhost:3000/admin/login';

  constructor(private http:HttpClient, private router:Router) { }

  loginUser(user)
  {
      return this.http.post<any>(this._url,user)
  }

  isLoggedIn()
  {
    return !!localStorage.getItem('token');
  }

  getToken()
  {
    return localStorage.getItem('token');
  }
  
  logoutUser()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
