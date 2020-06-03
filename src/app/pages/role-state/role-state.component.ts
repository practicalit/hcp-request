import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndividualService } from 'src/app/services/individual.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

/**
 * When member uses social account like google and facebook to login
 * they don't select the role and regions. Hence here they will be given 
 * a chance to add that one.
 */
@Component({
  selector: 'app-role-state',
  templateUrl: './role-state.component.html',
  styleUrls: ['./role-state.component.css']
})
export class RoleStateComponent implements OnInit {

  roleForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private individualService: IndividualService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      role: ['', Validators.required],
    });
  }

  /**
   * handler for form submission.
   */
  onSubmit() {
    let role_id: number = this.roleForm.controls.role.value;
    this.individualService.updateRole(role_id).subscribe(
      result => {
        console.log(result);
        if (result.success) {
          //role has been changed. Update local cache and redirect.
          let role: string = 'VOLUNTEER'; //find better way to avoid hard coding here. Create constants file.
          if (role_id == 1) {
            role = 'BALEMUYA';
          }
          
          this.authService.updateRole(role);
          this.router.navigate(['/home']);
        }
      }
    );
  }
}
