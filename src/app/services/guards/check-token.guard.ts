import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import swal from 'sweetalert';

import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(): Promise<boolean> | boolean {

    const token = this.userService.getToken();

    const payload = JSON.parse( atob( token.split('.')[1] ));

    const expToken = this.exp( payload.exp );

    if (expToken) {
      swal('La sesión ha expirado!', 'Ingrese a su sesión de nuevo, ( asegurese de tener configurado correctamente la fecha y hora de su sistema).', 'warning');
      this.router.navigate(['/home']);
      return false;
    }

    return this.checkToken( payload.exp );
  }

  checkToken( dateExp: number ): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      const tokenExp = new Date( dateExp * 1000 );
      const now = new Date();

      now.setTime( now.getTime() + ( 1 * 60 * 60 * 100 ));

      // console.log(now);
      // console.log(tokenExp);
      if ( tokenExp.getTime() > now.getTime() ) {
        resolve(true);
      } else {
        this.userService.newToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            swal('No se pudo renovar su sesión!', '', 'error');
            this.router.navigate(['/home']);
            reject(false);
          });
      }
    });

  }

  exp( dateExp: number ): boolean {

    const now =  new Date().getTime() / 1000;

    if ( dateExp > now ) {
      return false;
    }

    return true;

  }
}
