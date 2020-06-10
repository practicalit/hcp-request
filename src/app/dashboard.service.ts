import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  /**
   * List dashboard values
   * 
   * @param list of requests
   */
  public report():Observable<any> {
    let url:string = `${environment.server}${environment.dashboardEndPoint}`; 
    return this.http.get<any>(
      url, this.getBasicHeader()
    );
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
