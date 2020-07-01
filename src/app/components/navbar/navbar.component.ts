import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;

  firstName: string;
  lastName: string;
  constructor(
    location: Location,  
    private element: ElementRef, 
    private router: Router,
    private authService: AuthenticationService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.firstName = this.authService.getFirstName();
    this.lastName = this.authService.getLastName();
    
  }
  getTitle(){
    var title = this.location.prepareExternalUrl(this.location.path());
    if(title.charAt(0) === '#'){
        title = title.slice( 1 );
    }
    for(var item = 0; item < this.listTitles.length; item++){
        if(title.includes(this.listTitles[item].path)){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
