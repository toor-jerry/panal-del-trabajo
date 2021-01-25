import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';
import { API_URL } from '../../../config/config';

import { ItemMenu, MenuResponse } from '../../../models/model.index';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor( private http: HttpClient ) { }

  getMenus = () => {
    const url = API_URL + '/menu';

    return this.http.get( url )
      .pipe(
        map((res: any) => res.data)
      );
  }

  updateMenu = ( menu: MenuResponse ) => {
    const url = `${API_URL}/menu/${menu._id}`;

    return this.http.put(url, menu)
    .pipe(
      map((res: any) => {
      swal('Menú actualizado.', `${res?.data?.description}`, 'success');
      if (res?.data?.role === 'ADMIN_ROLE' && res?.data?.menu) {
        localStorage.setItem('menu', JSON.stringify(res.data.menu));
      }
      return true;
    }));

  }

  createMenu = ( menu: MenuResponse ) => {
    const url = `${API_URL}/menu`;

    return this.http.post(url, menu)
    .pipe(
      map((res: any) => {
      swal('Menu creado.', `${res?.data?.description}`, 'success');
      if (res?.data?.role === 'ADMIN_ROLE' && res?.data?.menu) {
        localStorage.setItem('menu', res.data.menu);
      }
      return true;
    }));

  }

  getMenu = (id: string) => {
      const url = `${API_URL}/menu/${id}`;
      return this.http.get(url)
      .pipe(
        map((res: any) => {
          console.log(res);
          
          return res.data;
        }));
  }

  deleteMenu = ( id: string ) => {
    const url = `${API_URL}/menu/${id}`;

    return this.http.delete(url)
    .pipe(
      map((res: any) => {
      swal('Menu borrado.', `${res?.data?.description}`, 'success');
      return true;
    }));

  }
}
