import { Component } from '@angular/core';
import { ProuductsService } from 'src/app/services/prouducts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

cartproducts: { src: string; name: string; category: string; unitPrice: number; }[] = [];
  constructor(public ser:ProuductsService){
this.cartproducts=ser.getCartProducts();
console.log(this.cartproducts);
  }
x:number=1;
price:number=this.x*44;
removeCart(x:number){
  this.ser.RemoveFromCart(x);
}
}


