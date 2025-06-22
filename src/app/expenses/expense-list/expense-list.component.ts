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

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.expenses$.subscribe((data) => {
      this.expenses = data;
    });
  }

  onDelete(id: string): void {
    this.expenseService.deleteExpense(id);
    // ❌ No need to manually refresh here now!
  }
}
