import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { Post } from '../models/post.model';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main>
      <h1>Posts from the sample API</h1>

      @if (isLoading) {
        <p>Loading posts...</p>
      } @else if (errorMessage) {
        <p role="alert">{{ errorMessage }}</p>
      } @else if (posts.length === 0) {
        <p>No posts found for user {{ userId }}.</p>
      } @else {
        <details class="user-accordion">
          <summary>User {{ userId }} ({{ posts.length }} posts)</summary>
          <ul class="posts" [attr.aria-label]="'Posts by user ' + userId">
            @for (post of posts; track post.id) {
              <li>
                <h2>{{ post.title }}</h2>
                <p>{{ post.body }}</p>
              </li>
            }
          </ul>
        </details>
      }

      <p><a routerLink="/feature/api">View posts from all users</a></p>
      <a routerLink="/">Go back to home</a>
    </main>
  `,
  styles: `
    main {
      max-width: 48rem;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .user-accordion {
      border: 1px solid #d5dbe3;
      border-radius: 0.5rem;
      background: white;
    }

    .user-accordion summary {
      padding: 1rem;
      font-weight: 600;
      cursor: pointer;
    }

    .posts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
      gap: 1rem;
      margin: 0;
      padding: 0 1rem 1rem;
      list-style: none;
    }

    li {
      padding: 1rem;
      border: 1px solid #d5dbe3;
      border-radius: 0.5rem;
    }

    li h2 {
      margin-top: 0;
      font-size: 1.1rem;
    }
  `,
})
export class UserPostsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiCallService = inject(ApiCallService);

  userId = 0;
  posts: Post[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.userId = Number(params.get('id'));
          this.posts = [];
          this.errorMessage = null;
          this.isLoading = true;

          if (!Number.isInteger(this.userId) || this.userId < 1) {
            return of({
              posts: [],
              errorMessage: 'Please provide a valid positive user ID.',
            });
          }

          const userId = this.userId;
          return this.apiCallService.getPostsByUserId(userId).pipe(
            map((posts) => ({ posts, errorMessage: null })),
            catchError((error: unknown) => {
              console.error(`Failed to load posts for user ${userId}.`, error);
              return of({
                posts: [],
                errorMessage: 'Unable to load posts. Please try again later.',
              });
            }),
          );
        }),
      )
      .subscribe(({ posts, errorMessage }) => {
        this.posts = posts;
        this.errorMessage = errorMessage;
        this.isLoading = false;
      });
  }
}
