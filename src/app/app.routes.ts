import { Routes } from '@angular/router';
import { DocumentsViewComponent } from './documents/documents-view/documents-view.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'documents',
    component: DocumentsViewComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
