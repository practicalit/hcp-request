import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


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
    private formBuilder: FormBuilder
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

  }

  handleINeedEmail() {
    this.allowEmail = this.settingForm.controls.getEmails.value;
  }

  handleINeedSMS() {
    this.allowSMS = this.settingForm.controls.getSMSs.value;
  }
}
