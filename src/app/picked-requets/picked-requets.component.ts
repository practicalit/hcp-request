import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-picked-requets',
  templateUrl: './picked-requets.component.html',
  styleUrls: ['./picked-requets.component.css']
})
export class PickedRequetsComponent implements OnInit {

  logged_member_id: number;
  request_id: number;
  request_already_picked: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

}

//public taskPicked() {
  this.requestService.taskPicked(this.request_id, this.logged_member_id).subscribe(
    response => {
      if (response.success) {
        this.request_already_picked = true;
      }
    }
  );
//}
