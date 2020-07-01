import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IndividualService } from 'src/app/services/individual.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  allowEmail: boolean = false;
  allowSMS: boolean = false;

  settingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private individualService: IndividualService
  ) { }

  ngOnInit(): void {
    this.settingForm = this.formBuilder.group({
      getEmails: [''],
      getSMSs: [''],
      emailPerDay: [''],
      smsPerDay: [''],
      emailPerWeek: [''],
      smsPerWeek: ['']
    });
  }

  onSubmit() {
    this.individualService.updateSetting(
      this.allowEmail,
      +this.settingForm.controls['emailPerDay'].value,
      +this.settingForm.controls['emailPerWeek'].value,
      this.allowSMS,
      +this.settingForm.controls['smsPerDay'].value,
      +this.settingForm.controls['smsPerWeek'].value
    ).subscribe(result => {
      console.log(result);
    });
  }

  getFormValue(control: string) {
    this.settingForm.controls[control].value;
  }

  handleINeedEmail() {
    this.allowEmail = this.settingForm.controls.getEmails.value;
  }

  handleINeedSMS() {
    this.allowSMS = this.settingForm.controls.getSMSs.value;
  }
}
