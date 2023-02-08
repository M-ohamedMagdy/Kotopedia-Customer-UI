import { Component , EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  // move it to allproducts page
  Allproducts: { src: string, name: string ,category:string,unitprice:number }[] = [
    { "src": "../../../../assets/img2.jpg", "name": "Change for the better","category" :"romantic","unitprice":100},
    { "src": "../../../../assets/img3.jpg", "name": "Rich Dad Poor Dad","category" :"Fantasy","unitprice":150},
    { "src": "../../../../assets/img4.jpg", "name": "Attomic Habits","category" :"Kids","unitprice":120},
    { "src": "../../../../assets/img5.jpg", "name": "The Richest Man in Babylon","category" :"Horror","unitprice":85},
    { "src": "../../../../assets/img6.jpg", "name": "Lojain","category" :"history","unitprice":90},
    { "src": "../../../../assets/mark_manson.jpg", "name": "The Art of Not Giving a interest","category" :"Crime","unitprice":70}
  ];
  @Output()  MyEvent=new EventEmitter();

  cartproducts: { src: string; name: string; category: string; unitprice: number; }[] = [];

  addToCart(x:any){
    this.cartproducts.push(this.Allproducts[x]);
    this.MyEvent.emit(this.cartproducts);
    console.log(this.cartproducts);
  }
}
