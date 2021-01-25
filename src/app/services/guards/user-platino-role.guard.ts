import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import swal from 'sweetalert';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserPlatinoGuard implements CanActivate {

  constructor( private userService: UserService,
               private router: Router ) {}

  canActivate(): boolean {

    if ( !(this.userService.getUserRole() === 'USER_PLATINO_ROLE' ||  this.userService.getUserRole() === 'ADMIN_ROLE') ) {
      swal('No tiene privilegios!', 'Actualice su perfil para poder visualizar el contenido.', 'warning');
      this.router.navigate(['/profile']);
      return false;
    }
    return true;

  }

}
