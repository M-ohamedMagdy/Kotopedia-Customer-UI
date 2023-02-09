import { Component , EventEmitter, Output  } from '@angular/core';
import { ProuductsService } from 'src/app/services/prouducts.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {

 CartButton:string[]=["Add To Cart","Add To Cart","Add To Cart","Add To Cart","Add To Cart","Add To Cart"];

 indicator:boolean[]=[true,true,true,true,true,true];

  // move it to allproducts page
   Allproducts: { src: string; name: string; category: string; unitprice: number; }[] = [];

  constructor(public ser:ProuductsService){
    this.Allproducts= ser.getAllProducts();

  }


  @Output()  MyEvent=new EventEmitter();

  cartproducts: { src: string; name: string; category: string; unitprice: number; }[] = [];

  addToCart(x:number){
    if(this.indicator[x]){
      this.CartButton[x]="Remove";
      this.ser.setCartProducts(this.Allproducts[x]);
    }
    else{
      this.CartButton[x]="Add To Cart";
      this.ser.RemoveFromCart(x);
    }
    console.log(this.ser.getCartProducts());
    this.indicator[x] = !this.indicator[x];}

  }
