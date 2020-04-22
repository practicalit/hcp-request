import { Routes, CanActivate } from '@angular/router';

import { HomeComponent } from '../../pages/home/home.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { RequestComponent } from '../../pages/request/request.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuardService} from '../../services/auth-guard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'home',           component: HomeComponent, canActivate: [AuthGuardService]  },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'request',        component: RequestComponent, canActivate: [AuthGuardService] }
];
