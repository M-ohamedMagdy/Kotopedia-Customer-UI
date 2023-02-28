import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { AppHttpService } from 'src/app/services/app-http.service';
import { ProuductsService } from 'src/app/services/prouducts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  user:any;
  headers:any;
  Cart:any;
  quantity:any;

  constructor(public ser:ProuductsService,private myService:AppHttpService,private local: LocalStorageService ){
    this.headers = {
      authorization:this.local.get('token')
  }

    this.myService.getUserInfo().subscribe(
      {
        next:(res)=>{
          console.log(res)
          this.user=res;
        },
        error(err){console.log(err)}
      }
    )

    this.myService.gerCart(this.headers).subscribe({
      next:res=>{
        console.log(res);
        this.Cart=res;
      },error:err=>{
        console.log(err);

      }
    })


    // this.cartproducts=ser.getCartProducts();
    // console.log(this.cartproducts);
  }
  cartproducts: { src: string; name: string; category: string; unitPrice: number; }[] = [];

  x:number=1;
  price:number=this.x*44;
  removeCart(x:number){
    this.ser.RemoveFromCart(x);
  }
  getQuPos(q:any,title:any){
    console.log(+q+1)
    this.quantity=+q+1;
    console.log(this.quantity);
    console.log(this.user._id);
    console.log(title);

    this.myService.updateProductQuatity(this.user._id,title,this.quantity,this.headers).subscribe({
      next:res=>{
        console.log(res);
      },error:err=>{
        console.log(err);

      }
    })
  }
  getQuNeg(q:any,title:any){
    console.log(+q-1)
    this.quantity=+q-1;
    console.log(this.quantity);
    console.log(this.user._id);
    console.log(title);

    this.myService.updateProductQuatity(this.user._id,title,this.quantity,this.headers).subscribe({
      next:res=>{
        console.log(res);
      },error:err=>{
        console.log(err);

      }
    })

  }
}


