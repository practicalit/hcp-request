import { Component, OnInit } from '@angular/core';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { DashboardService } from 'src/app/dashboard.service';
import { BaseIndividualComponent } from 'src/app/models/base.individual.component';
import { IndividualService } from 'src/app/services/individual.service';

@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css']
})
export class AllVolunteersComponent extends BaseIndividualComponent implements OnInit {

  volunteers: any[];

  constructor(
    private dashboardService: DashboardService,
    protected individualService: IndividualService) {
      super();
  }

  ngOnInit(): void {
    this.dashboardService.getVolunteers().subscribe(response => {
      if (response.success) {
        this.volunteers = response.data;
      } 
    })
  }
}
