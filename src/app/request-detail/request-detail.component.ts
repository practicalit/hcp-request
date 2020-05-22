import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RequestService } from 'src/app/services/request.service';
import { HelpRequest } from 'src/app/models/help.request.model.';


@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  message:string;
  validForm: boolean = false;
  formSubmitted:boolean = false;
  success:boolean;

  requestdetailForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private requestService: RequestService) { }

    get title() {
      return this.requestdetailForm.controls.title;
    }
  
    get request() {
      return this.requestdetailForm.controls.request;
    }
  
    get priority() {
      return this.requestdetailForm.controls.priority;
    }
  
    ngOnInit() {
      this.requestdetailForm = this.formBuilder.group({
        priority: ['', Validators.required],
        title: ['', Validators.required],
        request: ['', Validators.required]
      });
    }
  
    /**
     * Get easy access to the controls of the form
     */
    get form() {
      return this.requestdetailForm.controls;
    }
  
    onSubmit() {
      this.formSubmitted = true;
      if (this.requestdetailForm.invalid) {
        return;
      }
  
      let request = new HelpRequest();
      request.title = this.form.title.value;
      request.request = this.form.request.value;
      request.priority_id = this.form.priority.value;
      
      this.requestService.postRequest(request).subscribe(
        response => {
          this.success = false;
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
