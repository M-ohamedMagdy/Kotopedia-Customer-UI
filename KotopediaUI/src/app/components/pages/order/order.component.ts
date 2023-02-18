import { Component } from '@angular/core';
import { ProuductsService } from 'src/app/services/prouducts.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderproducts: { src: string; name: string; category: string; unitprice: number;}[] = [];
  id=1332895;
  quantity=1;
  status='pending';
  date="1/3/2023";
  esdate="10/3/2023";
  constructor(public ser:ProuductsService){
  this.orderproducts=ser.getCartProducts();
  console.log(this.orderproducts);
  }

x:number=1;
price:number=this.x*44;
 }

