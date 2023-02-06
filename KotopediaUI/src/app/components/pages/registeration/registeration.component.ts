import { Component, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnChanges {

  passwordsNotEqual:boolean = true;

  shortLink: string = "";
  loading: boolean = false;
  file : File|undefined;

  constructor(private fileUploadService:FileUploadService) { }

  ngOnChanges(): void {
    this.passwordsNotEqual = this.signupForm.controls['confirmationPassword'].value !== this.signupForm.controls['password'].value;
  }

  signupForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(12),Validators.minLength(3)]),
    email : new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl('',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]),
    confirmationPassword: new FormControl('',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]),
    gender: new FormControl(''),
    image: new FormControl()
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

  onChange(event:any) {
    this.file = event.target.files[0];
    console.log(this.file);

  }

  // onUpload() {
  //   this.loading = !this.loading;
  //   this.fileUploadService.upload(this.file).subscribe(
  //     (event:any) => {
  //       if(typeof (event) === 'object' ){
  //         this.shortLink = event.link;
  //         this.loading = false;
  //       }
  //     }
  //   )
  // }

}

