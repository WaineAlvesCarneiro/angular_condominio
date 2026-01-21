// src\app\core\services\AuthService.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { LoginCredentials } from '../../shared/models/login-credentials.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private readonly TOKEN_KEY = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Auth/login`, credentials).pipe(
      tap((response) => this.saveToken(response.token))
    );
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private saveToken(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }
}