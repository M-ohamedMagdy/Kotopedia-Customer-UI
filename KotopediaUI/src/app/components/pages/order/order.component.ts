import { Component } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent {
  user:any;
  userID:any;
  headers:any;
  ordersArr:any;

  constructor(private myService:AppHttpService,private local: LocalStorageService){
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
    this.myService.getAllOrders(this.headers).subscribe({
      next:(res)=>{
        console.log(res)
        this.ordersArr=res;
        console.log(this.ordersArr.userOrders[0].productsInOrder.length);

        console.log(this.ordersArr.userOrders[0].productsInOrder[0].title);

        console.log(this.ordersArr.userOrders);

      },
      error(err){console.log(err)}
    })


  }


}

