import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];

  // ✅ Subject for reactive updates
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable(); // Observable to subscribe to

  constructor() {
    this.loadFromStorage(); // ✅ Load data from localStorage at start
  }

  // ✅ Get a copy of expenses (non-reactive)
  getExpenses(): Expense[] {
    return [...this.expenses];
  }

  // ✅ Add a new expense and update subscribers
  addExpense(expense: Expense): void {
    this.expenses.push(expense);
    this.saveToStorage();
    this.expensesSubject.next(this.getExpenses()); // 🔁 Emit new value
  }

  // ✅ Delete by ID and emit updated list
  deleteExpense(id: string): void {
    this.expenses = this.expenses.filter(exp => exp.id !== id);
    this.saveToStorage();
    this.expensesSubject.next(this.getExpenses()); // 🔁 Emit new value
  }

  // ✅ Save to localStorage
  private saveToStorage(): void {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  // ✅ Load from localStorage and emit to Subject
  private loadFromStorage(): void {
    const data = localStorage.getItem('expenses');
    if (data) {
      this.expenses = JSON.parse(data);
      this.expensesSubject.next(this.getExpenses()); // 🔁 Initial emit
    }
  }
}
