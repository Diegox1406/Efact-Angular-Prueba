import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsViewComponent } from './documents-view/documents-view.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: DocumentsViewComponent, canActivate: [authGuard] }
];

@NgModule({
  declarations: [DocumentsViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DocumentsModule {}
