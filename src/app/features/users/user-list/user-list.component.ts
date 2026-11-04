import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserCardComponent } from '../../../shared/components/user-card/user-card.component';
import { USERS } from '../users.data';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  readonly users = USERS;

  selectedUser: User | null = null;

  onUserSelected(user: User): void {
    this.selectedUser = user;
  }
}
