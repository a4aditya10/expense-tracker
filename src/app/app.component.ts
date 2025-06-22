import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {}
 // 👇 Yeh variable error solve karega
  showExpenses: boolean = false;

  // 👇 Yeh method button ke click pe chalega
  toggleExpenses() {
    this.showExpenses = !this.showExpenses;
  }
  navigateToExpenses() {
    this.router.navigate(['/expenses']);
  }
//   testClick() {
//   console.log('Button clicked');
// }
}
