import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators, ɵNgSelectMultipleOption } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router) {
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
        if (user.success && user.data.token) {
          this.authService.storeToken(user);
          this.redirectToDashboard();  
          
        } else {
          this.loginFailed = true;
          this.authService.removeToken();
          this.message = "Invalid Username/Password";
          return;
        }
      });
  }

  private redirectToDashboard() {
    this.router.navigate(['/home']);
  }

}
