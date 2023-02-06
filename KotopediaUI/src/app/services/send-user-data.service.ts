import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendUserDataService {

  constructor(private myClient : HttpClient) { }

  private baseURL = "https://jsonplaceholder.typicode.com/users";

  sendUserData(userData:any){
    return this.myClient.post(this.baseURL,userData)
  }

}
