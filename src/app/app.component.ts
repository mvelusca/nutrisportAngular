import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  title = 'nutrisportAngular';
  badgevisible = false;
  public login: boolean = true;
  constructor(private router: Router){ }

  public clickLogin() {
    this.router.navigate(['/login']);
  }

  
  badgevisibility() {
    this.badgevisible = true;
  }

  clickHome() {
    this.router.navigate(['/home']);
  }

}
