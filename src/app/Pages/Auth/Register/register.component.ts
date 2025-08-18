import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertifyOptions, AlertifyService, MessageType, Position } from '../../../Services/UserDetail/alertify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  RegisterObj: any = {
    "userName": '',
    "password": '',
    "FirstName": '',
    "LastName": '',
  };
  http = inject(HttpClient);
  router = inject(Router);
  ngOnInit(): void {
  }
  constructor(private fb: FormBuilder, private alertify: AlertifyService) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.RegisterObj = {
      userName: this.registerForm.get('userName')?.value,
      FirstName: this.registerForm.get('firstName')?.value,
      LastName: this.registerForm.get('lastName')?.value,
      password: this.registerForm.get('password')?.value
    };
    this.http.post("http://localhost:5192/api/User/Register", this.RegisterObj).subscribe((res: any) => {
      if (res.success) {
        this.alertify.message("Kayıt İşlemi Başarılı  ", {
          messageType: MessageType.Success,
          delay: 3,
          position: Position.BottomRight,
        });
        this.router.navigateByUrl('login');
      }
      else{
        this.alertify.message("Kayıt oluşturulurken bir hata oluştu.", {
          messageType: MessageType.Error,
          delay: 3,
          position: Position.BottomRight,
        })
      }

    })
  }
}