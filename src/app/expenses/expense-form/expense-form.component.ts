import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense.model';
// import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent {

  constructor(private expenseService: ExpenseService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

   const newExpense: Expense = {
  id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
  title: form.value.title,
  amount: form.value.amount,
  category: form.value.category,
  date: form.value.date.toISOString()
};

    this.expenseService.addExpense(newExpense);
    form.resetForm(); // Clear the form
  }
}
