import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterationComponent } from './components/pages/registeration/registeration.component';

const routes: Routes = [
                         {path:"login", component:LoginComponent},
                         {path:"signup", component:RegisterationComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
