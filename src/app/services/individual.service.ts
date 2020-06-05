import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
import { Individual } from '../models/individual.model';
import { AuthenticationService } from './authentication.service';

/**
 * Service class for individuals
 * @author Kaleb W. <info@thePracticalIT.com>
 */
@Injectable({
  providedIn: 'root'
})
export class IndividualService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) { }

  /**
   * Register new Professional or Volunteer
   * @param individual 
   */
  public register(individual: Individual):Observable<any> {
    let $url = `${environment.server}${environment.balemuyaEndPoint}`;

    return this.http.post<any>(
      $url, individual, this.getBasicHeader()
      );
  }

  /**
   * Update the role of the member.
   * @param role_id 
   */
  public updateRole(role_id: number):Observable<any> {
    let individual_id = this.authService.getLoggedMemberId();
    let $url = `${environment.server}${environment.individualUpdateEndPoint}`;
    let payload = {role_id: role_id, individual_id: individual_id};
    return this.http.post<any>(
      $url, payload, this.getBasicHeaderWithAuth()
      );
  }

  private getBasicHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  //move this upstairs than copying for all services here and there.
  private getBasicHeaderWithAuth() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${this.authService.getToken()}`
      })
    };
  }
}
