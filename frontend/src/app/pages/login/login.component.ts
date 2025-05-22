import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, User, Lock} from 'lucide-angular';
import { AuthService } from '../../core/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterModule, LucideAngularModule, ReactiveFormsModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ User, Lock })
    }
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });

    // Cargar cookie al iniciar
    const rememberedEmail = this.getCookie('email');
    if (rememberedEmail) {
      this.loginForm.patchValue({
        email: rememberedEmail,
        remember: true
      });
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password, remember } = this.loginForm.value;

    this.auth.login({ email, password }).subscribe({
      next: () => {
        if (remember) {
          document.cookie = `email=${email}; max-age=604800; path=/`; // 7 dias
        } else {
          document.cookie = `email=; max-age=0; path=/`;
        }

        this.router.navigate(['/inicio']);
      },
      error: err => {
        this.toastr.error('Email o contraseña inválidos, intente de nuevo', 'Error', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true
        });
      }
    });
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null;
  }
}
