import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    Allproducts: { src: string ,category:string}[] =
    [
    { "src": "../../../../assets/img9.jfif","category" :"Romantic"},
    { "src": "../../../../assets/img10.jfif","category" :"Fantasy"},
    { "src": "../../../../assets/img11.jfif","category" :"Children"},
    { "src": "../../../../assets/img20.jfif","category" :"Business"},
    { "src": "../../../../assets/home_images/hist.jpg","category" :"history"},
    { "src": "../../../../assets/img19.jfif","category" :"Crime"}
];
@Output()  MyEvent=new EventEmitter();

}

