import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendUserDataService } from 'src/app/services/send-user-data.service';
import { LocalStorageService } from 'angular-web-storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private myServ : SendUserDataService, private local: LocalStorageService ) { }

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
      this.currentUser = res;
      console.log(this.currentUser);
      this.local.set('user', this.currentUser.user);
      this.local.set('token', this.currentUser.token);
    },
    error: err => {
      console.log({email: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value});
      console.log(err);
    },
  })
}

}
