import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-awesome-volunteers',
  templateUrl: './awesome-volunteers.component.html',
  styleUrls: ['./awesome-volunteers.component.css']
})
export class AwesomeVolunteersComponent implements OnInit {
  private volunteers: any[]
  private requests: any
  constructor(
    private requestservice: RequestService
  ) { }

  ngOnInit(): void {
    this.volunteers = []
    this.requestservice.listRequest().subscribe(
      response => {
        if (response.success) {
          this.requests = response.data;
          if (this.requests)
            this.requests.forEach(request => {
              this.requestservice.awesomeVolunteers(request.request_id).subscribe(vtrs => {
                if (vtrs.data)
                  vtrs.data.forEach(vtr => {
                    this.volunteers.push(vtr);
                  });
              })
            });
        } else {
          return "list request returned failur"
        }
      }
    );
  }

}
