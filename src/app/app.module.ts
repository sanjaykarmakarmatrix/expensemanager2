import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { GroupComponent } from './group/group.component';
import { GroupDetailsComponent } from './group-details/group-details.component';

import { NgxPagerModule } from 'ngx-pager';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule, MatIconModule, MatAutocompleteModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { AdditemComponent } from './additem/additem.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    GroupComponent,
    GroupDetailsComponent,
    GroupEditComponent,
    AdditemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    NgxPagerModule,

    BrowserAnimationsModule,

    MatFormFieldModule,MatInputModule,MatButtonModule,MatMenuModule,MatIconModule,MatAutocompleteModule,
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,MatRippleModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [AdditemComponent]
})
export class AppModule { }
