import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { IndividualService } from '../services/individual.service';
import { Individual } from '../models/individual.model';
import { Constants } from '../models/constants.model';
import { constants } from 'buffer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;

  message: string;
  states: Array<any>;
  cities: Array<any>;
  email: string;
  firstName: string;
  lastName: string;
  editable: boolean = false;
  state: string;
  city: string;

  constructor(
    private authService: AuthenticationService,
    private locationService: LocationService,
    private individualService: IndividualService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.editForm = this.formBuilder.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['']
    });

    this.email = this.authService.getLoggedMemberProperty(Constants.EMAIL);
    this.editForm.controls.email.setValue(this.email);
    this.firstName = this.authService.getLoggedMemberProperty(Constants.FIRST_NAME);
    this.editForm.controls.firstName.setValue(this.firstName);
    this.lastName = this.authService.getLoggedMemberProperty(Constants.LAST_NAME);
    this.editForm.controls.lastName.setValue(this.lastName);
    this.state = this.authService.getLoggedMemberProperty(Constants.STATE);
    this.city = this.authService.getLoggedMemberProperty(Constants.CITY);
    
  }

  private populateState() {
    this.locationService.getStates().subscribe(
      result => {
        this.states = result.data;
      }
    );
  }

  /**
   * Populate the city based on the state selected.
   */
  populateCity(state_id: number) {
    if (state_id != null && state_id > 0) {
      this.locationService.getCities(state_id).subscribe(
        response => {
          this.cities = response.data;
          if (this.cities != null && this.cities.length > 0) {
            this.editForm.controls.city.setValue(this.authService.getLoggedMemberProperty(Constants.CITY_ID));
          }
        }
      );
    }
  }

  /**
   * Handle the submission to update the individual information
   */
  onSubmit() {
    //if (this.editForm.valid) {
      let individual = new Individual();
      individual.first_name = this.editForm.controls.firstName.value;
      individual.last_name = this.editForm.controls.lastName.value;
      individual.email = this.editForm.controls.email.value;
      individual.state_id = this.editForm.controls.state.value;
      individual.city_id = this.editForm.controls.city.value;
      this.individualService.update(individual).subscribe(
        response => {
          if (response.success) {
            this.message = "successfully updated";
            //update the properties if those have been updated.
            this.authService.setLoggedMemberProperty(Constants.FIRST_NAME, individual.first_name);
            this.authService.setLoggedMemberProperty(Constants.LAST_NAME, individual.last_name);
            this.authService.setLoggedMemberProperty(Constants.EMAIL, individual.email);
            this.authService.setLoggedMemberProperty(Constants.STATE_ID, individual.state_id);
            this.authService.setLoggedMemberProperty(Constants.CITY_ID, individual.city_id);
          }
        }
      );
    //}
  }

  switchEditable() {
    this.editable = true;
    //populate the state
    this.populateState();
    this.editForm.controls.state.setValue(this.authService.getLoggedMemberProperty(Constants.STATE_ID));
    this.populateCity(this.authService.getLoggedMemberProperty(Constants.STATE_ID));
  }

}
