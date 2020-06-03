import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent } from '../../pages/home/home.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { RequestComponent } from '../../pages/request/request.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestDetailComponent } from 'src/app/pages/request-detail/request-detail.component';
import { CommentComponent } from 'src/app/pages/comment/comment.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    HomeComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    RequestComponent,
    RequestDetailComponent,
    CommentComponent
  ]
})

export class AdminLayoutModule {}
