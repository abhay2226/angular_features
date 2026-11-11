import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NewsStory, SpaceflightArticlesResponse } from '../models/news-story.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';

  getTopStories(): Observable<NewsStory[]> {
    return this.http
      .get<SpaceflightArticlesResponse>(this.apiUrl, {
        params: {
          limit: '100',
          ordering: '-published_at',
        },
      })
      .pipe(
        map(({ results }) =>
          results
            .filter(
              (article) =>
                typeof article.title === 'string' &&
                article.title.length > 0 &&
                typeof article.url === 'string' &&
                article.url.length > 0,
            )
            .map((article) => ({
              id: article.id,
              title: article.title ?? 'Untitled article',
              summary: article.summary ?? '',
              url: article.url ?? '',
              imageUrl: article.image_url ?? null,
              source: article.news_site ?? 'Spaceflight News',
              publishedAt: article.published_at ?? '',
            })),
        ),
      );
  }

  testBadRequest(): Observable<unknown> {
    return this.http.get('https://httpbin.org/status/400');
  }
}
