import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/security/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  constructor(private auth: AuthenticationService,
              private cookies: CookieService){}

      
  ngOnInit(): void {
    if(this.isCookkieAppear()){
      sessionStorage.setItem('email', this.cookies.get('email'));
      sessionStorage.setItem('token', this.cookies.get('token'));
    }
  }

  isCookkieAppear(){
    if(this.cookies.get('email') === '' || this.cookies.get('token') === ''){
      return false;
    }
    return true;
  }  

  isLogin() {
    return this.auth.isLogin();
  }
}
