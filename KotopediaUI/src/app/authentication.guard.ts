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
  Swal.fire({
    title: 'You need to Login to get access',
    showClass: {
      popup: 'animate_animated animate_fadeInDown'
    },
    hideClass: {
      popup: 'animate_animated animate_fadeOutUp'
    }
  })
  this.router.navigate(['/registeration']);




return false}
  }

}
