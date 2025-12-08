import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentsService } from '../document.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private documentsService: DocumentsService, private sanitizer: DomSanitizer, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Ver si hay token
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  viewXml(): void {
    this.loading = true;
    this.error = '';
    this.selectedType = 'xml';
    this.pdfUrl = null;

    this.documentsService.getXml(this.ticket).subscribe({
      next: (data) => {
        this.content = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar XML:', err);
        this.error = err.status === 401
          ? 'Sesión expirada. Por favor, inicie sesión nuevamente.'
          : 'Error al cargar el archivo XML';
        this.loading = false;
      }
    });
  }

  viewCdr(): void {
    this.loading = true;
    this.error = '';
    this.selectedType = 'cdr';
    this.pdfUrl = null;

    this.documentsService.getCdr(this.ticket).subscribe({
      next: (data) => {
        this.content = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar CDR:', err);
        this.error = err.status === 401
          ? 'Sesión expirada. Por favor, inicie sesión nuevamente.'
          : 'Error al cargar el archivo CDR';
        this.loading = false;
      }
    });
  }

  viewPdf(): void {
    this.loading = true;
    this.error = '';
    this.selectedType = 'pdf';
    this.content = '';

    this.documentsService.getPdf(this.ticket).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar PDF:', err);
        this.error = err.status === 401
          ? 'Sesión expirada. Por favor, inicie sesión nuevamente.'
          : 'Error al cargar el archivo PDF';
        this.loading = false;
      }
    });
  }
}
