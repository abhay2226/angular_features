import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Todo {
  id: number;
  title: string;
}

const STORAGE_KEY = 'angular-features.todos';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  private nextTodoId = 1;

  todos: Todo[] = [];
  newTodoTitle = '';
  editingTodoId: number | null = null;
  editTodoTitle = '';
  storageError: string | null = null;

  ngOnInit(): void {
    this.loadTodos();
  }

  addTodo(): void {
    const title = this.newTodoTitle.trim();
    if (!title) {
      return;
    }

    this.todos = [...this.todos, { id: this.nextTodoId++, title }];
    this.newTodoTitle = '';
    this.saveTodos();
  }

  startEditing(todo: Todo): void {
    this.editingTodoId = todo.id;
    this.editTodoTitle = todo.title;
  }

  saveEdit(id: number): void {
    const title = this.editTodoTitle.trim();
    if (!title) {
      return;
    }

    this.todos = this.todos.map((todo) => (todo.id === id ? { ...todo, title } : todo));
    this.cancelEditing();
    this.saveTodos();
  }

  cancelEditing(): void {
    this.editingTodoId = null;
    this.editTodoTitle = '';
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
  }

  private loadTodos(): void {
    try {
      const savedTodos: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (!Array.isArray(savedTodos) || !savedTodos.every(this.isTodo)) {
        throw new Error('Saved todo data has an invalid format.');
      }

      this.todos = savedTodos;
      this.nextTodoId = this.todos.reduce(
        (maximumId, todo) => Math.max(maximumId, todo.id),
        0,
      ) + 1;
    } catch (error: unknown) {
      console.error('Failed to load saved todo list.', error);
      this.storageError = 'Saved tasks could not be loaded from this browser.';
    }
  }

  private saveTodos(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
      this.storageError = null;
    } catch (error: unknown) {
      console.error('Failed to save todo list.', error);
      this.storageError = 'Tasks changed, but could not be saved in this browser.';
    }
  }

  private isTodo(value: unknown): value is Todo {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const todo = value as Record<string, unknown>;
    return (
      typeof todo['id'] === 'number' &&
      typeof todo['title'] === 'string'
    );
  }
}
