import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MaquinasComponent } from './pages/maquinas/maquinas.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ContactoComponent } from './pages/contacto/contacto.component';


export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
         children: [
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
            }
        ],
    },
    // {
    //     path: 'auth',
    //     component: LayoutAuthComponent,
    //     children: [
    //         {
    //             path: 'login',
    //             component: LoginComponent,
    //         },
    //         {
    //             path: 'register',
    //             component: RegisterComponent,
    //         },
    //     ],
    // },
    // {
    //     path: 'admin',
    //     component: LayoutAdminComponent,
    //     children: [
    //     ],
    // }
];
