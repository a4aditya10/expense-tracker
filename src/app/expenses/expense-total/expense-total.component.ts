import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense.model';

@Component({
  selector: 'app-expense-total',
  templateUrl: './expense-total.component.html',
  styleUrls: ['./expense-total.component.css']
})
export class ExpenseTotalComponent implements OnInit {
  total: number = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.expenses$.subscribe((expenses: Expense[]) => {
      this.total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    });
  }
}
