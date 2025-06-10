import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Se exporta el modelo de producto para poder usarlo en otros componentes
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  // URL de la API de productos
  private apiUrl = 'https://backend-valhallaft.onrender.com/api/productos';

  // Constructor de la clase (Llamado al servicio HttpClient)
  constructor(private http: HttpClient) {}

  //! Definicion de métodos del servicio
  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Crear un nuevo producto
  crearProducto(producto: {
    nombre: string;
    categoria: string;
    precio: string;
    stock: string;
    imagen: File;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('categoria', producto.categoria);
    formData.append('precio', producto.precio);
    formData.append('stock', producto.stock);
    formData.append('imagen', producto.imagen);

    return this.http.post<any>(this.apiUrl, formData);
  }

  // Actualizar un producto existente
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
