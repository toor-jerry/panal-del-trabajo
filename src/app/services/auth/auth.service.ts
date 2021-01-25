// import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_URL } from '../../config/config';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    // private socket: Socket,
    private userService: UserService
  ) { }


  authGoogle = (token: string) => {
    const url = `${API_URL}/login/google`;

    return this.http.post( url, { token })
    .pipe(
      map((res: any) => this.userService.saveStorage({ user: res.user, token: res.token, menu: res.menu }))
    );

  }

  
  auth = (user: string, password: string, recordarme: boolean = false) => {

    if (recordarme) {
      localStorage.setItem('userName', user);
    }
    else {
      localStorage.removeItem('userName');
    }

    const url = `${API_URL}/login`;

    return this.http.post( url, { user, password } )
    .pipe(
      map((res: any) => {
        this.userService.saveStorage({ user: res.user, token: res.token, menu: res.menu });
        // this.socket.disconnect();
        return true;
      })
    );
  }
}
