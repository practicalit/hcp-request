import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http:HttpClient,
    private authService: AuthenticationService
  ) { }

  /**
   * Get the list of states 
   */
  public getStates():Observable<any> {
    let url = `${environment.server}${environment.statesEndPoint}`;
    return this.http.get(url, this.getBasicHeader());
  }

  /**
   * Get the list of cities by the state 
   */
  public getCities(state_id):Observable<any> {
    let url = `${environment.server}${environment.citiesEndPoint}&state_id=${state_id}`;
    return this.http.get(url, this.getBasicHeader());
  }

  //move this upstairs than copying for all services here and there.
  private getBasicHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${this.authService.getToken()}`
      })
    };
  }
}
