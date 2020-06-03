import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  email: string;
  firstName: string;
  lastName: string;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.email = this.authService.getEmail();
    this.firstName = this.authService.getFirstName();
    this.lastName = this.authService.getLastName();
  }

}
