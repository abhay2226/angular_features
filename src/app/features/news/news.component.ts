import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewsStory } from './models/news-story.model';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  private readonly newsService = inject(NewsService);

  readonly pageSizeOptions = [20, 50, 100];
  stories: NewsStory[] = [];
  totalStories = 0;
  pageSize = 20;
  currentPage = 0;
  isLoading = true;
  isTestingError = false;
  errorMessage: string | null = null;
  errorStatusCode: number | null = null;

  get totalPages(): number {
    return Math.ceil(this.totalStories / this.pageSize);
  }

  get firstStoryNumber(): number {
    return this.totalStories === 0 ? 0 : this.currentPage * this.pageSize + 1;
  }

  get lastStoryNumber(): number {
    return Math.min(this.currentPage * this.pageSize + this.stories.length, this.totalStories);
  }

  ngOnInit(): void {
    this.loadStories();
  }

  loadStories(page = this.currentPage): void {
    this.currentPage = page;
    this.isLoading = true;
    this.isTestingError = false;
    this.errorMessage = null;
    this.errorStatusCode = null;

    this.newsService.getStoriesPage(this.currentPage, this.pageSize).subscribe({
      next: ({ stories, totalCount }) => {
        this.stories = stories;
        this.totalStories = totalCount;
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

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.loadStories(0);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.loadStories(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadStories(this.currentPage + 1);
    }
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
