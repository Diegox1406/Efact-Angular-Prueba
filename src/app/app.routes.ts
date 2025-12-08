import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'documents',
        loadChildren: () => import('./documents/documents.routes').then(m => m.DOCUMENTS_ROUTES)
    },
    { 
        path: '**', redirectTo: 'login' 
    }
];
