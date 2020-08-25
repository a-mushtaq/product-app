import { AuthenticationService } from './authentication.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WELCOME TO MY PRODUCT APP';

  constructor(public authService:AuthenticationService){}
}
