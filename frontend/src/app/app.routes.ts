import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        // children: [
        //     {
        //         path: 'inicio',
        //         component: HomeComponent,
        //     },
        //     {
        //         path: 'no se aun',
        //         component: NoSeAunComponent,
        //     }
        // ],
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
