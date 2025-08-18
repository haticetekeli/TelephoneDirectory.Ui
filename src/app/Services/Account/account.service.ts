import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private session: boolean = false;

  private apiUrl = "http://localhost:7090/api";
  constructor(private http: HttpClient) { }

  setSession(value: boolean) {
    this.session = value;
  }

  getSession(): boolean {
    return this.session;
  }

  onLogin(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/Login`, obj);
  }

  getAllUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/UserDetail/Get-AllUser-details`);
  }

  logOut() {
    localStorage.removeItem('token');
  }


  onSubmit(userForm: FormGroup): Observable<any> {
    if (userForm.valid) {
      const userData = userForm.value;
      return this.http.post(`${this.apiUrl}/UserDetail/Add-User-details`, userData);
    } else {
      throw new Error("Form is not valid");
    }
  }

  deleteUserDetail(userId: number): Observable<any> {
    const url = `${this.apiUrl}/UserDetail/${userId}`;
    return this.http.delete(url);
  }

  updateUserDetail(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/UserDetail/${user.id}`, user);
  }
}