import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: LayoutMainComponent,
        children: [
            {
                path: 'inicio',
                component: HomeComponent,
            },
            {
                path: 'no se aun',
                component: NoSeAunComponent,
            }
        ],
    },
    {
        path: 'auth',
        component: LayoutAuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
        ],
    },
    {
        path: 'admin',
        component: LayoutAdminComponent,
        children: [
        ],
    }
];
