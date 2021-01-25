import { API_URL } from './../../../config/config';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Municipality } from "../../../models/model.index";
import { User } from '../../../models/model.index';
import swal from 'sweetalert';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  municipalitys: Municipality[] = [];

    months: string[] = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'ctubre',
      'Noviembre',
      'Diciembre'
    ];

  existeUsuario: boolean;

  constructor( private http: HttpClient ) { }

  getMunicipalitys = () => {

    const url = API_URL + '/utils/municipalitys';

    return this.http.get(url)
      .pipe(
        map((res: any) => res.data)
      );
  }

  getMonths = () => this.months;

  signUp = ( data: any ) => this.http.post( 'this.URL', data );

  // checkUserExists( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate>{
  //   if ( !control.value ) {
  //     return Promise.resolve(null);
  //   }
  //   return new Promise((resolve, reject) => {
  //     console.log(this.checkUser(control.value));
      
      
  //   });
  //   }
    checkUser(user: string) {
      return this.http.post(`${API_URL}/login/check-user-exist`, {user: user})
    }

    passwordsMatch = ( pass1: string, pass2: string ) => {
      return ( formGroup: FormGroup ) => {
        const pass1Control = formGroup.controls[pass1];
        const pass2Control = formGroup.controls[pass2];

        if ( pass1Control.value === pass2Control.value ) {
          // pass2Control.setErrors(null);
          return null;
        } 
          // pass2Control.setErrors( { noMatch: true } );
        return  { noMatch: true };
      }
    }

  createUser = ( user: User ) => {
    const url = API_URL + '/user';
    return this.http.post(url, user)
    .pipe(
      map((res: any) => {
      swal('Usuario creado correctamente', `Bienvenid@: ${res.data.user}`, 'success');
      return res.data.user;
    }));

  }

}

