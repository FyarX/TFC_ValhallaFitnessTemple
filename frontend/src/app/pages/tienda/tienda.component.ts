import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../../core/services/producto/producto.service';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-tienda',
  imports: [NgFor, CommonModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(){
    this.productoService.getProductos().subscribe({
      next: (res) => this.productos = res,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }
}
