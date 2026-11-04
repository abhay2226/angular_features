import { Routes } from '@angular/router';
import { UserDetailsComponent } from './features/users/pages/user-details/user-details.component';
import { UserListComponent } from './features/users/pages/user-list/user-list.component';
import { ApiCallComponent } from './features/api-call/pages/api-call/api-call.component';

export const routes: Routes = [
  { path: 'features/users', component: UserListComponent },
  { path: 'features/users/:userName', component: UserDetailsComponent },
  { path: 'feature/api', component: ApiCallComponent },
  { path: '', redirectTo: 'features/users', pathMatch: 'full' },
];
