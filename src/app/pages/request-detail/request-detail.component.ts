import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.logged_member_id = this.authService.getLoggedMemberId();
    this.activatedRoute.paramMap.subscribe(
      params => { 
        this.request_id = Number(params.get('requestId'));
        if (this.request_id != null && this.request_id) {
          //fetch associated data using the id fetched
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
      }
    );
  }

  /**
   * Check if the current user owns the request or not.
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
}
