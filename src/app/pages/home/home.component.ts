import { Component, OnInit } from '@angular/core';

import { Dashboard } from 'src/app/models/dashboard.model';
import { HelpRequest } from 'src/app/models/help.request.model.';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  dashboard: Dashboard;
  requests: Array<HelpRequest>;

  ngOnInit() {
    //check if user has role or not.
    let role: string = this.authService.getRole();
    if (role == 'UNKNOWN') {
      this.redirect('/add-role');
    }

    this.dashboard = new Dashboard();
    this.dashboard.active = 100;
    this.dashboard.professionals = 236;
    this.dashboard.volunteers = 129;
    this.dashboard.completed = 44;

    this.requestService.listRequest().subscribe(
      response => {
        if (response.success) {
          this.requests = response.data;
        } else {
          //check this again. Failure from service is only login issue?
          this.redirect('/login');
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
