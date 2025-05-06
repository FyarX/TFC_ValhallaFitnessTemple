import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup,  Validators, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, CircleUser, Lock, IdCard, Mail, Smartphone} from 'lucide-angular';

@Component({
  selector: 'app-registro',
  imports: [RouterModule, NgIf, LucideAngularModule, ReactiveFormsModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ CircleUser, Lock, IdCard, Mail, Smartphone })
    }
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  // Propiedad para almacenar el formulario reactivo
  registerForm!: FormGroup;
  // Constructor con inyección de FormBuilder
  constructor(private fb: FormBuilder) { }

  // Método para inicializar el formulario reactivo
  ngOnInit() {
    // Creación del formulario reactivo con validaciones
    // Se utiliza FormBuilder para crear un grupo de controles de formulario
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  // Método para verificar si un campo es válido
  get f() {
    return this.registerForm?.controls;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    // Verifica si el formulario es válido
    if (this.registerForm.valid) {
      // Aquí puedes manejar la lógica de registro, como enviar los datos a un servidor
      console.log('Formulario enviado:', this.registerForm.value);
    } else {
      // Si el formulario no es válido, muestra un mensaje de error o realiza alguna acción
      console.log('Formulario inválido');
    }
  }

}
