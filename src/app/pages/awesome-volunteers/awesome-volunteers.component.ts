import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-awesome-volunteers',
  templateUrl: './awesome-volunteers.component.html',
  styleUrls: ['./awesome-volunteers.component.css']
})
export class AwesomeVolunteersComponent implements OnInit {
  volunteers: any[]
  requestor_first_name: string;
  requestor_last_name: string;
  request_title: string;

  constructor(
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute
  ) { }

  //request id for which volunteers are to be picked.
  request_id: number;
  
  requestedBy: string;
  ngOnInit(): void {
    this.volunteers = [];
    //first get the request id that is passed from the link
    this.activatedRoute.paramMap.subscribe(
      params => { 
        this.request_id = Number(params.get('requestId'));
        if (this.request_id != null && this.request_id) {
          //fetch associated data using the id fetched
          this.requestService.awesomeVolunteers(this.request_id).subscribe(
            response => {
              console.log(response.data);
              if (response.success && response.data.length > 0) {
                /*the API returns the requestor info as 
                 *requestor_first_name, requestor_last_name and title as title.
                 * the first record and get the data.
                 */
                this.request_title = response.data[0].title;
                this.requestor_first_name = response.data[0].requestor_first_name;
                this.requestor_last_name = response.data[0].requestor_last_name;
                this.volunteers = response.data;
              }
            }
          );      
        }
      }
    );
    
  }

}
