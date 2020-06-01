import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators, ɵNgSelectMultipleOption } from '@angular/forms';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

import { User } from '../../models/user.model';

const FACEBOOK_LOGIN_ID = 2;
const GOOGLE_LOGIN_ID = 3;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  authService: AuthenticationService;
  constructor(
    authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone) {
      this.authService = authService;
    }

  submitted: boolean;
  message: string;
  showSpinner: boolean; loginFailed: boolean;
  loginForm: FormGroup;

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls
  }

  ngOnDestroy() {
  }

  /**
   * Handler for the page submission
   */
  onSubmit() {

    this.submitted = true;
    this.showSpinner = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.authenticate(this.form.email.value,
      this.form.password.value).subscribe(user => {
        this.handleLoginResponse(user);
      });
  }

  /**
   * Google oAuth handler from the view click
   */
  googleAuth() {
    this.submitted = true;
    this.authLogin(new auth.GoogleAuthProvider());
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  /**
   * Event handler for login by facebook option.
   */
  facebookAuth() {
    this.submitted = true;
    this.authLogin(new auth.FacebookAuthProvider());
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
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => this.ngZone.run( () => {
      console.log(result);
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
    console.log(user);
    if (user.success && user.data.token) {
      this.authService.storeToken(user);
      this.redirectToDashboard();   
    } else {
      this.loginFailed = true;
      this.authService.removeToken();
      this.message = "Invalid Username/Password";
      return;
    }
  }

  private redirectToDashboard() {
    this.router.navigate(['/home']);
  }

}
