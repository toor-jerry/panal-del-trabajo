import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import swal from 'sweetalert';

import { API_URL } from './../../config/config';
import { User, ItemMenu } from "../../models/model.index";
import { UploadFileService } from '../upload-file/upload-file.service';

declare var socket: SocketIOClient.Socket;

@Injectable()
export class UserService {

  private user: User;
  private token: string;
  private menu: ItemMenu[];
  noNotif: number = 0;
  noMessages: number = 0;


  constructor(
    private http: HttpClient,
    private router: Router,
    private uploadFileService: UploadFileService
  ) {
      this.loadStorage();
  }
  checkPassword = (password: string) => {

    const url = `${API_URL}/login/check-password`;

    return this.http.post( url, { password } )
    .pipe(
      map((res: any) => true)
    );
  }

  getPDF = () => {

    const url = `${API_URL}/pdf`;

    return this.http.get( url )
    .pipe(
      map((res: any) => {
        return res.data
      }
      )
    );
  }
  
  addContact(contact: string) {
    const url = `${API_URL}/user/contact`;

    return this.http.put( url, { contact } )
    .pipe(
      map((res: any) => res.data
      )
    );
  }

  deleteContact(contact: string) {
    const url = `${API_URL}/user/contact/${contact}`;

    return this.http.delete( url )
    .pipe(
      map((res: any) => res.data)
    );
  }
  setNoNotifications(): void {
    this.noNotif += 1;
  }
  setSetions(setions: number): void {
    if (!this.user) {
      return;
    }
    this.user.setions = setions;
  }
  restoreValues(): void {
    this.user = null;
    this.token = '';
    this.menu = null;
  }

  newToken = () => {
    const url = API_URL + '/login/new-token';

    return this.http.get( url )
    .pipe(
      map((res: any) => {
        localStorage.setItem('token', res.token);
        return true;
      })
    );
  }
  getUser = (id: string) => {

    let url = `${API_URL}/user`;

    // if ( this.user.role === 'USER_ROLE' ) {
    //   url += '/user/info';
    // } else {
    //   url += '/byid';
    // }

    url += `/byid?id=${id}`;

    return this.http.get( url )
    .pipe(
      map((res: any) => res.data)
    );
  }

  getDomicile() {
    if (this.user?.domicile) {
      let domicile = this.user.domicile;
      return `${domicile.street} #${domicile.number}, ${domicile.colony}, ${domicile.municipality}, ${domicile.country}.`
    }
    return '';
  }
  getMenu = () => this.menu;

  getUsers = (from: number = 0, route: string ='') => {

    const url = `${API_URL}/user/${route}?from=${from}`;

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


  updateUser = ( user: User ) => {
    const url = `${API_URL}/user?id=${user._id}`;

    return this.http.put(url, user)
    .pipe(
      map((res: any) => {
      swal('Datos actualizados correctamente.', `${res.data.user}\n${res.data.name} ${res.data?.last_name}`, 'success');
      if (res?.data && (res.data._id === this.user._id)) {

        this.saveStorage({user: res.data, token: this.token, menu: res.menu || this.menu});
      }
      return true;
    }));

  }

  updateUserChangePassword = ( user: User ) => {
    const url = `${API_URL}/user?id=${user._id}`;

    return this.http.put(url, user);

  }

  // ==========================
  // Managment user auth
  // ==========================

  getUserAuth = (): User => this.user;

  getToken = (): string => this.token;

  getStatusAuth = (): boolean => {
    return (this.token.length > 5 && this.user.state === true) ? true : false;
  }

  getUserRole = (): string => this.user.role;

  changePhotography( photo: File ): void {
    this.uploadFileService.upladFile(photo, 'img', 'photography')
    .then((res: any) => {
      this.user.photography = res.data.photography;
      this.user.thumbnail_photography = res.data.thumbnail_photography;

      this.saveStorage({user: this.user, token: this.token, menu: this.menu});
      swal('Fotografía actualizada', '', 'success');
    })
    .catch(err => console.log(err));

  }

  uploadCredential( img: File ): void {
    this.uploadFileService.upladFile(img, 'img', 'credential')
    .then((res: any) => {
      this.user.credential = res.data.credential;
      swal('Comprobante subido con éxito!', '', 'success');
    })
    .catch(err => console.log(err));

  }

  getSetionsDB = (from: number = 0) => {
    const url = API_URL + '/connection?from=' + from;

    return this.http.get( url)
    .pipe(
      map((res: any) => {
        return {
          connections: res.data,
          total: res.total
        };
      })
    );
  }

  deleteSetionsDB = () => {
    const url = API_URL + '/connection';

    return this.http.delete(url)
    .pipe(
      map(res => {
        swal('Historal eliminado', 'El historial ha sido eliminado correctamente, si desea dejar de guardar su historial, de clic en el botón "Dejar de guardar mi historial de inicio de sesiones".', 'success');
        return true;
      })
    );
  }

  deleteAccount = () => {

    const url = `${API_URL}/user/${this.user._id}`;

    return this.http.delete(url)
    .pipe(
      map(res => {
        swal('Cuenta eliminada correctamente.', 'Lamentamos que deje la aplicación.', 'success');
        this.logOut();
        return true;
      })
    );
  }

  // ==========================
  // LocalStorage
  // ==========================
  saveStorage({ user, token, menu }: { user: User; token: string; menu: ItemMenu[] }): void {

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  loadStorage(): void {

    this.user = JSON.parse(localStorage.getItem('user')) || null;
    this.token = localStorage.getItem('token') || '';
    this.menu = JSON.parse(localStorage.getItem('menu')) || null;

  }


  logOut(): void {
    socket.emit('logout', this.user._id);
    this.restoreValues();

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/home']);
  }

}
