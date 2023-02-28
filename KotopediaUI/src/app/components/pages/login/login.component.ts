import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendUserDataService } from 'src/app/services/send-user-data.service';
import { LocalStorageService } from 'angular-web-storage';
import { Location } from '@angular/common';
import { AppHttpService } from 'src/app/services/app-http.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
     private myServ : SendUserDataService,
      private local: LocalStorageService,
      private myService:AppHttpService,
      private router: Router ) {
if(  local.get('sessionOut')){
  console.log("end !");
  Swal.fire({
    title: 'User session expired !',
    text: 'You are been logged out please log in again !.',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }

  })
  local.set('sessionOut',false);

}


      }

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl('',[Validators.required,Validators.pattern(new RegExp('^[a-zA-Z0-9]{8,16}$'))])
  })

  get emailValid(){
    return !this.loginForm.controls.email.value ? 'You must enter a value'
    : !this.loginForm.controls['email'].valid ? 'Invalid email format' : '';
  }

  get passwordValid(){
    return !this.loginForm.controls['password'].value ? 'You must enter a value'
    : !this.loginForm.controls['password'].valid ? 'Invalid password format' : '';
  }

currentUser:any;
x:any;
y:any;

sendUserData(){
  this.myServ.sendLoginData({email: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value}).subscribe({
    next: res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Logged in successfully ',
        showConfirmButton: false,
        timer: 1300
      })

      this.currentUser = res;
      console.log(this.currentUser);
      this.myService.setToken(this.currentUser.token);
      console.log(this.currentUser.token)
      this.myService.setUser(this.currentUser.user);
      // this.router.navigate(['/home']);
      setTimeout(function() {
        window.location.href = "/home";
    }, 1500);

    },
    error: err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password!',
      })
      this.loginForm.reset();
      console.log({email: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value});
      console.log(err);
    },
  })
}

}
