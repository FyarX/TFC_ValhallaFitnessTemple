import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup,  Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, CircleUser, Lock, IdCard, Mail, Smartphone, Users} from 'lucide-angular';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  imports: [RouterModule, LucideAngularModule, ReactiveFormsModule, NgIf],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ CircleUser, Lock, IdCard, Mail, Smartphone, Users })
    }
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,30}$/)]),
    apellidos: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,50}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]), // Solo acepta letras mayúsculas, minúsculas y números
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]), // Solo acepta 9 dígitos
    dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]), // Solo acepta 8 dígitos y una letra
    rol: new FormControl('usuario')
  });

  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router) {}

  onSubmit() {
  if (this.registroForm.invalid) return;

  this.auth.register(this.registroForm.value).subscribe({
    next: res => {
      console.log('✅ Registrado con éxito', res);
      localStorage.setItem('registroExitoso', 'true'); // Guardamos la bandera
      this.router.navigate(['/inicio']); // Redirige
    },
    error: err => {
      console.error('❌ Error:', err);
      let mensaje = 'Error desconocido';
      
      // Maneja texto plano o JSON
      if (typeof err.error === 'string') {
        mensaje = err.error;
      } else if (err.error?.message) {
        mensaje = err.error.message;
      } else if (err.message) {
        mensaje = err.message;
      }

      this.toastr.error( mensaje, 'Error al registrar el usuario, por favor inténtelo de nuevo');
    }
  });
}
}
  