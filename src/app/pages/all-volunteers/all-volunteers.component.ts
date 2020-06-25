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
  massage: string;
  submitted: boolean;
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

  /**
   * Handler for the status change button
   * @todo this method shall toggle between activate and deactivate based on the 
   * current active value of the individual. So if the individual is active, it sets it 
   * to deactive and vice versa.
   * 
   * @param individual_id - the individual id whose status is to be changed
   * @param event - the button that is clicked - needed to change its label
   */
  public changeStatus(individual_id: number, event: any) {
    this.individualService.changeStatus(individual_id, 0).subscribe(response => {
      console.log(response);
      if (response.success) {
        //if changing the state happened correctly, then switch the text to 'activate'
        event.target.innerHTML = 'Activate';
      }
    })
  }
};
