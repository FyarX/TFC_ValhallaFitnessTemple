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
}