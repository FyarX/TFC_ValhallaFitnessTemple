import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-producto',
  imports: [ ReactiveFormsModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent {
  nuevoProductoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,30}$/)]),
    sala: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,50}$/)]),
    fecha: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}) ([01][0-9]|2[0-3]):([0-5][0-9])$/)]), // Formato DD-MM-YYYY HH:mm
  });
}
