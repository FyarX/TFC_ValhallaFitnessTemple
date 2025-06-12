import { Injectable, signal } from '@angular/core';

export interface UserInfo {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly user = signal<UserInfo | null>(null);

  constructor() {
    this.cargarDesdeLocalStorage();
  }

  private cargarDesdeLocalStorage() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        const datos = JSON.parse(usuarioGuardado);
        this.user.set({
          id: datos.id,
          name: datos.nombre
        });
      } catch (e) {
        console.error('Error al parsear el usuario del localStorage:', e);
        this.user.set(null);
      }
    }
  }

  getUserName(): string {
    const user = this.user();
    return user ? user.name : 'Invitado';
  }
}
