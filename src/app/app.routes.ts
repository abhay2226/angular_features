import { Routes } from '@angular/router';
import { UserDetailsComponent } from './features/users/user-details/user-details.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { TemplateExamplesComponent } from './features/template-examples/template-examples.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ApiCallComponent } from './features/api-call/api-call.component';
import { HomeComponent } from './features/home/home.component';
import { EmployeeDataComponent } from './features/employee-data/employee-data.component';
import { NewsComponent } from './features/news/news.component';
import { NewsCarouselComponent } from './features/news-carousel/news-carousel.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'team', component: UserListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'examples/template-features', component: TemplateExamplesComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'api-call', component: ApiCallComponent },
  { path: 'api-call/:id', component: ApiCallComponent },
  { path: 'users/api', component: ApiCallComponent },
  { path: 'users/api/:id', component: ApiCallComponent },
  { path: 'feature/api', component: ApiCallComponent },
  { path: 'employee-data', component: EmployeeDataComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news-carousel', component: NewsCarouselComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: '**', component: NotFoundComponent },
];
