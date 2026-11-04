import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';
import { UserPosts } from '../../models/post.model';

@Component({
  selector: 'app-api-call',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './api-call.component.html',
  styleUrl: './api-call.component.css',
})
export class ApiCallComponent implements OnInit {
  private readonly apiCallService = inject(ApiCallService);

  postsByUser: UserPosts[] = [];
  selectedUserId: number | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  get filteredPostsByUser(): UserPosts[] {
    if (this.selectedUserId === null) {
      return this.postsByUser;
    }

    return this.postsByUser.filter((group) => group.userId === this.selectedUserId);
  }

  ngOnInit(): void {
    this.apiCallService.getPostsGroupedByUser().subscribe({
      next: (postsByUser) => {
        this.postsByUser = postsByUser;
        console.log('Posts grouped by user:', this.postsByUser);  
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Failed to load posts from the sample API.', error);
        this.errorMessage = 'Unable to load posts. Please try again later.';
        this.isLoading = false;
      },
    });
  }
}
