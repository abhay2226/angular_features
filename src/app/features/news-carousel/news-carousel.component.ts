import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsStory } from '../news/models/news-story.model';
import { NewsService } from '../news/services/news.service';

@Component({
  selector: 'app-news-carousel',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './news-carousel.component.html',
  styleUrl: './news-carousel.component.css',
})
export class NewsCarouselComponent implements OnInit {
  private readonly newsService = inject(NewsService);

  readonly pageSize = 20;
  stories: NewsStory[] = [];
  totalStories = 0;
  currentPage = 0;
  currentIndex = 0;
  isLoading = true;
  errorMessage: string | null = null;
  errorStatusCode: number | null = null;

  get totalPages(): number {
    return Math.ceil(this.totalStories / this.pageSize);
  }

  get currentStory(): NewsStory | null {
    return this.stories[this.currentIndex] ?? null;
  }

  get currentStoryNumber(): number {
    return this.currentStory
      ? Math.min(this.currentPage * this.pageSize + this.currentIndex + 1, this.totalStories)
      : 0;
  }

  get canGoPrevious(): boolean {
    return this.currentPage > 0 || this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return (
      this.currentIndex < this.stories.length - 1 ||
      this.currentPage < this.totalPages - 1
    );
  }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(page = this.currentPage, showLastStory = false): void {
    this.currentPage = page;
    this.isLoading = true;
    this.errorMessage = null;
    this.errorStatusCode = null;

    this.newsService.getStoriesPage(page, this.pageSize).subscribe({
      next: ({ stories, totalCount }) => {
        this.stories = stories;
        this.totalStories = totalCount;
        this.currentIndex = showLastStory ? Math.max(stories.length - 1, 0) : 0;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Failed to load Spaceflight News carousel articles.', error);
        this.errorMessage = 'News could not be loaded. Please try again.';
        this.errorStatusCode = error instanceof HttpErrorResponse ? error.status : null;
        this.isLoading = false;
      },
    });
  }

  nextStory(): void {
    if (this.isLoading) {
      return;
    }

    if (this.currentIndex < this.stories.length - 1) {
      this.currentIndex++;
    } else if (this.currentPage < this.totalPages - 1) {
      this.loadPage(this.currentPage + 1);
    }
  }

  previousStory(): void {
    if (this.isLoading) {
      return;
    }

    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1, true);
    }
  }
}
