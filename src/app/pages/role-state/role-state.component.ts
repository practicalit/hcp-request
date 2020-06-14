import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndividualService } from 'src/app/services/individual.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Individual } from 'src/app/models/individual.model';

/**
 * When member uses social account like google and facebook to login
 * they don't select the role and regions. Hence here they will be given 
 * a chance to add that one.
 */
@Component({
  selector: 'app-role-state',
  templateUrl: './role-state.component.html',
  styleUrls: ['./role-state.component.css']
})
export class RoleStateComponent implements OnInit {

  roleForm: FormGroup;
  states = [];
  cities = [];
  role_id: number;

  constructor(
    private formBuilder: FormBuilder,
    private individualService: IndividualService,
    private authService: AuthenticationService,
    private router: Router,
    private locationService: LocationService) { }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      role: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    });

    //populate the state
    this.populateState();
  }

  /**
   * Populate state
   */
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
  populateCity() {
    let state_id = this.roleForm.get('state').value;
    this.locationService.getCities(state_id).subscribe(
      response => {
        console.log(response);
        this.cities = response.data;
      }
    );
  }

  /**
   * handler for form submission.
   */
  onSubmit() {
    let role_id: number = this.roleForm.controls.role.value;
    console.log("holla here");
    let state_id: number = this.roleForm.controls.state.value;
    let city_id: number = this.roleForm.controls.city.value;
    let individual = new Individual();
    individual.role_id = role_id;
    individual.state_id = state_id;
    individual.city_id = city_id;
    individual.individual_id = this.authService.getLoggedMemberId();
    this.individualService.update(individual).subscribe(
      result => {
        this.updateRole(result, role_id);
        this.authService.setLoggedMemberProperty('state_id', state_id);
        this.authService.setLoggedMemberProperty('city_id', city_id);
      }
    );
  }

  private updateRole(result, role_id: number) {
    console.log(result);
    if (result.success) {
      //role has been changed. Update local cache and redirect.
      let role: string = 'VOLUNTEER'; //find better way to avoid hard coding here. Create constants file.
      if (role_id == 1) {
        role = 'BALEMUYA';
      }
      
      this.authService.setLoggedMemberProperty('role', role);
      this.router.navigate(['/home']);
    }
  }
}
