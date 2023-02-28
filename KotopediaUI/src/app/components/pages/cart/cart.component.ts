import { ProuductsService } from 'src/app/services/prouducts.service';
import { AppHttpService } from 'src/app/services/app-http.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { Component , EventEmitter, OnInit, Output  } from '@angular/core';





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
  userCart: any;


  constructor(private myService:AppHttpService,private local: LocalStorageService ,private router: Router ){
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




    // this.cartproducts=ser.getCartProducts();
    // console.log(this.cartproducts);
  }
  ngOnInit(): void {
    this.myService.getAllfromCart(this.headers).subscribe({
      next:res=>{
        this.Cart=res;
        this.userCart=this.Cart.userCart;
        console.log(this.Cart.userCart);
         console.log(res) ;

          },
      error:err=>{console.log(err);}
          });
  }

  x:number=1;
  price:number=this.x*44;
  removeCart(x:any){
    this.myService.removefromCart(this.userCart[x].title).subscribe({
      next:(res)=>{
        console.log(res);
        this.ngOnInit();

        // this.userCart = this.userCart.filter((abanoub:any) => abanoub.title !== this.userCart[x].title);

      },
      error:(err)=>{
console.log(err);
      }
    });
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


