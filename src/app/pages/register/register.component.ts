import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { IndividualService } from 'src/app/services/individual.service';
import { Individual } from 'src/app/models/individual.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted: boolean;
  message: string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private individualService: IndividualService
    ) { }

  registerForm: FormGroup;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      registerAs: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  /**
   * Lets have easier access to the input controls of the form
   */
  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    let individual = new Individual();
    //to be consistent with database, I am forcing the underscore naming standard for models
    individual.first_name = this.form.firstName.value;
    individual.last_name = this.form.lastName.value;
    individual.email = this.form.email.value;
    individual.password = this.form.password.value;
    individual.phone = this.form.phone.value;
    individual.state_id = this.form.state.value;
    individual.city_id = this.form.city.value;
    individual.role_id = this.form.registerAs.value;
    
    this.individualService.register(individual).subscribe(
      response => {
        if (response.success) {
          this.message = "Successfully Registered";
        } else {
          this.message = "Something goes wrong, can we try again?";
        }
      }
    );
  }
}
