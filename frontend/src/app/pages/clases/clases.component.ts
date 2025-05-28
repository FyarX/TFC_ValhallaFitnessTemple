import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Clase, ClaseService } from '../../core/services/clase/clase.service';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, SquarePlus } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  imports: [NgFor, CommonModule, LucideAngularModule, RouterModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ SquarePlus })
    }
  ],
})
export class ClasesComponent implements OnInit {
  clases: Clase[] = [];

  constructor(private claseService: ClaseService, private auth: AuthService, private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {
  this.claseService.getClases().subscribe({
    next: data => {
      const ahora = new Date();
      this.clases = data.filter(clase => new Date(clase.fecha) > ahora);
    },
    error: err => console.error('Error al cargar clases', err)
  });
}

  getImageUrl(nombre: string): string {
  const normalized = nombre.toLowerCase().replace(/\s+/g, '');
  const basePath = 'assets/img/clases_img/'; // Carpeta dentro de /src/assets/
  const map: { [key: string]: string } = {
    spinning: 'spinning.jpg',
    crossfit: 'crossfit.jpg',
    yoga: 'yoga.jpg',
    hiit: 'hiit.jpg',
    pilates: 'pilates.jpg'
  };

  return basePath + (map[normalized] || 'default.jpg');
}

  apuntarse(clase: Clase): void {
  const usuarioId = this.auth.getUserId();
  const claseId = clase.id;

  if (usuarioId === null) {
    this.toastr.error('Debes iniciar sesión para apuntarte a una clase.');
    return;
  }

  console.log('Usuario ID:', usuarioId);
  console.log('Clase:', claseId);

  this.http.post('http://localhost:8080/api/reservas', null, {
    params: {
      usuarioId: usuarioId.toString(), // asegúrate de que sea string
      claseId: claseId.toString()
    }
  }).subscribe({
    next: res => this.toastr.success('Te has apuntado a la clase correctamente.'),
    error: err => {
    if (err.status === 409) {
      this.toastr.warning('Ya estás apuntado a esta clase.');
    } else {
      this.toastr.error('Error al apuntarse a la clase. Por favor, inténtalo de nuevo más tarde.');
    }
  }
  });
}

  isAdmin(): boolean {
    return this.auth.getUserRole() === 'admin'; // Verifica si el rol del usuario es 'admin'
  }

}
