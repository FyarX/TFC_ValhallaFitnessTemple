import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  //! Carrusel de tarifas
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  currentIndex = 0;

  tarifas = [
    { nombre: 'Mensual', descripcion: 'Paga solo aquellos meses que entrenes sin ningún tipo de permanencia ni matrícula', precio: '34,99€/mes' },
    { nombre: 'Trimestral', descripcion: 'Paga cada 3 meses y recibe adicionalmente un descuento en suplementación', precio: '29,99€/mes' },
    { nombre: 'Anual', descripcion: 'Paga una sola vez al año y disfruta de rutinas personalizadas y mas de un 25% de descuento ', precio: '25,99€/mes' },
    { nombre: 'Premium', descripcion: 'Todos los beneficios en una sola suscripción (Clases, descuentos en suplementación, rutinas personalizadas,...) ', precio: '49,99/mes' }
  ];

  scrollCarousel(direction: number): void {
    const maxIndex = this.tarifas.length - 1;
    this.currentIndex = Math.min(Math.max(this.currentIndex + direction, 0), maxIndex);

    const itemWidth = 300 + 24; // ancho + espacio entre tarjetas
    this.carousel.nativeElement.scrollTo({
      left: this.currentIndex * itemWidth,
      behavior: 'smooth'
    });
  }
}
