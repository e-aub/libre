import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './guards/auth-guard';
import { HomeComponent } from './pages/home/home.component';
import { Dashboard } from './pages/dashboard/dashboard';
import { Layout } from './pages/layout/layout';

export const routes: Routes = [
    {
        path: 'welcome',
        component: WelcomeComponent,
    },
    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'dashboard',
                component: Dashboard,
            },
        ]
    },

];
