import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.loading = true;
    this.errorMessage = '';

    const request = {
      username: this.username,
      password: this.password
    };

    this.authService.login(request).subscribe({

      next: () => {

        this.loading = false;

        // Redirect after successful login
        this.router.navigate(['/home']);
      },

      error: error => {

        this.loading = false;

        console.error(error);

        this.errorMessage =
          'Invalid username or password';
      }
    });
  }
}