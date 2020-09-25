import { Component, OnInit } from '@angular/core';

import { Dashboard } from 'src/app/models/dashboard.model';
import { HelpRequest } from 'src/app/models/help.request.model.';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public clicked: boolean = true;
  public clicked1: boolean = false;
  public activeView: string = "REQUEST";

  member_role: string;
  request_id: number;
  logged_member_id: number;
  request_already_picked: boolean = false;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private authService: AuthenticationService,
    private dashboardService: DashboardService
  ) { }

  dashboard: Dashboard = new Dashboard();
  requests: Array<HelpRequest>;
  professtionals: Array<any>

  ngOnInit() {
    //check if user has role or not.

    let role: string = this.authService.getLoggedMemberProperty('role');
    if (role == null || role == 'UNKNOWN') {
      this.redirect('/add-role');
    } else {
      this.dashboardService.report().subscribe(
        result => {
          if (result.success) {
            this.dashboard.active = result.data.active_requests;
            this.dashboard.professionals = result.data.professionals;
            this.dashboard.volunteers = result.data.volunteers;
            this.dashboard.completed = result.data.completed;
          }
        }
      );

      this.requestService.listRequest().subscribe(
        response => {
          if (response.success) {
            this.requests = response.data.filter(resp => resp.status_name != 'REMOVED');
          } else {
            //check this again. Failure from service is only login issue?
            this.redirect('/login');
          }
        }
      );
    }

    this.member_role = this.authService.getRole();
  }

  public taskPicked() {
    this.requestService.taskPicked(this.request_id, this.logged_member_id).subscribe(
      response => {
        if (response.success) {
          this.request_already_picked = true;
        }
      }
    );
  }
  /**
   * move this to upstairs.
   * @param path 
   */
  private redirect(path: string) {
    this.router.navigate([path]);
  }

}
