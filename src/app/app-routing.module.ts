import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GroupComponent } from './group/group.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupEditComponent } from './group-edit/group-edit.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'group/create-group',
        component: GroupComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'group/edit/:id',
        component: GroupEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'group/detail/:id',
        component: GroupDetailsComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
