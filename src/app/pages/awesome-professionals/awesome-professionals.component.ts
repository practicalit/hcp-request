import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';
import { IndividualService } from 'src/app/services/individual.service';

@Component({
  selector: 'app-awesome-professionals',
  templateUrl: './awesome-professionals.component.html',
  styleUrls: ['./awesome-professionals.component.css']
})
export class AwesomeProfessionalsComponent implements OnInit {
  professionals: any[];

  constructor(
    private dashboardService: DashboardService,
    private individualService: IndividualService) {
  }

  ngOnInit(): void {
    this.dashboardService.getProfessionals().subscribe(response => {
      if (response.success) {
        debugger;
        this.professionals = response.data;
      } 
    })
  }

  Active(professional) {
    this.individualService.updateStatus(professional.individual_id, 1).subscribe(response => {
      if (response.success) {
        alert('success');
      } 
    })
  }

}

