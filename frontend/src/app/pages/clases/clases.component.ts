import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Clase, ClaseService } from '../../core/services/clase/clase.service';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  imports: [NgFor],
})
export class ClasesComponent implements OnInit {
  clases: Clase[] = [];

  constructor(private claseService: ClaseService, private auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.claseService.getClases().subscribe({
      next: data => this.clases = data,
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
    console.error('El usuario no está autenticado.');
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
    next: res => alert('Te has apuntado correctamente'),
    error: err => console.error('Error al apuntarse', err)
  });
}
}
