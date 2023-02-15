import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppHttpService {
  constructor(private myClient:HttpClient) { }
  private BaseURLGetCustomer = "http://localhost:3000/customer";
  private BaseURLGetProduct = "http://localhost:3000/admin/";
  private BaseURLAddCustomer = "http://localhost:3000/customer/signup";

  //Methods
  //1 get all users
  getAllCustomers(){
    return this.myClient.get(this.BaseURLGetCustomer)
  }

  //2 get all products
  getAllProducts(){
    return this.myClient.get(this.BaseURLGetProduct);
  }

  //3
  addNewUser(newUser:any){
        this.myClient.post(this.BaseURLAddCustomer,newUser);
  }

}
