import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class AppHttpService {



  httpOptions:any;
  user: any;
sendFromHome:any;

  constructor(private myClient:HttpClient,private local: LocalStorageService) {

    this.token=this.local.get('token');
    this.user=this.local.get('user');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.getToken()}` // Here is the token
      })
    };


   }
  private BaseURLGetCustomer = "https://kotopedia-backend.onrender.com/customer";
  private BaseURLAddCustomer = "https://kotopedia-backend.onrender.com/customer/signup";
  private  BaseURLGetProductByCat="https://kotopedia-backend.onrender.com/customer/products";
  private token:any;
  BaseURLGetProduct:any;





  //Methods
  //1 get all users
  getAllCustomers(){
    return this.myClient.get(this.BaseURLGetCustomer);
  }

  //2 get all products
  getAllProducts(){
    this.BaseURLGetProduct = `https://kotopedia-backend.onrender.com/customer/products/${this.user._id}`;

    return this.myClient.get(this.BaseURLGetProduct, this.httpOptions);
  }

  //3
  addNewUser(newUser:any){
        this.myClient.post(this.BaseURLAddCustomer,newUser);
  }

  //local storage token and user
  //set token and user come only from log in page
setToken(x:any){
  this.local.set('token',x);
  this.token=this.local.get('token');
}
getToken(){
 return this.token;
}
removeToken(){
  this.local.set('token',null);
}
setUser(x:any){
this.local.set('user',x);
this.user=this.local.get('user');
}
getUser(){
return  this.user;
}
getProductsByCategory(category:any){       //Done
  return this.myClient.get(this.BaseURLGetProductByCat+`/${category}/${this.user._id}`,this.httpOptions);
  }


setSend(){
  return this.local.get('sentData');

}




}
