import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-volunteerall',
  templateUrl: './volunteerall.component.html',
  styleUrls: ['./volunteerall.component.css']
})
export class VolunteerallComponent implements OnInit {


  private volunteers: any[];
  private requests: any;

  constructor(

     private dashboardService: DashboardService,
     private activatedRoute: ActivatedRoute) {

     }

  ngOnInit(): void {
    this.dashboardService.getVolunteers().subscribe(response => {
      if (response.success) {
        this.volunteers = response.data;
      } else {
        //this.redirect('/login');
      }  

    }
  }
}  