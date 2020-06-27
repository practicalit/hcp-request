import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { RequestService } from 'src/app/services/request.service';
import { HelpRequest } from 'src/app/models/help.request.model.';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  message:string;
  validForm: boolean = false;
  formSubmitted:boolean = false;
  success:boolean;
  showPeriod:boolean;
  requestForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private requestService: RequestService) { }
    private submitting = "";
 
   onClick(){
     
     this.submitting = 'Under Construction'
      
   }

  get title() {
    return this.requestForm.controls.title;
  }

  get request() {
    return this.requestForm.controls.request;
  }

  get priority() {
    return this.requestForm.controls.priority;
  }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      priority: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(20)]],
      request: ['', Validators.required]
    });
  }

  /**
   * Get easy access to the controls of the form
   */
  get form() {
    return this.requestForm.controls;
  }
  onPriorityChange() {
    if (this.form.priority.value == 1){
      this.showPeriod = true;
     }else{
      this.showPeriod = false;
     }
  }
       
  onSubmit() {
    this.formSubmitted = true;
    if (this.requestForm.invalid) {
      return;
    }

    let request = new HelpRequest();
    request.title = this.form.title.value;
    request.request = this.form.request.value;
    request.priority_id = this.form.priority.value;
    
    this.requestService.postRequest(request).subscribe(
      response => {
        this.success = true;
        if (response.success) {
          this.success = true;
          this.message = "Successfully posted the request";
        } else {
          this.message = "It didn't go through, please try again";
        }
      }
    );
  }
}
