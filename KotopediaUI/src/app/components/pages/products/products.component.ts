import { HttpHeaders } from '@angular/common/http';
import { Component , EventEmitter, OnInit, Output  } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { ProuductsService } from 'src/app/services/prouducts.service';
import { LocalStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  //way to send token to backend
// httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `${this.myService.getToken()}` // Here is the token
//   })
// };

CartButton:string[]=[];
seachItem:string="";
indicator:boolean[]=[];
i:number=0;

  // move it to allproducts page
  Allproducts: { src: string; name: string; category: string; unitPrice: number; }[] = [];

  constructor(public myService:AppHttpService,private local: LocalStorageService){
    // this.local.set('CategoryBooks',null);
if(!this.local.get('CategoryBooks')){
  console.log(this.local.get('CategoryBooks'));


}


  }

  Products:any;
  ngOnInit(): void {

    this.myService.getAllProducts().subscribe(
      {
        next:(res)=>{
          this.Products = res;
          console.log(this.Products)
          for(this.i=0;this.i<this.Products.length;this.i++){ this.CartButton.push("Add To Cart") }
          for(this.i=0;this.i<this.Products.length;this.i++){ this.indicator.push(true) }
          console.log(this.CartButton);
          console.log(this.local.get('CategoryBooks'));



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

    }
    else{
      this.CartButton[x]="Add To Cart";
    }
    this.indicator[x] = !this.indicator[x];
    this.local.set('CartButton',this.CartButton);


  }

  }
