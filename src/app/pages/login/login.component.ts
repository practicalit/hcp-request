import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

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
    private router: Router
    ) {
      this.authService = authService;
    }

  submitted: boolean;
  message: string;
  showSpinner: boolean; 
  loginFailed = false;
  loginForm: FormGroup;
  
  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
    this.authService.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  async signOut() {
    this.authService.oauthLogout();
  }

  /**
   * Event handler for login by facebook option.
   */
  facebookAuth() {
    this.submitted = true;
    this.authService.authLogin(new firebase.auth.FacebookAuthProvider());
  }  

  private handleLoginResponse(user) {
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
