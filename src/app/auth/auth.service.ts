import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private tokenUrl = environment.tokenUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Y2xpZW50OnNlY3JldA=='
    });

    return this.http.post<any>(
      this.tokenUrl,
      body.toString(),
      { headers }
    );

  }

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
    console.log('Token guardado:', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('auth_token');
    console.log('Token recuperado:', token);
    return token;
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

}