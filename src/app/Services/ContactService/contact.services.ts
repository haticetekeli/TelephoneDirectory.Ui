import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  updateContact(id: any, contact: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:7090/api/Contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
