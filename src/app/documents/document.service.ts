import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DocumentsService {

  private apiUrl = '/api/api-efact-ose/v1';

  constructor(private http: HttpClient) {}

  getXml(ticket: string) {
    return this.http.get(`${this.apiUrl}/xml/${ticket}`, { responseType: 'text' });
  }

  getCdr(ticket: string) {
    return this.http.get(`${this.apiUrl}/cdr/${ticket}`, { responseType: 'text' });
  }

  getPdf(ticket: string) {
    return this.http.get(`${this.apiUrl}/pdf/${ticket}`, { responseType: 'blob' });
  }
}

