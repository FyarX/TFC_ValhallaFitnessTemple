import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-producto',
  imports: [ ReactiveFormsModule, NgIf ],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})



export class NuevoProductoComponent {

  constructor( private http: HttpClient, private toastr: ToastrService) {}

  nuevoProductoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,30}$/)]),
    categoria: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,50}$/)]),
    precio: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]), // Formato numérico con hasta dos decimales
    stock: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]) // Solo números enteros
  });

  imagenTocada = false;
  selectedFile: File | null = null;
  onFileSelected(event: any): void {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];
    this.imagenTocada = true;
  }
}

  onSubmit() {
  if (this.nuevoProductoForm.valid && this.selectedFile) {
    const formData = new FormData();
    formData.append('nombre', this.nuevoProductoForm.get('nombre')?.value ?? '');
    formData.append('categoria', this.nuevoProductoForm.get('categoria')?.value ?? '');
    formData.append('precio', this.nuevoProductoForm.get('precio')?.value ?? '');
    formData.append('stock', this.nuevoProductoForm.get('stock')?.value ?? '');
    formData.append('imagen', this.selectedFile);

    this.http.post('https://backend-valhallaft.onrender.com/api/productos', formData).subscribe({
      next: () => this.toastr.success('Producto creado exitosamente'),
      error: (error) => this.toastr.error('Error al crear el producto: ' + error.message)
    });
  } else {
    this.toastr.error('Por favor completa todos los campos correctamente.');
  }
}


}
