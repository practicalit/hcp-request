import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
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
  individual_setting: any;
  settingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private individualService: IndividualService
  ) { }

  ngOnInit(): void {
    this.settingForm = this.formBuilder.group({
      getEmails: [this.individual_setting.allow_email],
      getSMSs: [this.individual_setting.allow_sms],
      emailPerDay: [this.individual_setting.email_per_day],
      smsPerDay: [this.individual_setting.sms_per_day],
      emailPerWeek: [this.individual_setting.email_per_week],
      smsPerWeek: [this.individual_setting.sms_per_week]
    });
  }

  onSubmit() {
    let individual_setting: IndividualSetting = new IndividualSetting();
    individual_setting.allow_email = this.allowEmail ? 1 : 0;
    individual_setting.allow_sms = this.allowSMS ? 1 : 0;
    individual_setting.email_per_day = this.settingForm.controls['emailPerDay'].value;
    individual_setting.email_per_week = this.settingForm.controls['emailPerWeek'].value;
    individual_setting.sms_per_day = this.settingForm.controls['smsPerDay'].value;
    individual_setting.sms_per_week = this.settingForm.controls['smsPerWeek'].value;
    this.individualService.updateSetting(individual_setting).subscribe(result => {
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
