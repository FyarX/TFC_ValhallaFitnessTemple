import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup,  Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, CircleUser, Lock, IdCard, Mail, Smartphone, Users} from 'lucide-angular';
import { AuthService } from '../../core/services/auth/auth.service'

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
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    telefono: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    rol: new FormControl('usuario')
  });

  constructor(private auth: AuthService) {}

  onSubmit() {
    this.auth.register(this.registroForm.value).subscribe({
      next: res => alert('Registrado con éxito'),
      error: err => alert('Error al registrar: ' + err.error)
    });
  }
}
  