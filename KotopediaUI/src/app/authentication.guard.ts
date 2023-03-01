import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppHttpService } from 'src/app/services/app-http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(public myService: AppHttpService,public router: Router){


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

if(this.myService.getToken()){return true;}
else{
  this.router.navigate(['/registeration']);
setTimeout(() => {

}, 1000);
  Swal.fire({
    title: 'Please Sign in to see Our Books !!',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })



return false}
  }

}
