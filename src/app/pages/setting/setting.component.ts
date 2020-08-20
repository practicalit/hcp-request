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

  settingForm: FormGroup;
  message: string
  constructor(
    private formBuilder: FormBuilder,
    private individualService: IndividualService
  ) { }

  ngOnInit(): void {
    this.settingForm = this.formBuilder.group({
      getEmails: [''],
      getSMSs: [''],
      emailPerDay: ['0'],
      smsPerDay: ['0'],
      emailPerWeek: ['0'],
      smsPerWeek: ['0']
    });
  }

  onSubmit() {
    let setting: IndividualSetting = new IndividualSetting();
    setting.allow_email = this.allowEmail ? 1 : 0;
    setting.allow_sms = this.allowSMS ? 1 : 0;
    setting.email_per_day = this.settingForm.controls['emailPerDay'].value;
    setting.email_per_week = this.settingForm.controls['emailPerWeek'].value;
    setting.sms_per_day = this.settingForm.controls['smsPerDay'].value;
    setting.sms_per_week = this.settingForm.controls['smsPerWeek'].value;
    this.individualService.updateSetting(setting).subscribe(result => {
      if (result.success) {
        this.message = "updated successfully"
      } else {
        this.message = "please try again"
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
