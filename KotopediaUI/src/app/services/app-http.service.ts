import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppHttpService {
  constructor(private myClient:HttpClient) { }
  private BaseURLCustomer = "http://localhost:3000/customer";
  private BaseURLProduct = "http://localhost:3000/admin/";

  //Methods
  //1 get all users
  getAllCustomers(){
    return this.myClient.get(this.BaseURLCustomer)
  }

  getAllProducts(){
    return this.myClient.get(this.BaseURLProduct);
  }

}
