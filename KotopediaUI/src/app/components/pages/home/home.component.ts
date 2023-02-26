import { Component, EventEmitter, Output } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { SendUserDataService } from 'src/app/services/send-user-data.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    Allproducts: { src: string ,category:string}[] =
    [
    { "src": "../../../../assets/img9.jfif","category" :"Romantic"},
    { "src": "../../../../assets/img10.jfif","category" :"fantasy"},
    { "src": "../../../../assets/img11.jfif","category" :"children"},
    { "src": "../../../../assets/img20.jfif","category" :"business"},
    { "src": "../../../../assets/home_images/hist.jpg","category" :"history"},
    { "src": "../../../../assets/img19.jfif","category" :"crime"}
];
@Output()  MyEvent=new EventEmitter();
token:any;
user:any;
navigate:boolean=false;

constructor(private mysrv:SendUserDataService,private myService:AppHttpService,private router: Router,private local: LocalStorageService) {

  this.token=this.myService.getToken();
this.user=this.myService.getUser();


}
 toProductByCategory(x:any){
  console.log(this.Allproducts[x].category);
  if(this.token){
  this.myService.getProductsByCategory(this.Allproducts[x].category).subscribe({
next:res=>{
   console.log(res) ;
   this.myService.setProduct(res) ;
   this.router.navigate(['/products']);
},
error:err=>{console.log(err);}
    })
    // window.location.href = "/products";

  }
  else{
    Swal.fire({
      title: 'Please Sign in to see Our Books !!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }


}

}

