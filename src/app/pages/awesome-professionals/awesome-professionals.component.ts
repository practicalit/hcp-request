import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-awesome-professionals',
  templateUrl: './awesome-professionals.component.html',
  styleUrls: ['./awesome-professionals.component.css']
})
export class AwesomeProfessionalsComponent implements OnInit {
  professionals: any[];

  constructor(
    private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getProfessionals().subscribe(response => {
      if (response.success) {
        this.professionals = response.data;
      } 
    })
  }

}

