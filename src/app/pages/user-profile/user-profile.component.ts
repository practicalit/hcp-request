import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  email: string;
  firstName: string;
  lastName: string;
  constructor(
    private authService: AuthenticationService
  ) { }
  ngOnInit() {
    this.email = this.authService.getEmail();
    this.firstName = this.authService.getFirstName();
    this.lastName = this.authService.getLastName();
  }

}
