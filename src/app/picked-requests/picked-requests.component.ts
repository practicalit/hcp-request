import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-picked-requests',
  templateUrl: './picked-requests.component.html',
  styleUrls: ['./picked-requests.component.css']
})
export class PickedRequestsComponent implements OnInit {

  request_id: number;
  logged_member_id: number;
  request_already_picked: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService,
    private authService: AuthenticationService
  ) { }
  //ngOnInit(): void {
    //throw new Error('Method not implemented.');
  //}

 
  }
