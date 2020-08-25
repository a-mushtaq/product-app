import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData={id:null,password:null};
  
  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  loginUser()
  {
      this.auth.loginUser(this.loginUserData).
      subscribe(
        data=>{
          localStorage.setItem('token',data.token);
          this.router.navigate(['/catalouge'])
        },
        err=>console.log(err)
      )
  }
}
