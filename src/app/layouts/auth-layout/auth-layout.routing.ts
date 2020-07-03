import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { DocComponent } from 'src/app/pages/doc/doc.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'doc',            component: DocComponent },
    { path: 'forgot-password',component: ForgotPasswordComponent }
];
