import { Component, inject, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../../core/services/producto/producto.service';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, SquarePlus } from 'lucide-angular';
import { AuthService } from '../../core/services/auth/auth.service';


@Component({
  selector: 'app-tienda',
  imports: [NgFor, NgIf, CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ SquarePlus })
    }
  ],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {
  productos: Producto[] = [];
  private authService = inject(AuthService);
  userRole: string | null = null; // Rol del usuario

  constructor(private productoService: ProductoService, private auth: AuthService) { }

  ngOnInit(){
    // Se cargan todos los productos al iniciar el componente
    this.productoService.getProductos().subscribe({
      next: (res) => this.productos = res,
      error: (err) => console.error('Error al cargar productos', err)
    });

    console.log('User role:', this.userRole); // Para depuración

    this.userRole = this.auth.getUserRole(); // Inicializa el rol del usuario
  }

  //? Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    return this.userRole === 'admin'; // Verifica si el rol del usuario es 'admin'
  }
}
