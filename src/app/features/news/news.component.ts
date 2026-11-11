import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsStory } from './models/news-story.model';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  private readonly newsService = inject(NewsService);

  stories: NewsStory[] = [];
  isLoading = true;
  isTestingError = false;
  errorMessage: string | null = null;
  errorStatusCode: number | null = null;

  ngOnInit(): void {
    this.loadStories();
  }

  loadStories(): void {
    this.isLoading = true;
    this.isTestingError = false;
    this.errorMessage = null;
    this.errorStatusCode = null;

    this.newsService.getTopStories().subscribe({
      next: (stories) => {
        this.stories = stories;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Failed to load Spaceflight News articles.', error);
        this.errorMessage = 'News could not be loaded. Please try again.';
        this.errorStatusCode = error instanceof HttpErrorResponse ? error.status : null;
        this.isLoading = false;
      },
    });
  }

  testBadRequest(): void {
    this.isLoading = true;
    this.isTestingError = true;
    this.errorMessage = null;
    this.errorStatusCode = null;

    this.newsService.testBadRequest().subscribe({
      next: () => {
        this.isLoading = false;
        this.isTestingError = false;
        this.errorMessage = 'The test endpoint did not return the expected error.';
      },
      error: (error: unknown) => {
        console.info('News HTTP error test returned an error response.', error);
        this.errorMessage = 'The news error state is active.';
        this.errorStatusCode = error instanceof HttpErrorResponse ? error.status : null;
        this.isLoading = false;
        this.isTestingError = false;
      },
    });
  }
}
