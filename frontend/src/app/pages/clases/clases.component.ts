import { Component, OnInit } from '@angular/core';
import { Clase, ClaseService } from '../../core/services/clase/clase.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  imports: [NgFor],
})
export class ClasesComponent implements OnInit {
  clases: Clase[] = [];

  constructor(private claseService: ClaseService) {}

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
    alert(`Te has apuntado a la clase: ${clase.nombre}`);
  }
}
