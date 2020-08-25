import { Router } from '@angular/router';
import { SignupService } from './../signup.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user={
    name:null,
    id:null,
    password:null
  }

  constructor(private regsService:SignupService, private router:Router) { }

  ngOnInit(): void {
  }

  signUp()
  {
      this.regsService.signUp(this.user).subscribe(
        data=>{
          console.log(data);
          this.router.navigate(['/login']);
        },
        err=>console.log(err)
      )
  }
}
