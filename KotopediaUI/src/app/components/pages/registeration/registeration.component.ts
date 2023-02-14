import { Component, OnChanges ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppHttpService } from 'src/app/services/app-http.service';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent  {
  constructor(){}
  // implements OnInit
  // constructor(public myService:AppHttpService ) {

  // }

  // ngOnInit(): void {
  //   this.myService.getAllCustomers().subscribe(
  //     (res)=>{console.log(res)},
  //     (err)=>{console.log(err)}
  //   )
  // }
}

