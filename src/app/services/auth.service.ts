import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  UserProfile
} from '../../app/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5186/api';

  // Access token is intentionally kept in memory
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      request,
      {
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        this.accessToken = response.accessToken;
      })
    );
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/refresh`,
      {},
      {
        withCredentials: true
      }
    ).pipe(
      tap(response => {
        this.accessToken = response.accessToken;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/logout`,
      {},
      {
        withCredentials: true
      }
    ).pipe(
      tap(() => {
        this.clearToken();
      })
    );
  }

  clearToken(): void {
    this.accessToken = null;
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${this.apiUrl}/user/profile`
    );
  }

  getData(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/user/data`
    );
  }

  getAdminData(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/user/admin`
    );
  }
}