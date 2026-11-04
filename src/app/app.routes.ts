import { Routes } from '@angular/router';
import { UserDetailsComponent } from './features/users/user-details/user-details.component';
import { ApiCallComponent } from './features/api-call/api-call.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'feature/api', component: ApiCallComponent },
];
