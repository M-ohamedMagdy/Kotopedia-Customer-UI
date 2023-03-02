import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { AppHttpService } from 'src/app/services/app-http.service';
import { ProuductsService } from 'src/app/services/prouducts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  user:any;
  headers:any;
  Cart:any;
  quantity:any;
  cartObj:any;
  price=0;
  userCart:any;

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


  }
  ngOnInit(): void {
    this.myService.getCart(this.headers).subscribe({
      next:res=>{
        console.log(res);
        this.Cart=res;
        this.userCart=this.Cart.userCart;
        this.price=0;
        this.Cart.userCart.forEach((element: any)=> {
          this.price += element.quantity*element.unitPrice
      });
      console.log(this.price);
      },error:err=>{
        console.log(err);

      }
    })
  }

  x:number=1;
  removeCart(x:any){
    this.myService.removefromCart(this.userCart[x].title).subscribe({
      next:(res)=>{
        console.log(res);
        this.ngOnInit();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  getQuPos(q:any,title:any,unitPrice:any){
    console.log(+q+1)
    this.quantity=+q+1;

    this.Cart.userCart.forEach((element: any)=> {
      this.price += element.quantity*element.unitPrice
  });
    // this.ngOnInit();
    this.myService.updateProductQuatity(this.user._id,title,this.quantity,this.headers).subscribe({
      next:res=>{
        console.log(res);
      },error:err=>{
        console.log(err);

      }
    })
  }

  getQuNeg(q:any,title:any,unitPrice:any){
console.log(+q);

    if(+q > 1){
    this.quantity=+q-1;
    this.Cart.userCart.forEach((element: any)=> {
      this.price += element.quantity*element.unitPrice
  });
    this.myService.updateProductQuatity(this.user._id,title,this.quantity,this.headers).subscribe({
      next:res=>{
        console.log(res);
      },error:err=>{
        console.log(err);
      }
    })
  }
  else{
    this.quantity=1;
  }
  }

  placeOrder(){
      console.log(this.user._id);
      this.myService.addCartToOrders(this.user._id,this.headers).subscribe({
        next:res=>{
          console.log(res);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your order is submitted,Once it is accepted ,the shipping company will contact you ',
            showConfirmButton: false,
            timer: 3000
          })
          this.emptyCart();

        },error:err=>{
          console.log(err);

        }
      })
  }

  emptyCart(){
    console.log("empty cart clicked");
    this.myService.emptyCart(this.headers).subscribe({
      next:res=>{
        console.log(res);
        this.ngOnInit();
      },error:err=>{
        console.log(err);

      }
    })
    this.price=0;
    this.ngOnInit()
  }


}


