import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import swal from 'sweetalert';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService: UserService,
               private router: Router ) {}

  canActivate(): boolean {

    if ( !this.userService.getStatusAuth() ) {
      swal('No se pudo verificar su identidad!', 'Ingrese sus credenciales por favor.', 'warning');
      this.router.navigate(['/home']);
      return false;
    }
    return true;


  }

}
