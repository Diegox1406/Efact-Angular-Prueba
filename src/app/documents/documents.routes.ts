import { Routes } from "@angular/router";
import { DocumentsViewComponent } from "./documents-view/documents-view.component";
import { authGuard } from "../core/guards/auth.guard";

export const DOCUMENTS_ROUTES: Routes = [
    {path: 'documents', component: DocumentsViewComponent, canActivate: [authGuard]}
];