import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';
import { API_URL } from '../../../config/config';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }


  getAllUsersDB = (from: number = 0) => {
    const url = `${API_URL}/user/all?from=${from}`;

    return this.http.get( url )
    .pipe(
      map((res: any) => {
        return {
          users: res.data,
          total: res.total
        };
      })
    );
  }

  getUserByIdAdmin = (id: string) => {
    const url = `${API_URL}/user/byid/${id}`;

    return this.http.get( url )
    .pipe(
      map((res: any) => {
        return {
          user: res.data
        };
      })
    );
  }

  searchInUsers = (term: string, from: number = 0) => {

    let url = `${API_URL}/search/specific/users/${term}`;

    if (from !== 0) {
      url += `?from=${from}`;
    }

    return this.http.get( url )
    .pipe(
      map((res: any) => {
        return {
          users: res.users,
          total: res.total
        };
      })
    );
  }

  deleteUser = (id: string, from: number = 0, limit: number = 10, search: boolean = false, regex: string = null) => {
    let url = `${API_URL}/user/${id}?list=true&from=${from}&limit=${limit}`;
    if (search) {
      url += `&search=${search}&regex=${regex}`;
    }
    return this.http.delete(url)
    .pipe(
      map((res: any) => {
        swal('Usuario eliminado correctamente.', '', 'success');
        return {
          users: res.data,
          total: res.total
        };
      })
    );
  }
}
