

import { Component, ElementRef, inject, Inject, OnInit, ViewChild } from '@angular/core';
import bootstrap from '../../../main.server';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { on } from 'events';
import { ThisReceiver } from '@angular/compiler';
import { AlertifyService, MessageType, Position } from '../../Services/UserDetail/alertify.service';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../../Services/Account/account.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  userDetailList: User[] = []
  userDetailService = inject(UserService);
  selectedUser: User | null = null;

  userForm: FormGroup = new FormGroup({});
  updateForm : FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private alertify: AlertifyService , private accService : AccountService,root : Router) { }
  router = inject(Router);

  ngOnInit(): void {
    this.setFormState();
    this.loadUserDetail();
    

  }
  
  setFormState() {
    this.userForm = this.fb.group(
      {
        id: [0],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required]],
      })
      this.updateForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', Validators.required],
      });
  
  }

  openModal() {

    const empModal = document.getElementById('myModal')
    if (empModal != null) {
      empModal.style.display = 'block';

    }
  }

  closeModal() {
    const empModal = document.getElementById('myModal')

    const inputs = empModal?.getElementsByTagName('input');
    if (inputs) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
    }
    empModal.style.display = 'none';  }


    openUpdateModal(user: User) {
      this.selectedUser = user;
      this.updateForm.patchValue(user);
      const updateModal = document.getElementById('updateModal');
      if (updateModal) {
        updateModal.style.display = 'block';
      }
    }

    closeUpdateModal() {
      const updateModal = document.getElementById('updateModal');
      if (updateModal) {
        updateModal.style.display = 'none';
        this.selectedUser = null;
      }
    }


    onSubmit() {
      if (this.userForm.valid) {
        this.accService.onSubmit(this.userForm).subscribe({
          next: (response) => {
            this.alertify.message("Kişi Başarıyla Eklendi", {
              messageType: MessageType.Success,
              delay: 3,
              position: Position.BottomRight,
            });
            this.userForm.reset();
            this.closeModal(); // Modalı kapatma işlemi
            this.loadUserDetail(); // Kullanıcı listesini yeniden yükleme
          },
          error: (error) => {
            this.alertify.message("Kişi eklenirken bir hata oluştu", {
              messageType: MessageType.Error,
              delay: 3,
              position: Position.BottomCenter,
            });
          }
        });
      } else {
        this.alertify.message("Lütfen tüm alanları doldurunuz", {
          messageType: MessageType.Warning,
          delay: 3,
          position: Position.BottomCenter,
        });
      }
    }

  deleteUserDetail(userId: number) {
    if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      this.accService.deleteUserDetail(userId).subscribe({
        next: () => {
          this.alertify.message("Kullanıcı başarıyla silindi", {
            messageType: MessageType.Success,
            delay: 3,
            position: Position.BottomCenter,
          });
          this.loadUserDetail(); // Kullanıcı listesini yeniden yükleme
        },
        error: (error) => {
          this.alertify.message("Kullanıcı silinirken bir hata oluştu", {
            messageType: MessageType.Error,
            delay: 3,
            position: Position.BottomCenter,
          });
        }
      });
    
    }}
    onUpdateSubmit() {
      if (this.updateForm.valid && this.selectedUser) {
        const updatedUser = { ...this.selectedUser, ...this.updateForm.value };
        this.accService.updateUserDetail(updatedUser).subscribe({
          next: () => {
            this.alertify.message("Kişi başarıyla güncellendi", {
              messageType: MessageType.Success,
              delay: 3,
              position: Position.BottomCenter,
            });
            this.closeUpdateModal();
            this.loadUserDetail();
          },
          error: () => {
            this.alertify.message("Kişi güncellenirken bir hata oluştu", {
              messageType: MessageType.Error,
              delay: 3,
              position: Position.BottomCenter,
            });
          }
        });
      }
    }


  loadUserDetail(){
    this.accService.getAllUserDetails().subscribe((res : any)=>{
      this.userDetailList = res.data;
    })
  }

  logOut(){
    if (window.confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      this.accService.logOut(); // AccountService'de logout metodunu çağır
      this.router.navigate(['/login']); // Login sayfasına yönlendir
    }

  }
}