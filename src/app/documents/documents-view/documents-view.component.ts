import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentsService } from '../document.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-documents-view',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './documents-view.component.html',
  styleUrl: './documents-view.component.css'
})
export class DocumentsViewComponent implements OnInit {

  ticket = '571cc3a3-5b1f-4855-af26-0de6e7c5475f';
  selectedType: 'xml' | 'cdr' | 'pdf' | null = null;
  content = '';
  pdfUrl: SafeResourceUrl | null = null;
  loading = false;
  error = '';

  constructor(
    private documentsService: DocumentsService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  private resetState(type: 'xml' | 'cdr' | 'pdf'): void {
    this.loading = true;
    this.error = '';
    this.selectedType = type;

    if (type === 'pdf') {
      this.content = '';
    } else {
      this.pdfUrl = null;
    }
  }

  private handleError(err: any, docType: string): void {
    console.error(`Error al cargar ${docType}:`, err);
    this.error = err.status === 401
      ? 'Su sesion ha terminado'
      : `Error al cargar el archivo ${docType}`;
    this.loading = false;
  }

  viewXml(): void {
    this.resetState('xml');
    this.documentsService.getXml(this.ticket).subscribe({
      next: (data) => {
        this.content = data;
        this.loading = false;
      },
      error: (err) => this.handleError(err, 'XML')
    });
  }

  viewCdr(): void {
    this.resetState('cdr');
    this.documentsService.getCdr(this.ticket).subscribe({
      next: (data) => {
        this.content = data;
        this.loading = false;
      },
      error: (err) => this.handleError(err, 'CDR')
    });
  }

  viewPdf(): void {
    this.resetState('pdf');
    this.documentsService.getPdf(this.ticket).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.loading = false;
      },
      error: (err) => this.handleError(err, 'PDF')
    });
  }
  
}
