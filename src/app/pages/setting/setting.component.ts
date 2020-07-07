import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IndividualService } from 'src/app/services/individual.service';
import { IndividualSetting } from 'src/app/models/individual.setting.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  allowEmail: boolean = false;
  allowSMS: boolean = false;
  setting: any;
  settingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private individualService: IndividualService
  ) { }

  ngOnInit(): void {
    this.setting = this.individualService.getUserSetting()
    this.settingForm = this.formBuilder.group({
      getEmails: [this.setting.allow_email],
      getSMSs: [this.setting.allow_sms],
      emailPerDay: [this.setting.emails_per_day],
      smsPerDay: [this.setting.sms_per_day],
      emailPerWeek: [this.setting.emails_per_week],
      smsPerWeek: [this.setting.sms_per_week]
    });
  }

  onSubmit() {
    this.setting = new IndividualSetting();
    this.setting.allow_email = this.allowEmail ? 1 : 0;
    this.setting.allow_sms = this.allowSMS ? 1 : 0;
    this.setting.email_per_day = this.settingForm.controls['emailPerDay'].value;
    this.setting.email_per_week = this.settingForm.controls['emailPerWeek'].value;
    this.setting.sms_per_day = this.settingForm.controls['smsPerDay'].value;
    this.setting.sms_per_week = this.settingForm.controls['smsPerWeek'].value;
    this.individualService.updateSetting(this.setting).subscribe(result => {
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
