import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

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
      { "login_method":user, "email": user.email, "first_name": user.first_name, "last_name": user.last_name }, this.getBasicHeader()
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
      console.log(user);
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