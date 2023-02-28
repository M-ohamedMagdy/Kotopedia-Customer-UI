import { Component } from '@angular/core';
import { ProuductsService } from 'src/app/services/prouducts.service';
import { AppHttpService } from 'src/app/services/app-http.service';
import { LocalStorageService } from 'angular-web-storage';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

cartproducts: { src: string; name: string; category: string; unitPrice: number; }[] = [];
  headers: { authorization: any; };
  constructor(public myservice:AppHttpService,private local: LocalStorageService){
    this.headers = {
      authorization:this.local.get('token')
  }


this.myservice.getAllfromCart(this.headers).subscribe({
  next:res=>{
     console.log(res) ;

      },
  error:err=>{console.log(err);}
      });


  }
x:number=1;
price:number=this.x*44;
removeCart(x:number){
}
}


