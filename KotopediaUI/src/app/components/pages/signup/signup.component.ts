import { Component, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  passwordsNotEqual:boolean = true;

  file : File|undefined;

  genders: any[] = [
    {value: 'g-1', viewValue: 'Male'},
    {value: 'g-2', viewValue: 'Female'}
  ];

  constructor( ) { }

  ngOnChanges(): void {
    this.passwordsNotEqual = this.signupForm.controls['confirmationPassword'].value !== this.signupForm.controls['password'].value;
  }

  signupForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(12),Validators.minLength(3)]),
    email : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl('',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]),
    confirmationPassword: new FormControl('',[Validators.required,Validators.maxLength(12),Validators.minLength(6)])
  })

  get nameValid(){
    return !this.signupForm.controls['name'].value ? 'You must enter a value'
     : !this.signupForm.controls['name'].valid ? 'Not a valid format' : '';
  }

  get emailValid(){
    return !this.signupForm.controls.email.value ? 'You must enter a value'
    : !this.signupForm.controls['email'].valid ? 'Not a valid email' : '';
  }

  get passwordValid(){
    return !this.signupForm.controls['password'].value ? 'You must enter a value'
    : !this.signupForm.controls['password'].valid ? 'Not a valid password' : '';
  }

  get confirmationPasswordValid(){
    return !this.signupForm.controls['confirmationPassword'].value ? 'You must enter a value'
    : !this.signupForm.controls['confirmationPassword'].valid ? 'Not a valid password'
    : this.passwordsNotEqual ? 'Please enter the same password' : '';
  }

  getPhoto(event:any) {
    this.file = event.target.files[0];
  }
}
