import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DocComponent } from './pages/doc/doc.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { RoleStateComponent } from './pages/role-state/role-state.component';
import { AwesomeVolunteersComponent } from './pages/awesome-volunteers/awesome-volunteers.component';
import { AwesomeProfessionalsComponent } from './pages/awesome-professionals/awesome-professionals.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DocComponent,
    EditProfileComponent,
    RoleStateComponent,
    AwesomeVolunteersComponent,
    AwesomeProfessionalsComponent,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
