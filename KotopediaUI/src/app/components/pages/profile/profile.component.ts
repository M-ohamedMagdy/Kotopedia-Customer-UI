import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { FormControl, FormGroup, Validators ,FormBuilder } from '@angular/forms';
import { SendUserDataService } from 'src/app/services/send-user-data.service';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit,AfterViewInit {
  token:any;
  user:any;
  userID:any;
  headers:any;
  userImage:any;

  UpdatingForm:FormGroup;

  gender: any[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'}
  ];

  constructor(private myService:AppHttpService ,private formBulider:FormBuilder, private local: LocalStorageService){

    this.headers = {
      authorization:this.local.get('token')
    }

    this.myService.getUserInfo().subscribe(
      {
        next:(res)=>{
          console.log(res)
          this.user=res;
          this.userImage=this.user.photo;
        },
        error(err){console.log(err)}
      }
    )
    this.token=this.myService.getToken();
    console.log(this.token);


  this.UpdatingForm = this.formBulider.group({
      name:['',[Validators.maxLength(12),Validators.minLength(3)]],
      email:['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      gender:[''],
      password:['',[Validators.maxLength(12),Validators.minLength(6)]],
      photo:[],
    })
  }

  ngOnInit(): void {


  }

  selectedFile:File|any =null ;

  getPhoto(event:any) {
    this.selectedFile = <File>event.target.files[0];
  }

  get nameNotValid(){
    return !this.UpdatingForm.controls['name'].value ? 'You must enter a value'
    : !this.UpdatingForm.controls['name'].valid ? 'Invalid name format' : '';
  }

  get emailNotValid(){
    return !this.UpdatingForm.controls['email'].value ? 'You must enter a value'
    : !this.UpdatingForm.controls['email'].valid ? 'Invalid email format' : '';
  }

  get passwordNotValid(){
    return !this.UpdatingForm.controls['password'].valid ? 'Invalid password format, password should be 8 - 16 (lowercase or uppercase)characters or digits':'';
  }

  ngAfterViewInit(): void {
  //  throw new Error('Method not implemented.');
}

  updateUserInfo(newUserData:any){
      this.userID = newUserData._id;
      console.log(this.userID);
      this.UpdatingForm = this.formBulider.group({
      name:[this.user.name,[Validators.maxLength(12),Validators.minLength(3)]],
      email:[this.user.email,[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      gender:[this.user.gender],
      password:['',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]],
      photo:[]
    })
  }

  updateOne(){
    console.log(this.token);
    try {
      const fd = new FormData();
      fd.append('id',this.userID);
      fd.append('name',this.UpdatingForm.get('name')?.value);
      fd.append('email',this.UpdatingForm.get('email')?.value);
      fd.append('gender',this.UpdatingForm.get('gender')?.value);
      fd.append('password',this.UpdatingForm.get('password')?.value);

      if(this.selectedFile){
        fd.append('photo',this.selectedFile,this.selectedFile.name);
        this.selectedFile=null;
      }

      console.log(fd.get('email'));
      console.log(fd.get('name'));
      console.log(fd.get("gender"))
      console.log(fd.get('id'))


      this.myService.updateUserData(fd,this.headers).subscribe({
        next:res=>{
          console.log(res);
          this.myService.getUserInfo().subscribe({next:res=>{this.user=res}});
        },error:err=>{
          console.log(this.UpdatingForm.get('name')?.value);
          console.log(this.UpdatingForm.get('email')?.value);
          console.log(this.UpdatingForm.get('gender')?.value);
          console.log(this.userID);
          console.log(this.headers);

          console.log(err);
        }
      })
      } catch (error) { console.log(error) }

  }
}
