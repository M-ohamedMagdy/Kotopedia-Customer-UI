import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterationComponent } from './components/pages/registeration/registeration.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { PayementComponent } from './components/pages/payement/payement.component';
import { OrderComponent } from './components/pages/order/order.component';

const routes: Routes = [
                          {path:"", component:HomeComponent},
                          {path:"home", component:HomeComponent},
                          {path:"about",component:AboutComponent},
                          {path:"registeration", component:RegisterationComponent},
                          {path:"products",component:ProductsComponent},
                          {path:"cart",component:CartComponent},
                          {path:"order",component:OrderComponent},
                          {path:"pay",component:PayementComponent}

                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
