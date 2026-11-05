import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiCallService } from './services/api-call.service';
import { UserPosts } from './models/post.model';

@Component({
  selector: 'app-api-call',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './api-call.component.html',
  styleUrl: './api-call.component.css',
})
export class ApiCallComponent implements OnInit {
  private readonly apiCallService = inject(ApiCallService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  postsByUser: UserPosts[] = [];
  selectedUserId: number | null = null;
  userIdError: string | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  onUserFilterChange(userId: number | null): void {
    this.navigateToUser(userId);
  }

  onAccordionToggle(event: Event, userId: number): void {
    const accordion = event.currentTarget;
    if (!(accordion instanceof HTMLDetailsElement)) {
      return;
    }

    if (accordion.open && this.selectedUserId !== userId) {
      this.navigateToUser(userId);
    } else if (!accordion.open && this.selectedUserId === userId) {
      this.navigateToUser(null);
    }
  }

  get filteredPostsByUser(): UserPosts[] {
    if (this.selectedUserId === null) {
      return this.postsByUser;
    }

    return this.postsByUser.filter((group) => group.userId === this.selectedUserId);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id === null) {
        this.selectedUserId = null;
        this.userIdError = null;
        return;
      }

      const userId = Number(id);
      if (!Number.isSafeInteger(userId) || userId < 1) {
        this.selectedUserId = -1;
        this.userIdError = 'Please provide a valid positive user ID.';
        return;
      }

      this.selectedUserId = userId;
      this.userIdError = null;
    });

    this.apiCallService.getPostsGroupedByUser().subscribe({
      next: (postsByUser) => {
        this.postsByUser = postsByUser;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Failed to load posts from the sample API.', error);
        this.errorMessage = 'Unable to load posts. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  private navigateToUser(userId: number | null): void {
    void this.router.navigate(userId === null ? ['/users/api'] : ['/users', userId]);
  }
}
