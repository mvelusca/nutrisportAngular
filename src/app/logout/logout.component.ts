import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../SERVICE/authentication.service';
import { TokenService } from '../SERVICE/token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
    this.logout();
  }

  logout() {
    this.tokenService.token = '';
    this.authService.setLoggedIn(false);
    this.router.navigate(['/home']);
  }
}
