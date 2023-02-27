import { HttpHeaders } from '@angular/common/http';
import { Component , EventEmitter, OnInit, Output  } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { ProuductsService } from 'src/app/services/prouducts.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';



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
Allproducts: { src: string ,category:string}[] =
    [
    { "src": "../../../../assets/img9.jfif","category" :"Romantic"},
    { "src": "../../../../assets/img10.jfif","category" :"fantasy"},
    { "src": "../../../../assets/img11.jfif","category" :"children"},
    { "src": "../../../../assets/img20.jfif","category" :"business"},
    { "src": "../../../../assets/home_images/hist.jpg","category" :"history"},
    { "src": "../../../../assets/img19.jfif","category" :"crime"}
];
CartButton:string[]=[];
seachItem:string="";
indicator:boolean[]=[];
i:number=0;
cat:boolean=true;
searchValue:string='';
z:any;

  // move it to allproducts page

  constructor(public myService:AppHttpService,private local: LocalStorageService,private router: Router){

  }

  Products:any;
  toProductByCategory(x:any){
    console.log(this.Allproducts[x].category);

    this.myService.getProductsByCategory(this.Allproducts[x].category).subscribe({
  next:res=>{
     console.log(res) ;
     this.myService.setProduct(res) ;
     window.location.reload();
      },
  error:err=>{console.log(err);}
      })

    }
  ngOnInit(): void {

  this.myService.getAllProducts().subscribe(
    {
      next:(res)=>{
        if(this.myService.getProduct()){this.Products = this.myService.getProduct();this.myService.setProduct(null);}
        else if(!this.myService.getProduct()){this.Products = res;}
          for(this.i=0;this.i<this.Products.length;this.i++){ this.CartButton.push("Add To Cart") }
          for(this.i=0;this.i<this.Products.length;this.i++){ this.indicator.push(true) }
          console.log(this.CartButton);
      },
      error(err){console.log(err)}
    })
    console.log(this.Products)

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

  search(x:any){
    console.log(x);
  }
  setZ(x:any){
    this.z=x;
  }

  }
