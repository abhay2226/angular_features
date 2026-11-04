import { Component } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  readonly users: User[] = [
    { id: 1, name: 'Avery Johnson', role: 'Designer' },
    { id: 2, name: 'Jordan Lee', role: 'Frontend developer' },
    { id: 3, name: 'Morgan Patel', role: 'Product manager' },
  ];

  selectedUser: User | null = null;

  onUserSelected(user: User): void {
    this.selectedUser = user;
  }
}
