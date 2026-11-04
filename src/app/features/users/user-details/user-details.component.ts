import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { USERS } from '../users.data';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  readonly userId = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));
  readonly user: User | null = USERS.find(({ id }) => id === this.userId) ?? null;
}
