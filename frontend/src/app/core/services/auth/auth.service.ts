import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://backend-valhallaft.onrender.com/api/auth';
  
  constructor(private http: HttpClient) {}

  //? Método para registrar un nuevo usuario (Comunica con el backend)
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  //? Método para iniciar sesión
  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        console.log(user);
        localStorage.setItem('usuario', JSON.stringify(user));
      })
    );
  }

  //? Método para cerrar la sesión del usuario
  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
  }

  //? Devuelve el rol del usuario almacenado en localStorage
  getUserRole(): string | null {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const parsedUser = JSON.parse(usuario); // Se le hace un parseo para convertir el string a objeto
      return parsedUser.rol ?? null;
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  //? Verifica si el usuario está loggeado
  isLoggedIn(): boolean {
    return localStorage.getItem('usuario') !== null; // Verifica si el usuario está loggeado
  }

  //? Devuelve el ID del usuario almacenado en localStorage
  getUserId(): number | null {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const parsedUser = JSON.parse(usuario);
      return parsedUser.id; // Asegúrate de que el ID esté en el objeto de usuario
    }
    return null;
  }

  
}
