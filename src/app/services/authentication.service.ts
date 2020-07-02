import { Injectable, NgZone } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

/**
 * Authentication handler service.
 * 
 * @author Practical IT <info@thepracticalit.com>
 * 
 */
const CURRENT_USER = 'currentUser';
const FACEBOOK_LOGIN_ID = 2;
const GOOGLE_LOGIN_ID = 3;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  tokenHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    private ngZone: NgZone,
    private router: Router
    ) {
  }

  /**
   * Getter and setter for the logged property.
   * This property is being used across the components/directives
   * hence needs to be checked on the central service.
   * @see Component
   */
  get logged(): Boolean {
    return localStorage.getItem(CURRENT_USER) !== null;
  }

  /**
   * Given the email and password, authenticate the member.
   * @param email 
   * @param password 
   */
  public authenticate(email: string, password: string): Observable<any> {
    //server and end point are stored in the environment config
    return this.http.post<any>(
      `${environment.server}${environment.authEndPoint}`,
      { "email": email, "password": password }, this.getBasicHeader()
    );
  }

  /**
   * Generic oAuth handler.
   * @param email 
   * @param first_name 
   * @param last_name 
   * @param login_method
   */
  public loginByOauth(user: User): Observable<any> {
    return this.http.post<any>(
      `${environment.server}${environment.oAuthLogin}`,
      { "login_method":user.login_method, "email": user.email, "first_name": user.first_name, "last_name": user.last_name }, this.getBasicHeader()
    );
  }

  /**
   * Store what is coming from the server as JWT
   * @param user 
   */
  public storeToken(user: any) {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
  }

  public removeToken() {
    localStorage.removeItem(CURRENT_USER);
  }

  public getToken(): string {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      return user.data.token;
    }

    return "";
  }

  /**
   * Get the id of the currently logged user.
   */
  public getLoggedMemberId() {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      console.log("the member id is " + user.data.individual_id);
      return user.data.individual_id;
    }
  }

  /**
   *  Method to populate FirstName of the logger user
   */
  public getFirstName(): string {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      return user.data.first_name;
    }
    return null;
  }

  /**
   * Generic method to get the property from the individual keys 
   * like first name, last name..
   * @param name 
   */
  public getLoggedMemberProperty(name: any) {
    if (this.logged) {

      let user = JSON.parse(localStorage.getItem(CURRENT_USER));    
      if (name in user.data) {
        return user.data[name];
      }
    }
  }

  /**
   * Generic method to set the property from the individual keys 
   * this is useful especially when update on property is happening
   * @param name 
   */
  public setLoggedMemberProperty(name: any, value: any) {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      if (name in user.data) {
         console.log('this is the case');
         user.data[name] = value;
         localStorage.setItem(CURRENT_USER, JSON.stringify(user));
      }
    }
    return null;
  }

  /**
   *  Method to populate FirstName of the logger user
   */
  public getRole(): string {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      return user.data.role;
    }
    return null;
  }

  public updateRole(role: string) {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      user.data.role = role;
      localStorage.setItem(CURRENT_USER, user);
    }
    return null;
  }

  /**
   * Method to populate LastName of the logger user
   */
  public getLastName(): string {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      return user.data.last_name;
    }
    return null;
  }
  public getState(): string {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      return user.data.state;
    }
    return null;
  }

  public getCity(): string {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      return user.data.city;
    }
    return null;
  }
  /**
   * Check if token has expired or not.
   */
  public isTokenExpired() {
    return this.tokenHelper.isTokenExpired(this.getToken());
  }

  public getEmail(): string {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      return user.data.email;
    }
    return null;
  }

  /**
   * handle the login by facebook. First check if the user exists
   * if not, register the member and proceed to the home page.
   * 
   * NgZone is required here specially when external process for google
   * and facebook is handled through promises. In that case, the application
   * is handled outside of angular and routing won't work as expected.
   * @more https://angular.io/api/core/NgZone
   * @param provider 
   */
  authLogin(provider) {
    this.afAuth.signInWithPopup(provider)
    .then((result) => this.ngZone.run( () => {
      if (result != null && result.additionalUserInfo) {
        this.handleOauth(result);
      }
    })).catch((error) => {
        console.log(error)
    })
  }

  handleOauth(result) {
    let user = new User();
    user.email = result.additionalUserInfo.profile.email;

    if (result.additionalUserInfo.providerId == 'google.com') {
      user.first_name = result.additionalUserInfo.profile.given_name;
      user.last_name = result.additionalUserInfo.profile.family_name;
      user.login_method = GOOGLE_LOGIN_ID;
    } else if (result.additionalUserInfo.providerId == "facebook.com") {
      user.first_name = result.additionalUserInfo.profile.first_name;
      user.last_name = result.additionalUserInfo.profile.last_name;
      user.login_method = FACEBOOK_LOGIN_ID;
    }
    
    this.loginByOauth(user).subscribe(
      user => this.handleLoginResponse(user)
    );
  }

  /**
   * Logout implementation for oAuth logins
   */
  public async oauthLogout() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  /**
   * Based on the response handle the redirect
   * @param user 
   */
  private handleLoginResponse(user) {
    if (user.success && user.data.token) {
      this.storeToken(user);
      this.redirectToDashboard();
    } else {
      this.removeToken();
      return false;
    }
  }

  private redirectToDashboard() {
    this.router.navigate(['/home']);
  }

  /**
   * get basic http header to be used by child classes.
   */
  private getBasicHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}