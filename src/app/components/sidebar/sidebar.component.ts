import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    showOnSide: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon: 'ni-tv-2 text-primary', class: '', showOnSide: true },
    //{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/request-detail', title: 'Request Detail',  icon:'ni-pin-3 text-orange', class: '', showOnSide: false },
    { path: '/request', title: 'Request',  icon:'ni-pin-3 text-orange', class: '', showOnSide: true },

    /*{ path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.menuItems = this.authService.getRole()=="BALEMUYA" ? ROUTES : ROUTES.filter(menuItem => menuItem.title != 'Request')
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout() {
    this.authService.removeToken();
  }
}
