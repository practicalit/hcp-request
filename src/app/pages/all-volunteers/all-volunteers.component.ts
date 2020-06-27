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
        console.log(this.volunteers)
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
  public changeStatus(individual_id: string, currentStatus: number, event: any) {
    var Status = currentStatus == 0 ? 1 : 0;
    this.individualService.changeStatus(Number.parseInt(individual_id), Status).subscribe(response => {
      if (response.success) {
        var individual = this.volunteers.filter(v => v.individual_id == individual_id)[0];
        individual.active = Status;
        //if changing the state happened correctly, then switch the text to 'activate'
        event.target.innerHTML = individual.active == 0 ? 'Activate' : 'Deactivate';
      }
    })
  }
};
