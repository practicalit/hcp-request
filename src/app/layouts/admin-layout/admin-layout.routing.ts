import { Routes, CanActivate } from '@angular/router';

import { AuthGuardService} from '../../services/auth-guard.service';
import { HomeComponent } from '../../pages/home/home.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { RequestComponent } from '../../pages/request/request.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { RequestDetailComponent } from 'src/app/pages/request-detail/request-detail.component';
import { EditProfileComponent } from 'src/app/edit-profile/edit-profile.component';
import { RoleStateComponent } from 'src/app/pages/role-state/role-state.component';
import { AwesomeVolunteersComponent } from 'src/app/pages/awesome-volunteers/awesome-volunteers.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home',           component: HomeComponent, canActivate: [AuthGuardService]  },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'edit-profile',   component: EditProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'request',        component: RequestComponent, canActivate: [AuthGuardService] },
    { path: 'request-detail/:requestId', component: RequestDetailComponent, canActivate: [AuthGuardService] },
    { path: 'add-role', component: RoleStateComponent, canActivate: [AuthGuardService] },
    { path: 'awesome-volunteers/:requestId', component: AwesomeVolunteersComponent, canActivate: [AuthGuardService] }
];
