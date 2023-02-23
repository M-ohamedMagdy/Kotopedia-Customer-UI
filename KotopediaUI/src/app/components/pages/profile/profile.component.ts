import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit,AfterViewInit {
  user:any;

  constructor(private myService:AppHttpService){
   this.user=this.myService.user;
  }

 ngAfterViewInit(): void {
  //  throw new Error('Method not implemented.');

 }
 ngOnInit(): void {

  }









}
