import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post, UserPosts } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private readonly http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPostsGroupedByUser(): Observable<UserPosts[]> {
    return this.getPosts().pipe(
      map((posts) => {
        const postsByUser = posts.reduce<Record<number, Post[]>>((groups, post) => {
          (groups[post.userId] ??= []).push(post);
          return groups;
        }, {});

        return Object.entries(postsByUser).map(([userId, userPosts]) => ({
          userId: Number(userId),
          posts: userPosts,
        }));
      }),
    );
  }
}
