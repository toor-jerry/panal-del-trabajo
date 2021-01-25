import { UserService } from './../../user/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../config/config';
import { HttpClient } from '@angular/common/http';


declare var socket: SocketIOClient.Socket;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  newEmployment(): Observable<any> {
    return new Observable(observer => {
      socket.on('new-employment', (resp: any) => {
      console.log("NEW EMPLOYMMENT")
        this.userService.setNoNotifications();
      observer.next(resp.data);
      });
    });
  }

  getNotifications = () => {
    const url = `${API_URL}/user/notifications`;

    return this.http.get(url)
      .pipe(
        map((res: any) => res.data.notifications)
      );
  }
}
