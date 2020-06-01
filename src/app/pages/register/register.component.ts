import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { IndividualService } from 'src/app/services/individual.service';
import { Individual } from 'src/app/models/individual.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private individualService: IndividualService,
    private authService: AuthenticationService
    ) { }

  registerForm: FormGroup;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      registerAs: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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
    individual.last_name = this.form.firstName.value;
    individual.email = this.form.email.value;
    individual.password = this.form.password.value;
    individual.role_id = this.form.registerAs.value;
    
    this.individualService.register(individual).subscribe(
      response => {
        if (response.success) {
          //this should be performed in one shot
          this.authService.authenticate(individual.email, individual.password).subscribe(
            user => {
              this.authService.storeToken(user);
              this.redirectToDashboard();
            }
          );
        } else {
          this.message = "Something goes wrong, can we try again?";
        }
      }
    );
  }

  private redirectToDashboard() {
    this.router.navigate(['/home']);
  }
}
