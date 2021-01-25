import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import swal from 'sweetalert';

import { UserService } from './../services/service.index';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

  constructor(
    private userService: UserService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;
    
    if (localStorage.getItem('token')) {
      headers = new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      });
    }

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone)
      .pipe(
        catchError( (err: HttpErrorResponse) => {
          if (err.status === 500) {
            swal('Error!!', `Ha ocurrido un errror, inténtelo de nuevo por favor.\n${err?.error?.message || ''}`, 'error');
          } else if (err.status === 400) {
              swal(err?.error?.message || 'Error!!', `Ha ocurrido un errror, verifique su petición.`, 'warning');
          } else if (err.status === 401) {
            swal('Credenciales inválidas.', `Inténtelo de nuevo.\n${err?.error?.message || ''}`, 'error');
            // this.userService.logOut();
          } else if (err.status === 404) {
            swal(err?.error?.message || 'Error!!', `Recurso no encontrado.`, 'warning');
          } else {
            swal('Error!!', `Ha ocurrido un errror, inténtelo de nuevo por favor.\nRevise su conexión a internet e inténtelo de nuevo.\n${err?.error?.message || ''}`, 'error');
          }
          return throwError('Error http response');
        } )
      );
  }

}
