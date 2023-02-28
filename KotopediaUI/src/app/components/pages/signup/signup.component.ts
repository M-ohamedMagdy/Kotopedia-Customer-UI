
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder } from '@angular/forms';
import { AppHttpService } from 'src/app/services/app-http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm:FormGroup;

  genders: any[] = [{value: 'Male'},{value: 'Female'}];

  // ngDoCheck(): void {
  //   this.passwordsNotEqual = this.signupForm.controls['confirmationPassword'].value !== this.signupForm.controls['password'].value;
  // }


  constructor( private formBulider:FormBuilder ,public myService:AppHttpService ,private http:HttpClient ) {
    this.signupForm = this.formBulider.group({
      name:['',[Validators.required,Validators.maxLength(12),Validators.minLength(3)]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]],
      gender:[''],
      photo:[[],[Validators.required]],
    })
  }

  get nameNotValid(){
    return !this.signupForm.controls['name'].value ? 'You must enter a value'
     : !this.signupForm.controls['name'].valid ? 'Invalid name format' : '';
  }

  get emailNotValid(){
    return !this.signupForm.controls['email'].value ? 'You must enter a value'
    : !this.signupForm.controls['email'].valid ? 'Invalid email format' : '';
  }


  get emailValid(){
    return !this.signupForm.controls['email'].value ? 'You must enter a value'
    : !this.signupForm.controls['email'].valid ? 'Not a valid email' : '';
  }

  get passwordNotValid(){
    return !this.signupForm.controls['password'].value ? 'You must enter a value'
    : !this.signupForm.controls['password'].valid ? 'Invalid password format, password should be 8 - 16 (lowercase or uppercase) characters or digits' : '';
  }

  // get confirmationPasswordNotValid(){
  //   return !this.signupForm.controls['confirmationPassword'].value ? 'You must enter a value'
  //   : !this.signupForm.controls['confirmationPassword'].valid ? 'Invalid password format'
  //   : this.signupForm.controls['confirmationPassword'].value !== this.signupForm.controls['password'].value
  //   ? 'Please enter the same password' : '';
  // }

  selectedFile:File|any =null ;
  getPhoto(event:any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  signUp(){
    try {
      const fd = new FormData();
    fd.append('name',this.signupForm.get('name')?.value);
    fd.append('email',this.signupForm.get('email')?.value);
    fd.append('password',this.signupForm.get('password')?.value);
    fd.append('gender',this.signupForm.get('gender')?.value);
    fd.append('photo',this.selectedFile,this.selectedFile.name);
    console.log(fd)
    this.http.post("http://localhost:3000/customer/signup",fd).subscribe(
      res=>{
        console.log(res);
        console.log(this.signupForm.value);
      }
    )
    } catch (error) {
      console.log(error);
    }

  }
}
