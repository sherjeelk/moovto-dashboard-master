import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RiderListComponent} from './rider-list/rider-list.component';
import {NotificationsComponent} from './notifications/notifications.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'riders',
    component: RiderListComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
