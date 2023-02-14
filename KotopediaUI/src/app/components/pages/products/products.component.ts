import { Component , EventEmitter, OnInit, Output  } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { ProuductsService } from 'src/app/services/prouducts.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

CartButton:string[]=["Add To Cart","Add To Cart","Add To Cart","Add To Cart","Add To Cart","Add To Cart"];

indicator:boolean[]=[true,true,true,true,true,true];

  // move it to allproducts page
  Allproducts: { src: string; name: string; category: string; unitPrice: number; }[] = [];

  constructor(public myService:AppHttpService ,public ser:ProuductsService){
  }

  Products:any;
  ngOnInit(): void {
    this.myService.getAllProducts().subscribe(
      {
        next:(res)=>{
          this.Products = res;
          console.log(this.Products)
        },
        error(err){console.log(err)}
      }

    )

  }

  @Output()  MyEvent=new EventEmitter();

  cartproducts: { src: string; name: string; category: string; unitPrice: number; }[] = [];

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
