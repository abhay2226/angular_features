import { Component, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActionButtonComponent } from '../../components/action-button/action-button.component';
import { ContentCardComponent } from '../../components/content-card/content-card.component';

@Component({
  selector: 'app-template-examples',
  standalone: true,
  imports: [ActionButtonComponent, ContentCardComponent, FormsModule, NgStyle, RouterLink],
  templateUrl: './template-examples.component.html',
  styleUrl: './template-examples.component.css',
})
export class TemplateExamplesComponent {
  readonly profileName = 'Alex';
  readonly profileAge = 28;
  readonly profileCity = 'Toronto';
  readonly imageSrc = '/favicon.ico';
  buttonDisabled = false;
  eventMessage = 'The button has not been clicked yet.';
  greetingName = '';
  greetingMessage = '';
  typedText = '';
  boxColor = 'lightblue';
  showParagraph = true;
  showPassword = false;
  password = '';
  searchText = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 0;
  count = signal(0);
  readonly pageSize = 5;
  readonly names = [
    'Ava',
    'Benjamin',
    'Charlotte',
    'Daniel',
    'Emma',
    'Gabriel',
    'Harper',
    'Isaac',
    'Mia',
    'Noah',
    'Olivia',
    'Sofia',
  ];

  get filteredNames(): string[] {
    const query = this.searchText.trim().toLowerCase();
    return this.names.filter(name => name.toLowerCase().includes(query));
  }

  get sortedNames(): string[] {
    return [...this.filteredNames].sort((a, b) => {
      const result = a.localeCompare(b);
      return this.sortDirection === 'asc' ? result : -result;
    });
  }

  get pageNames(): string[] {
    const start = this.currentPage * this.pageSize;
    return this.sortedNames.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredNames.length / this.pageSize);
  }

  onSearchChange(): void {
    this.currentPage = 0;
  }

  toggleNameSort(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.currentPage = 0;
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  increment(): void {
    this.count.update(value => value + 1);
  }

  decrement(): void {
    this.count.update(value => value - 1);
  }

  resetCount(): void {
    this.count.set(0);
  }

  showClickMessage(): void {
    this.eventMessage = 'The button was clicked!';
  }

  showGreeting(): void {
    this.greetingMessage = `Hello, ${this.greetingName.trim()}!`;
  }
}
