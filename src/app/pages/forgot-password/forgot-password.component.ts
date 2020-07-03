import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndividualService } from 'src/app/services/individual.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private individualService: IndividualService) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.individualService.forgotPassword(this.forgotForm.controls.email.value).subscribe(response => {
      if (response.success) {
        this.message = "If the email is found on file, you will get an email with reset instructions. Thank you";
      }
    });
  }

}
