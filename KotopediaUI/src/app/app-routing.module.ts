import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterationComponent } from './components/pages/registeration/registeration.component';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { CartComponent } from './components/pages/cart/cart.component';

const routes: Routes = [
                          {path:"", component:HomeComponent},
                          {path:"home", component:HomeComponent},
                          {path:"about",component:AboutComponent},
                          {path:"registeration", component:RegisterationComponent},
                          {path:"products",component:ProductsComponent},
                          {path:"cart",component:CartComponent}
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
