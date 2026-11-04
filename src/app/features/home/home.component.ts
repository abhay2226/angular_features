import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section>
      <h1>Home</h1>
      <p>Choose a route:</p>
      <ul>
        <li><a routerLink="/user/1">/user/1</a></li>
        <li><a routerLink="/user/2">/user/2</a></li>
        <li><a routerLink="/user/3">/user/3</a></li>
        <li><a routerLink="/feature/api">/feature/api</a> — API posts</li>
      </ul>
    </section>
  `,
})
export class HomeComponent {}
