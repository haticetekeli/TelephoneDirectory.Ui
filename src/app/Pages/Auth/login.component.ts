import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>
    <input [(ngModel)]="loginObj.userName" placeholder="Username" />
    <input [(ngModel)]="loginObj.password" placeholder="Password" type="password"/>
    <button (click)="onLogin()">Login</button>
    <button (click)="navigateToRegister()">Register</button>
  `
})
export class LoginComponent {
  http = inject(HttpClient);
  router = inject(Router);

  loginObj = { userName: '', password: '' };

  onLogin() {
    this.http.post<any>('http://localhost:5192/api/User/Login', this.loginObj)
      .subscribe(res => {
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          this.router.navigateByUrl('contacts');
        } else {
          alert('Login failed');
        }
      });
  }

  navigateToRegister() {
    this.router.navigateByUrl('register');
  }
}
