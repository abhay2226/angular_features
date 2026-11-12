import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  styleUrl: './home.component.css',
  template: `
    <main class="home-page">
      <div class="home-shell">
        <header class="home-hero">
          <p class="home-eyebrow">Mission control · Spaceflight headlines</p>
          <h1>Explore Spaceflight News</h1>
          <p class="home-intro">Choose a view to discover the latest stories from space.</p>
        </header>

        <section class="news-task-grid" aria-label="Spaceflight news tasks">
          <a class="news-task-card news-task-card--list" routerLink="/news">
            <span class="task-tag">Task 1 · Paginated list</span>
            <span class="card-planet" aria-hidden="true"></span>
            <div class="task-card-content">
              <p class="task-kicker">Browse at your own pace</p>
              <h2>Spaceflight news</h2>
              <p class="task-description">
                Explore article cards with page controls and a scrollable news list.
              </p>
              <span class="task-action">Open list view <span aria-hidden="true">→</span></span>
            </div>
          </a>

          <a class="news-task-card news-task-card--carousel" routerLink="/news-carousel">
            <span class="task-tag">Task 2 · Carousel</span>
            <span class="card-planet" aria-hidden="true"></span>
            <div class="task-card-content">
              <p class="task-kicker">One story at a time</p>
              <h2>Spaceflight news carousel</h2>
              <p class="task-description">
                Move through the same news feed with previous and next story controls.
              </p>
              <span class="task-action">Open carousel <span aria-hidden="true">→</span></span>
            </div>
          </a>
        </section>

        <section class="other-examples" aria-labelledby="other-examples-title">
          <h2 id="other-examples-title">More examples</h2>
          <nav class="example-links" aria-label="Other examples">
            <a routerLink="/examples/template-features">Template features</a>
            <a routerLink="/employee-data">Employee data</a>
            <a routerLink="/api-call">All users' posts</a>
          </nav>
          <p class="user-links-title">Choose a user to view their posts:</p>
          <ul class="user-links">
            @for (userId of userIds; track userId) {
              <li><a [routerLink]="['/api-call', userId]">User {{ userId }}</a></li>
            }
          </ul>
        </section>
      </div>
    </main>
  `,
})
export class HomeComponent {
  readonly userIds = Array.from({ length: 10 }, (_, index) => index + 1);
}
