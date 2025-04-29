import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export interface UserInfo {
  id: number;
  name: string;
  pfp: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  readonly user = signal<UserInfo | null>(null);

  cargarPerfil() {
    this.http.get<UserInfo>('https://api.example.com/user').subscribe(
      (data: any) => {
        this.user.set(data);
      },
      (error: any) => {
        console.error('Error al cargar el perfil:', error);
      }
    );
  }

  getPfp(): string {
    const user = this.user();
    return `public/assets/img/${user?.pfp}` || 'public/assets/img/default.jpg';
  } 
}
