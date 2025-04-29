import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly _isLoggedIn = signal<boolean>(false); // Signal que va indicando si el usuario está loggeado o no

  readonly isLoggedIn = this._isLoggedIn.asReadonly(); // Lectura del signal para que no se pueda modificar desde fuera de la clase
  
  login(credentials: {email: string, password: string}): void {
   // !FALTA POR IMPLEMENTAR TOKEN DE AUTENTICACIÓN    
  }

  // Cierra la sesión del usuario
  logout(): void {
    this._isLoggedIn.set(false); // Cambia el estado de loggeo a false
    localStorage.removeItem('token'); // Elimina el token de localStorage
  }

  constructor() {
    if(localStorage.getItem('token')) {
      this._isLoggedIn.set(true); // Cambia el estado de loggeo a true si existe el token en local
    }
  }
}
