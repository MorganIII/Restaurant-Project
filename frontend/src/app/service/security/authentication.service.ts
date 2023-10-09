import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = 'http://localhost:8080/';
  
  constructor(private http: HttpClient,
              private cookies: CookieService) { }


  authenticate(email: string, password: string): Observable<any > { 
    return this.http.post<any>(`${this.baseUrl}signin`, {email, password}).pipe(
      map(
        response =>{
          sessionStorage.setItem('email', response.email);
          sessionStorage.setItem('token', `Bearer ${response.token}`);
          this.cookies.set('token', `Bearer ${response.token}`);
          this.cookies.set('email', response.email);
          return response;
        }
      )
    );
  }

  checkActivation(email: string, password: string): Observable<any > { 
    return this.http.post<any>(`${this.baseUrl}active`, {email, password}).pipe(
      map(
        response =>{
          return response;
        }
      )
    );
  }

  activateEmail(email: string, code: string): Observable<any> { 
    return this.http.post<any>(`${this.baseUrl}activation-req`, {email, code}).pipe(
      map(
        response =>{
          return response;
        }
      )
    );
  }

  sendCodeToResetPassword(email: string): Observable<any> { 
    return this.http.post<any>(`${this.baseUrl}send-code`, {email}).pipe(
      map(
        response =>{
          return response;
        }
      )
    );
  }

  resetPassword(email: string, password:string,code: string): Observable<any > { 
    return this.http.post<any>(`${this.baseUrl}reset-password`, {email, password, code}).pipe(
      map(
        response =>{
          return response;
        }
      )
    );
  }

  signup(email: string, password: string): Observable<any > { 
    return this.http.post<any>(`${this.baseUrl}signup`, {email, password}).pipe(
      map(
        response =>{
          return response;
        }
      )
    );
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem('email');
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser()){
      return sessionStorage.getItem('token');
    }
    return null;
  }

  isLogin() {
    if(this.getAuthenticatedUser() && this.getAuthenticatedToken()){
      return true;
    }
    return false;
  }

  logout(){
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    this.cookies.delete('email');
    this.cookies.delete('token');
  }
}
