import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-awesome-volunteers',
  templateUrl: './awesome-volunteers.component.html',
  styleUrls: ['./awesome-volunteers.component.css']
})
export class AwesomeVolunteersComponent implements OnInit {
  private volunteers: any[]
  private requests: any
  constructor(
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute
  ) { }

  //request id for which volunteers are to be picked.
  request_id: number;
  title: string;
  requestedBy: string;
  ngOnInit(): void {
    this.volunteers = [];
    //first get the request id that is passed from the link
    this.activatedRoute.paramMap.subscribe(
      params => { 
        this.request_id = Number(params.get('requestId'));
        this.title = params.get('title');
        this.requestedBy = params.get('requestedBy');
        if (this.request_id != null && this.request_id) {
          //fetch associated data using the id fetched
          this.requestService.awesomeVolunteers(this.request_id).subscribe(
            response => {
              if (response.success) {
                this.volunteers = response.data;
              }
            }
          );      
        }
      }
    );
    
  }

}
