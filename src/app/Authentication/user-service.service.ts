import { Injectable } from '@angular/core';
import { User } from './User.model';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  isAuthenticated: boolean = false;
  private tokenTimer: any;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    
    return this.token;
  }

  getAuthenticationStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  registerUser(user: User) {
    const userNew = {
      fullName: user.fullName,
      emailId: user.emailId,
      password: user.password,
      registeredOn: null,
      postId: null
    }

    this.http.post<{message: string, user : User}>
    ("http://localhost:3000/api/user/signup", userNew)
    .subscribe((data) => {
          console.log(data.message);
          console.log(data.user)
    })
  };

  checkLogin(user : User) {
    
    this.http.post<{ token: string, expiresIn: number }>
    ("http://localhost:3000/api/user/login", user)
    .subscribe((data) => {
      
      const token = data.token;
      this.token = token;
      if(token) {
        const expiresInDuration = data.expiresIn;
        this.setTokenTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expiryDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthenticationData(token, expiryDate);
        console.log(expiryDate);
      }
      this.router.navigate(['/postList'])
      console.log(this.token);
    })
  }

  logout() {
    
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthenticationData();
    this.router.navigate(['/']);

  }

  //TO AUTOMATICALLY LOGIN AGAIN 
  autoAuthorization() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return
    }
    console.log(authInformation);
    const now = new Date();
    const expiresIn = authInformation.expiryDate.getTime() - now.getTime();

    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setTokenTimer(expiresIn / 1000);
      this.authStatusListener.next(true); 
    }
  }

  //TO STORE DATA WHEN WE LOGIN
  saveAuthenticationData(token: string, expiryDate: Date) {
    localStorage.setItem("Token", token);
    localStorage.setItem("ExpiryDate", expiryDate.toISOString());
  }

  //TO CLEAR DATA ONCE WE LOGOUT 
  clearAuthenticationData() {
    localStorage.removeItem("Token");
    localStorage.removeItem("ExpiryDate");
  }

  //TO GET DATA FOR AUTOMATIC LOGIG IN INCASE OF REFREASH
  private getAuthData() {
    const token = localStorage.getItem("Token");
    const expiryDate = localStorage.getItem("ExpiryDate");
    if(!token || !expiryDate) {
      
      return
    }
    return {
      token: token,
      expiryDate: new Date(expiryDate)
    }
  }

  //TO SET A TIMER FOR THE  AUTH
  private setTokenTimer(duration: number) {
    console.log("setting timmer" + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
   
  }
}
