import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertifyService, MessageType, Position } from '../../Services/UserDetail/alertify.service';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../../Services/Account/account.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private alertify: AlertifyService, private accService: AccountService, root: Router) { }

  loginObj: any = {
    "userName": '',
    "password": '',
  };



  http = inject(HttpClient);
  router = inject(Router);


  navigateToRegister() {
    window.location.href = '/register';
  }

  onLogin() {

    this.accService.onLogin(this.loginObj).subscribe((res: any) => {
      if (res.success) {
        this.alertify.message("Giriş İşlemi Başarılı  ", {
          messageType: MessageType.Success,
          delay: 3,
          position: Position.BottomRight,
        });
        localStorage.setItem('token', res.data.token);
        this.accService.setSession(true);
        this.router.navigateByUrl('user');
      }
      else {
        this.alertify.message("Kullanıcı adı veya Parolanızı kontrol ediniz", {
          messageType: MessageType.Error,
          delay: 3,
          position: Position.BottomRight,
        })
      }
    })
  }
}