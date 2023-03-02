import { Component, OnChanges, OnInit } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges {
  token: any;
  user: any;

  constructor(private myService: AppHttpService) {
    this.token = this.myService.getToken();
    console.log(this.token);
    this.user = this.myService.getUser();
  }

  ngOnInit() : void {
    this.myService.getUserInfo().subscribe(
      {
        next: (res) => {
          console.log(res)
          this.user = res;
        },
        error(err) { console.log(err) }
      }
    )
  }

  ngOnChanges() {
    this.token = this.myService.getToken();     // Update token value here when it changes from its source

  }

  logout() {
    this.myService.removeToken();
    window.location.href = "/home";
  }

}
