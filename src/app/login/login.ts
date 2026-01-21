// src\app\login\login.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/AuthService';
import { NotificationService } from '../notification/services/notification-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLogging = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // console.log('this.loginForm.value ', this.loginForm.value);
    this.isLogging = true;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLogging = false;
          this.notificationService.showSuccess('Login realizado com sucesso! Bem-vindo(a).');
          this.router.navigate(['/imoveis']);
        },
        error: (err) => {
          this.isLogging = false;
          this.notificationService.showError('Credenciais inválidas. Tente novamente.');
          console.error(err);
        },
      });
    }
  }
}