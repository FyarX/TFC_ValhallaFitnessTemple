import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MaquinasComponent } from './pages/maquinas/maquinas.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';    
import { ClasesComponent } from './pages/clases/clases.component';
import { MisReservasComponent } from './pages/perfil/mis-clases/mis-clases.component';
import { NuevaClaseComponent } from './pages/crear/nueva-clase/nueva-clase.component';
import { NuevoProductoComponent } from './pages/crear/nuevo-producto/nuevo-producto.component';


export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
         children: [
            {
                path: '',
                redirectTo: 'inicio',
                pathMatch: 'full',
            },
            {
                path: 'inicio',
                component: InicioComponent,
            },
            {
                path: 'maquinas',
                component: MaquinasComponent,
            },
            {
                path: 'tienda',
                component: TiendaComponent,
            },
            {
                path: 'contacto',
                component: ContactoComponent,
            },
            {
                path: 'clases',
                component: ClasesComponent
            }
        ],
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'registro',
                component: RegistroComponent,
            },
        ],
    },
    {
        path: 'perfil',
        component: MainLayoutComponent,
        children: [
            {
                path: 'mis-clases',
                component: MisReservasComponent
            }
        ],
    },
    {
        path: 'crear',
        component: MainLayoutComponent,
        children: [
            {
                path: 'nueva-clase',
                component: NuevaClaseComponent
            },
            {
                path: 'nuevo-producto',
                component: NuevoProductoComponent
            }
        ]
    }
];
