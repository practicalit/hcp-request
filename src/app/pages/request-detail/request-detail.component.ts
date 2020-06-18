import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  title: string;
  message: string;
  first_name: string;
  last_name: string;
  priority: string;
  date_created: Date;
  request_owner_id: number;
  remove_request: boolean = false;
  logged_member_id: number;
  show_confirm_cancel: boolean = false;
  removal_content: string = "";//temporary removal action placeholder.
  request_id: number;
  total_volunteers: number;
  //this is to show if the current volunteer has picked the request.
  request_already_picked = false;
  editRequestForm: FormGroup;
  formVisibility = {
    title: false,
    message: false,
    priority: false
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.logged_member_id = this.authService.getLoggedMemberId();
    this.activatedRoute.paramMap.subscribe(
      params => { 
        this.request_id = Number(params.get('requestId'));
        if (this.request_id != null && this.request_id) {
          //fetch associated data using the id fetched
          this.getRequestDetail();
          this.getAwesomeVolunteers();
        }
      }
    );
    
  }

  updateFormVisibility (element) {
    this.formVisibility[element] = true;
  }

  /**
   * Event handler to respond when the volunteer is picking the task.
   */
  public taskPicked() {
    //get the id of the request and the id of the volunteer.
    this.requestService.taskPicked(this.request_id, this.logged_member_id).subscribe(
      response => {
        if (response.success) {
          this.request_already_picked = true;
        }
      }
    );
  }

  /**
   * Check if the current professional owns the request or not.
   * This helps to determine to see owner specific tasks
   * like deleting the request.
   */
  memberOwnsRequest() {
    return this.logged_member_id === this.request_owner_id
  }

  removeRequest() {
    this.remove_request = true;
    this.show_confirm_cancel = true;
  }

  cancelRemove() {
    this.show_confirm_cancel = false;
    this.removal_content = "";
  }

  confirmRemove() {
    this.removal_content = "Removal triggered."
  }
  /**
   * get the volunteers associated with the request.
   */
  private getAwesomeVolunteers() {
    this.requestService.awesomeVolunteers(this.request_id).subscribe(
      response => {
        if (response.success) {
          this.total_volunteers = response.data.length;
          const volunteer_picked_request = volunteer => volunteer.individual_id === this.logged_member_id;
          if (Array.isArray(response.data)) {
            this.request_already_picked = response.data.some(volunteer_picked_request);
          }
        }
      }
    );
  }

  /**
   * populate the request details 
   */
  private getRequestDetail() {
    this.requestService.listById(this.request_id).subscribe(
      response => {
        if (response.success) {
          this.title = response.data.title;
          this.message = response.data.request;
          this.first_name = response.data.first_name;
          this.last_name = response.data.last_name;
          this.priority = response.data.name;
          this.date_created = response.data.date_created;
          this.request_owner_id = response.data.individual_id;
        }
      }
    );
  }

  onSubmit(){

  }
}
