import { HttpHeaders } from '@angular/common/http';
import { Component , EventEmitter, OnInit, Output  } from '@angular/core';
import { AppHttpService } from 'src/app/services/app-http.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';





@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  //way to send token to backend
// httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `${this.myService.getToken()}` // Here is the token
//   })
// };

p:number=1;
itemperpage:number=12;
totalitems:any;




Allproducts: { src: string ,category:string}[] =
    [
    { "src": "../../../../assets/img9.jfif","category" :"Romantic"},
    { "src": "../../../../assets/img10.jfif","category" :"fantasy"},
    { "src": "../../../../assets/img11.jfif","category" :"children"},
    { "src": "../../../../assets/img20.jfif","category" :"business"},
    { "src": "../../../../assets/home_images/hist.jpg","category" :"history"},
    { "src": "../../../../assets/img19.jfif","category" :"crime"}
];
CartButton:string[]=[];
seachItem:string="";
indicator:boolean[]=[];
i:number=0;
cat:boolean=true;
searchValue:string='';
z:any;
user:any;
FeedBackBody:any;
modalIdentifier:any;
feedBacks:any;
cartBody:any;

ProductID:any;
Products:any;
headers:any;
product:any;
  // move it to allproducts page

  constructor(public myService:AppHttpService,private local: LocalStorageService,private router: Router){
    this.headers = {
      authorization:this.local.get('token')
    }
    this.user=this.myService.getUser();
    console.log(this.user);


  }

  toProductByCategory(x:any){
    console.log(this.Allproducts[x].category);

    this.myService.getProductsByCategory(this.Allproducts[x].category).subscribe({
      next:res=>{
      console.log(res) ;
      this.myService.setProduct(res) ;
      window.location.reload();
    },
  error:err=>{console.log(err);}
      })

    }
  ngOnInit(): void {

  this.myService.getAllProducts().subscribe(
    {
      next:(res)=>{
        console.log(res);
        this.Products=res;
        if(this.myService.getProduct()){this.Products = this.myService.getProduct();this.myService.setProduct(null);this.totalitems=this.Products.length;}
        else if(!this.myService.getProduct()){this.Products = res;this.totalitems=this.Products.length;}
          for(this.i=0;this.i<this.Products.length;this.i++){ this.CartButton.push("Add To Cart"); this.local.set('cartButton',this.CartButton);}
          for(this.i=0;this.i<this.Products.length;this.i++){ this.indicator.push(true);this.local.set('indicators',this.indicator); }
          console.log(this.CartButton);
        console.log(this.Products)
      },
      error(err){console.log(err)}
    })
    // console.log(this.Products)



  }

  @Output()  MyEvent=new EventEmitter();

  cartproducts: { src: string; name: string; category: string; unitPrice: number; }[] = [];

  addToCart(x:number){
    console.log(this.Products[x]);
    if(this.indicator[x]){
      this.CartButton[x]="Remove";
      this.cartBody={userID:this.user._id,bookID:this.Products[x]._id};
      this.myService.addToCart(this.cartBody).subscribe(
        {

          next:res=>{
            console.log(res);
          },
          error:err=>{
            console.log(err);
          }
        }
      );

    }
    else{
      this.CartButton[x]="Add To Cart";
      this.myService.removefromCart(this.Products[x].title).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
        console.log(err);
        }
      });
    }
    this.indicator[x] = !this.indicator[x];
    this.local.set('CartButton',this.CartButton);
    // console.log(product); product:any,
  }

  search(x:any){
    console.log(x);
  }

  addFeedBack(title:any,fb:any){
    console.log(title);
    console.log(fb);
    console.log(this.user.email);

    this.FeedBackBody={title, email: this.user.email, body: fb };
    this.myService.addFeedback(this.FeedBackBody).subscribe();
    this.router.navigate(['/products']);
  }

  setModalIdentifier(x:any){
    this.modalIdentifier=x;
    console.log(this.modalIdentifier);
  }
  modalFilter(x:number){
    return this.modalIdentifier==x;
  }

getFeedBacks(x:any){
  this.myService.getFeedBacks(x).subscribe({
    next:(res)=>{
      this.feedBacks=res;
      console.log(res);
    },
    error(err){console.log(err)}
  })
}

  getOne(searchValue: any) {
    throw new Error('Method not implemented.');
  }

}
