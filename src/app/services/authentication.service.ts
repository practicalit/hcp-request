import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


/**
 * Authentication handler service.
 * 
 * @author Practical IT <info@thepracticalit.com>
 * 
 */
const CURRENT_USER = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  tokenHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
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

  public authenticate(email: string, password: string): Observable<any> {
    //server and end point are stored in the environment config
    return this.http.post<any>(
      `${environment.server}${environment.authEndPoint}`,
      { "email": email, "password": password }, this.getBasicHeader()
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
   *  Function to populate FirstName of the logger user
   */
  public getFirstName(): string {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      return user.data.firstName;
    }
    return null;
  }

  /**
   * Function to populate LastName of the logger user
   */
  public getLastName(): string {
    if (this.logged) {
      let user = JSON.parse(localStorage.getItem(CURRENT_USER));
      return user.data.lastName;
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