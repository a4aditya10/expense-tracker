import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];

  selectedCategory: string = '';
  fromDate?: Date;
  toDate?: Date;

  categories: string[] = ['Food', 'Travel', 'Bills', 'Shopping', 'Others'];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenses = this.expenseService.getExpenses();
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
    this.expenses = this.expenseService.getExpenses();
  }

  filteredExpenses(): Expense[] {
    return this.expenses.filter((expense) => {
      const matchesCategory =
        !this.selectedCategory || expense.category === this.selectedCategory;

      const expenseDate = new Date(expense.date);
      const matchesFrom = !this.fromDate || expenseDate >= this.fromDate;
      const matchesTo = !this.toDate || expenseDate <= this.toDate;

      return matchesCategory && matchesFrom && matchesTo;
    });
  }
}
