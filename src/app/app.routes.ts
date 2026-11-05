import { Routes } from '@angular/router';
import { ApiCallComponent } from './features/api-call/api-call.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'users/api', component: ApiCallComponent },
  { path: 'users/api/:id', component: ApiCallComponent },
  { path: 'users/:id', component: ApiCallComponent },
  { path: 'feature/api', component: ApiCallComponent },
];
