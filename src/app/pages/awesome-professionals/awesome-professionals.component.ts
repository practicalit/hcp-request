import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-awesome-professionals',
  templateUrl: './awesome-professionals.component.html',
  styleUrls: ['./awesome-professionals.component.css']
})
export class AwesomeProfessionalsComponent implements OnInit {
  private professionals: any[];
  private requests: any;


  constructor(
    private dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.dashboardService.getProfessionals().subscribe(response => {
      if (response.success) {
        this.professionals = response.data;
      } else {
        //check this again. Failure from service is only login issue?
        //this.redirect('/login');
      }
    })
  }

}

