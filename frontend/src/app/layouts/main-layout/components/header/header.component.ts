import { Component, inject } from '@angular/core';
import { LucideAngularModule, Menu, CircleUser, LUCIDE_ICONS, LucideIconProvider} from "lucide-angular";
import { AuthService } from '../../../../core/services/auth/auth.service';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, NgIf, RouterModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ Menu, CircleUser })
    }
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  //? Constructor
  // constructor(private authService: AuthService) {} // Inyección del servicio de autenticación

  //? Ciclo de vida
  // ngOnInit(): void {} // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn(); // Inicializa el estado de si el usuario está loggeado o no
    this.userRole = this.authService.getUserRole(); // Inicializa el rol del usuario
  }

  //? Servicios
  // Router
  private router = inject(RouterModule); // Inyección del router para la navegación

  // AuthService
  private authService = inject(AuthService); // Inyección del servicio de autenticación

  //? Eventos del menú desplegable
  openMenu = false;  // Estado del menú desplegable

  toggleMenu(): void {
    this.openMenu = !this.openMenu; // Cambia el estado del menú al hacer clic en el icono
  }

  closeMenu(): void {
    this.openMenu = false; // Cierra el menú al hacer clic en el icono de nuevo
  }

  //? Eventos del menú de usuario
  openUserMenu = false;  // Estado del menú de usuario

  toggleUserMenu(): void {
    this.openUserMenu = !this.openUserMenu; // Cambia el estado del menú de usuario al hacer clic en el icono
  }

  closeUserMenu(): void {
    this.openUserMenu = false; // Cierra el menú de usuario al hacer clic en el icono de nuevo
  }

  

  //? Métodos de sesión
  isLoggedIn: boolean = false; // Estado de si el usuario está loggeado o no
  userRole: string | null = null; // Rol del usuario

  logout(){
    localStorage.clear(); // Limpia el almacenamiento local
    location.reload(); // Recarga la página
  }

}
