import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo-producto',
  imports: [ ReactiveFormsModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})



export class NuevoProductoComponent {

  constructor( private http: HttpClient) {}

  nuevoProductoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,30}$/)]),
    categoria: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,50}$/)]),
    imagen: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}) ([01][0-9]|2[0-3]):([0-5][0-9])$/)]), // Formato DD-MM-YYYY HH:mm
    precio: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]), // Formato numérico con hasta dos decimales
    stock: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]) // Solo números enteros
  });


  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nombre', this.nuevoProductoForm.get('nombre')?.value ?? '');
    formData.append('categoria', this.nuevoProductoForm.get('categoria')?.value ?? '');
    // otros campos...
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post('/api/products', formData).subscribe(response => {
      console.log('Producto creado', response);
    });
  }
}
