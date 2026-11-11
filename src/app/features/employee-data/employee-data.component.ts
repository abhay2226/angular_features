import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Employee {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
  city: string;
  salary: number;
  joinDate: string;
  status: string;
}

@Component({
  selector: 'app-employee-data',
  standalone: true,
  imports: [DecimalPipe, FormsModule, NgTemplateOutlet, RouterLink],
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css',
})
export class EmployeeDataComponent implements OnInit {
  private readonly http = inject(HttpClient);

  readonly pageSizeOptions = [10, 20, 30];
  employees: Employee[] = [];
  pageSize = 10;
  currentPage = 0;
  isLoading = true;
  isTestingError = false;
  errorMessage: string | null = null;
  errorStatusCode: number | null = null;

  get pageEmployees(): Employee[] {
    const start = this.currentPage * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.employees.length / this.pageSize);
  }

  get firstItemNumber(): number {
    return this.employees.length === 0 ? 0 : this.currentPage * this.pageSize + 1;
  }

  get lastItemNumber(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.employees.length);
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.isTestingError = false;
    this.errorMessage = null;
    this.errorStatusCode = null;

    this.http.get<Employee[]>('/assets/employees.json').subscribe({
      next: (employees) => {
        this.employees = employees;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Failed to load employee data.', error);
        this.errorMessage = 'Unable to load employee data. Please try again later.';
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

    this.http.get('https://httpbin.org/status/400').subscribe({
      next: () => {
        this.isLoading = false;
        this.isTestingError = false;
        this.errorMessage = 'The test endpoint did not return the expected error.';
      },
      error: (error: unknown) => {
        console.info('Employee HTTP error test returned an error response.', error);
        this.errorMessage = 'The employee error state is active.';
        this.errorStatusCode = error instanceof HttpErrorResponse ? error.status : null;
        this.isLoading = false;
        this.isTestingError = false;
      },
    });
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
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
}
