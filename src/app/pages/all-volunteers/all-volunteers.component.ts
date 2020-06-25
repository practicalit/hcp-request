import { Component, OnInit } from '@angular/core';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { DashboardService } from 'src/app/dashboard.service';
import { IndividualService } from 'src/app/services/individual.service';

@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css']
})
export class AllVolunteersComponent implements OnInit {

  volunteers: any[];
  massage:string;
  submitted: boolean;
  payload: any;
  volunteer_id: number;
  constructor(
    private dashboardService: DashboardService,
    private individualService: IndividualService,
    ) {
  }

  ngOnInit(): void {
    this.dashboardService.getVolunteers().subscribe(response => {
      if (response.success) {
        this.volunteers = response.data;
      } 
    })
  }
  public deactivateIndividual(individual_id: string) {
    this.payload = {
      individual_id: individual_id, 
      active: 0
    }
    this.individualService.DeactivatVolunteer(this.payload).subscribe(response => {
      if (response.success) {
      this.volunteers = this.volunteers.filter(v => v.volunteer_id != individual_id)
        this.massage = "succesfully Deactivated";
      } else {
        this.massage = "Not Deactivated, please try again"

      }
  })
  }
};
