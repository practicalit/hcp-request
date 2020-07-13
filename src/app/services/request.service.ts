import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { HelpRequest } from '../models/help.request.model.';
import { CommentRequest } from '../models/comment.model';

/**
 * @author Kaleb W. <info@thepracticalit.com>
 * 
 * Service for any help request related stuff.
 */
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient,
    private authService: AuthenticationService) { }

    /**
   * Register new Professional or Volunteer
   * @param individual 
   */
  public postRequest(request: HelpRequest):Observable<any> {
    
    let url:string = `${environment.server}${environment.requestEndPoint}`; 

    return this.http.post<any>(
      url, request, this.getBasicHeader()
      );
  }

  public postComment(request: CommentRequest):Observable<any> {
   
    let url:string = `${environment.server}${environment.addCommentEndPoint}`; 

    return this.http.post<any>(
      url, request, this.getBasicHeader()
      );
  }

  /**
   * List current requests
   * 
   * @param list of requests
   */
  public getComments(request_id: number):Observable<any> {
    if (request_id) {
    let url:string = `${environment.server}${environment.commentsListEndPoint}`; 
    url += `&request_id=${request_id}`;
    return this.http.get<any>(
      url, this.getBasicHeader()
    );
    }
  }
  public listRequest():Observable<any> {
    let url:string = `${environment.server}${environment.requestListEndPoint}`; 
    return this.http.get<any>(
      url, this.getBasicHeader()
    );
  }

  /**
   * Get request by id
   * @param requestId
   */
  public listById(requestId:number) {
    if (requestId) {
      let url:string = `${environment.server}${environment.requestByIdEndPoint}`; 
      url += `&request_id=${requestId}`;
      return this.http.get<any>(
        url, this.getBasicHeader()
      );
    }
  }

  /**
   * Handling the volunteers initiative to work on the request.
   * 
   * @param request_id 
   * @param volunteer_id 
   */
  public taskPicked(request_id: number, volunteer_id: number): Observable<any> {
    if (request_id && volunteer_id) {
      let url:string = `${environment.server}${environment.requestPickedEndPoint}`; 
      return this.http.post<any>(
        url, {request_id: request_id, individual_id: volunteer_id}, this.getBasicHeader()
      );
    }
  }

  /**
   * Get all the good volunteers who are working on the given request
   * 
   * @param request_id 
   * @param volunteer_id 
   */
  public awesomeVolunteers(request_id: number): Observable<any> {
    if (request_id) {
      let url:string = `${environment.server}${environment.awesomeVolunteerEndPoint}`; 
      url += `&request_id=${request_id}`;
      return this.http.get<any>(
        url, this.getBasicHeader()
      );
    }
  }

  public removeRequest(request_id: number): Observable<any> {
    if (request_id) {
      let url:string = `${environment.server}${environment.requestRemoveEndPoint}`; 
      return this.http.post<any>(
        url, {request_id: request_id}, this.getBasicHeader()
      );
    } 
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