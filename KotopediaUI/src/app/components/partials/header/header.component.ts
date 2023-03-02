import { Component, OnChanges } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges  {
  token:any;
  user:any;
  constructor(private myService:AppHttpService){
    this.token=this.myService.getToken();
console.log(this.token);
this.user=this.myService.getUser();
// setTimeout(function() {
//   myService.removeToken();
//   window.location.href = "/registeration";
// }, 11500);


  }

  ngOnChanges() {
    this.token = this.myService.getToken();     // Update token value here when it changes from its source

  }

  logout(){
    this.myService.removeToken();
    window.location.href = "/home";
  }

}
