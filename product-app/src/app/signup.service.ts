import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }


  signUp(user):Observable<String>
  {
    return this.http.post<String>('http://localhost:3000/admin/signup',user)
  }
}
