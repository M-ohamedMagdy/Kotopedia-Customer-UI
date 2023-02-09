import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/partials/about/about.component';
import { ProfileComponent } from "./pages/profile/profile.component";
const routes: Routes = [
  {path:"about",component:AboutComponent},
  {path:"userProfile",component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
