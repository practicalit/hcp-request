import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { IndividualService } from 'src/app/services/individual.service';
import { Individual } from 'src/app/models/individual.model';
import { State } from 'src/app/models/state.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user.model';

const FACEBOOK_LOGIN_ID = 2;
const GOOGLE_LOGIN_ID = 3;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted: boolean;
  message: string;
  registerForm: FormGroup;
  private states: State[] = [
    {id: 1, name: 'Addis Ababa'},
    {id: 2, name: 'Amhara'},
    {id: 3, name: 'Oromiya'},
    {id: 4, name: 'Tigray'}
  ];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private individualService: IndividualService,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {


    
    this.registerForm = this.formBuilder.group({
      registerAs: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
    individual.last_name = this.form.lastName.value;
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

  facebookAuth() {
    this.submitted = true;
    this.authLogin(new firebase.auth.FacebookAuthProvider());
  } 

  /**
   * handle the login by facebook. First check if the user exists
   * if not, register the member and proceed to the home page.
   * 
   * NgZone is required here specially when external process for google
   * and facebook is handled through promises. In that case, the application
   * is handled outside of angular and routing won't work as expected.
   * @more https://angular.io/api/core/NgZone
   * @param provider 
   */
  authLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => this.ngZone.run( () => {
      if (result != null && result.additionalUserInfo) {
        this.handleOauth(result);
      }
    })).catch((error) => {
        console.log(error)
    })
  }
  
  /**
   * Any of the providers will be calling this after they got the response from the corresponding
   * servers.
   * @param result 
   */
  handleOauth(result) {
    let user = new User();
    user.email = result.additionalUserInfo.profile.email;

    if (result.additionalUserInfo.providerId == 'google.com') {
      user.first_name = result.additionalUserInfo.profile.given_name;
      user.last_name = result.additionalUserInfo.profile.family_name;
      user.login_method = GOOGLE_LOGIN_ID;
    } else if (result.additionalUserInfo.providerId == "facebook.com") {
      user.first_name = result.additionalUserInfo.profile.first_name;
      user.last_name = result.additionalUserInfo.profile.last_name;
      user.login_method = FACEBOOK_LOGIN_ID;
    }
    
    this.authService.loginByOauth(user).subscribe(
      user => this.handleLoginResponse(user)
    );
  }

  private handleLoginResponse(user) {
    if (user.success && user.data.token) {
      this.authService.storeToken(user);
      this.redirectToDashboard();   
    } else {
      this.authService.removeToken();
      this.message = "Invalid Username/Password";
      return;
    }
  }
}
