import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  getSession() {
    throw new Error('Method not implemented.');
  }
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  setSession(status: boolean) {
    this.loggedIn.next(status);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  onLogin(loginObj: any): Observable<any> {
    return this.http.post('http://localhost:5055/api/User/Login', loginObj);
  }

  onRegister(registerObj: any): Observable<any> {
    return this.http.post('http://localhost:5055/api/User/Register', registerObj);
  }
}
