import { Component } from '@angular/core';
import { RegistrationRequest } from '../SERVICE/registration-request';
import { Router } from '@angular/router';
import { AuthenticationService } from '../SERVICE/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {mail: '', nom: '', prenom: '', mdp: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  public login() {
    this.router.navigate(['login']);
  }

  public register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
  }
}
