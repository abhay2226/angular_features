import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  readonly userName = inject(ActivatedRoute).snapshot.paramMap.get('userName');
}
