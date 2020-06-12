import { Component, OnInit } from '@angular/core';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css']
})
export class AllVolunteersComponent implements OnInit {

  volunteers: any[];

  constructor(
    private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashboardService.getVolunteers().subscribe(response => {
      if (response.success) {
        this.volunteers = response.data;
      } 
    })
  }
}
