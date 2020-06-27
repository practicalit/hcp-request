import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';
import { IndividualService } from 'src/app/services/individual.service';
import { BaseIndividualComponent } from 'src/app/models/base.individual.component';

@Component({
  selector: 'app-awesome-professionals',
  templateUrl: './awesome-professionals.component.html',
  styleUrls: ['./awesome-professionals.component.css']
})
export class AwesomeProfessionalsComponent extends BaseIndividualComponent implements OnInit {
  professionals: any[];

  constructor(
    private dashboardService: DashboardService,
    protected individualService: IndividualService) {
      super();
  }

  ngOnInit(): void {
    this.dashboardService.getProfessionals().subscribe(response => {
      if (response.success) {
        this.professionals = response.data;
      } 
    })
  }

}

