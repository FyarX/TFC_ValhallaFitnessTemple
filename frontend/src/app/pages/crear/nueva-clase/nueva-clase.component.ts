import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClaseService } from '../../../core/services/clase/clase.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nueva-clase',
  imports: [ ReactiveFormsModule, NgIf ], 
  templateUrl: './nueva-clase.component.html',
  styleUrl: './nueva-clase.component.css'
})
export class NuevaClaseComponent {

  constructor(private claseService: ClaseService, private toastr: ToastrService) {}

  nuevaClaseForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,30}$/)]),
    sala: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,50}$/)]),
    fecha: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}) ([01][0-9]|2[0-3]):([0-5][0-9])$/)]), // Formato DD-MM-YYYY HH:mm
  });

  onSubmit() {
    if (this.nuevaClaseForm.valid) {
      const formData = new FormData();
      formData.append('nombre', this.nuevaClaseForm.get('nombre')?.value ?? '');
      formData.append('sala', this.nuevaClaseForm.get('sala')?.value ?? '');
      formData.append('fecha', this.nuevaClaseForm.get('fecha')?.value ?? '');

      this.claseService.crearClase(formData).subscribe({
      next: (res) => this.toastr.success('Clase creada exitosamente'),
      error: (err) => this.toastr.error('Error al crear la clase: ' + err.message),
    });

    } else {
      this.toastr.error('Por favor, completa todos los campos correctamente.');
    }
  }


  fecha = '';

  formatearFecha(event: any): void {
  const input = event.target.value.replace(/\D/g, ''); // Solo dígitos
  let formateado = '';

  if (input.length > 0) formateado += input.substring(0, 2);          // DD
  if (input.length > 2) formateado += '-' + input.substring(2, 4);   // MM
  if (input.length > 4) formateado += '-' + input.substring(4, 8);   // YYYY
  if (input.length > 8) formateado += ' ' + input.substring(8, 10);  // HH
  if (input.length > 10) formateado += ':' + input.substring(10, 12); // mm

  this.nuevaClaseForm.get('fecha')?.setValue(formateado, { emitEvent: false });
  } 

}
