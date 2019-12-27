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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    GroupComponent,
    GroupDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
