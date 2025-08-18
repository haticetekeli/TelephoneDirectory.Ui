import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Directory } from '../../Models/directory';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:7090/api/contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Directory[]> {
    return this.http.get<Directory[]>(this.apiUrl);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contact);
  }
}
