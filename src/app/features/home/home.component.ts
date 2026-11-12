import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Home</h1>
      <p><a routerLink="/examples/template-features">Template features</a></p>
      <p><a routerLink="/employee-data">Employee data</a></p>
      <p><a routerLink="/news">Spaceflight news</a></p>
      <p><a routerLink="/news-carousel">Spaceflight news carousel</a></p>
      <p>Choose a user to view their posts:</p>
      <ul>
        <li><a routerLink="/api-call">/api-call</a> — All users' posts</li>
        @for (userId of userIds; track userId) {
          <li><a [routerLink]="['/api-call', userId]">Posts for user {{ userId }}</a></li>
        }
      </ul>
    </section>
  `,
})
export class HomeComponent {
  readonly userIds = Array.from({ length: 10 }, (_, index) => index + 1);
}
