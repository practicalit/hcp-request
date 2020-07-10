import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IndividualService } from 'src/app/services/individual.service';
import { IndividualSetting } from 'src/app/models/individual.setting.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  allowEmail: boolean = false;
  allowSMS: boolean = false;
  individual_setting: any;
  settingForm: FormGroup;
  user: any;
  email: string;
  password: string;
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private individualService: IndividualService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.allowEmail = this.authService.getLoggedMemberProperty('allow_email');
    this.allowSMS = this.authService.getLoggedMemberProperty('allow_sms');
    this.settingForm = this.formBuilder.group({
      getEmails: [this.authService.getLoggedMemberProperty('allow_email')],
      getSMSs: [this.authService.getLoggedMemberProperty('allow_sms')],
      emailPerDay: [this.authService.getLoggedMemberProperty('email_per_day')],
      smsPerDay: [this.authService.getLoggedMemberProperty('sms_per_day')],
      emailPerWeek: [this.authService.getLoggedMemberProperty('email_per_week')],
      smsPerWeek: [this.authService.getLoggedMemberProperty('sms_per_week')]
    });
  }

  onSubmit() {
    let individual_setting = new IndividualSetting();
    individual_setting.allow_email = this.allowEmail ? 1 : 0;
    individual_setting.allow_sms = this.allowSMS ? 1 : 0;
    individual_setting.email_per_day = this.settingForm.controls['emailPerDay'].value;
    individual_setting.email_per_week = this.settingForm.controls['emailPerWeek'].value;
    individual_setting.sms_per_day = this.settingForm.controls['smsPerDay'].value;
    individual_setting.sms_per_week = this.settingForm.controls['smsPerWeek'].value;
    this.individualService.updateSetting(individual_setting).subscribe(result => {
      if (result.success) {
        this.authService.setLoggedMemberProperty('allow_email', individual_setting.allow_email);
        this.authService.setLoggedMemberProperty('allow_sms', individual_setting.allow_sms);
        this.authService.setLoggedMemberProperty('email_per_day', individual_setting.email_per_day);
        this.authService.setLoggedMemberProperty('sms_per_day', individual_setting.sms_per_day);
        this.authService.setLoggedMemberProperty('email_per_week', individual_setting.email_per_week);
        this.authService.setLoggedMemberProperty('sms_per_week', individual_setting.sms_per_week);
      }
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