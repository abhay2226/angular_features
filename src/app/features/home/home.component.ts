import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Home</h1>
      <p>Choose a user to view their posts:</p>
      <ul>
        <li><a routerLink="/users/api">/users/api</a> — All users' posts</li>
        @for (userId of userIds; track userId) {
          <li><a [routerLink]="['/users', userId]">User {{ userId }}</a></li>
        }
      </ul>
    </section>
  `,
})
export class HomeComponent {
  readonly userIds = Array.from({ length: 10 }, (_, index) => index + 1);
}
