import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProuductsService {
   private Allproducts: { src: string; name: string; category: string; unitprice: number; }[] = [];
   private cartproducts: { src: string; name: string; category: string; unitprice: number; }[] = [];


  constructor() {
    this.Allproducts= [
      { "src": "../../../../assets/img2.jpg", "name": "Change for the better","category" :"romantic","unitprice":100},
      { "src": "../../../../assets/img3.jpg", "name": "Rich Dad Poor Dad","category" :"Fantasy","unitprice":150},
      { "src": "../../../../assets/img4.jpg", "name": "Attomic Habits","category" :"Kids","unitprice":120},
      { "src": "../../../../assets/img5.jpg", "name": "The Richest Man in Babylon","category" :"Horror","unitprice":85},
      { "src": "../../../../assets/img6.jpg", "name": "Lojain","category" :"history","unitprice":90},
      { "src": "../../../../assets/mark_manson.jpg", "name": "The Art of Not Giving a interest","category" :"Crime","unitprice":70}
    ];
   }
getAllProducts(){
  return this.Allproducts;
}
getCartProducts(){
  return this.cartproducts;
}
setCartProducts(x:any){
this.cartproducts.push(x);
}
RemoveFromCart(x:number){
this.cartproducts.splice(x,1);
}


}
