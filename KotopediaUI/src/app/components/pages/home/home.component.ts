import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // move it to allproducts page
    Allproducts: { src: string, name: string ,category:string,unitprice:number }[] = [
    { "src": "assets/home_images/novels.jpeg", "name": "أحدب نوتردام","category" :"romantic","unitprice":5},
    { "src": "assets/home_images/romantic.jpeg", "name": "ما وراء القضبان","category" :"Fantasy","unitprice":10},
    { "src": "assets/home_images/kids.png", "name": "small kid","category" :"Kids","unitprice":15},
    { "src": "assets/home_images/ho.jpg", "name": "أحدب نوتردام","category" :"Horror","unitprice":85},
    { "src": "assets/home_images/hist.jpg", "name": "أحدب نوتردام","category" :"history","unitprice":9},
    { "src": "assets/home_images/crime.jpg", "name": "أحدب نوتردام","category" :"Crime","unitprice":7}

];
@Output()  MyEvent=new EventEmitter();

  cartproducts: { src: string; name: string; category: string; unitprice: number; }[] = [];

  addToCart(x:any){
    this.cartproducts.push(this.Allproducts[x]);
    this.MyEvent.emit(this.cartproducts);
    console.log(this.cartproducts);
  }

}

