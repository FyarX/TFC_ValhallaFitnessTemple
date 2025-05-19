import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        localStorage.setItem('usuario', JSON.stringify(user));
      })
    );
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
  }

  getUserRole(): string | null {
    const rol = localStorage.getItem('rol');
    return rol;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('usuario') !== null; // Verifica si el usuario está loggeado
  }
}
