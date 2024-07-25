import { Component } from '@angular/core';
import { AuthenticationRequest } from '../SERVICE/authentication-request';
import { Router } from '@angular/router';
import { AuthenticationService } from '../SERVICE/authentication.service';
import { TokenService } from '../SERVICE/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  authRequest: AuthenticationRequest = {mail: '', mdp: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  public login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.authService.setLoggedIn(true);
        if (this.tokenService.userRoles.includes("USER")) {
          this.router.navigate(['admin']);
        }
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }

  public register() {
    this.router.navigate(['/register']);
  }
}
