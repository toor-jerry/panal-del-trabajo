import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../../../config/config';
import { Room } from '../../../models/room/room.model';
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor( private http: HttpClient ) { }

  getById = (id: string) => {
    const url = `${API_URL}/room/${id}`;

    return this.http.get( url )
      .pipe(
        map((res: any) => res.data)
      );
  }

  update = (room: Room) => {
    const url = `${API_URL}/room/${room._id}`;

    return this.http.put( url, room )
      .pipe(
        map((res: any) => res.data)
      );
  }

  create = (room: Room) => {
    const url = `${API_URL}/room`;

    return this.http.post( url, room )
      .pipe(
        map((res: any) => res.data)
      );
  }

  delete = (id: string) => {
    const url = `${API_URL}/room/${id}`;

    return this.http.delete( url )
      .pipe(
        map((res: any) => res.data)
      );
  }

  addParticipant(room: string, participants = null, participant = null) {
    let url = `${API_URL}/room/add/participant/${room}`;
    if (participant) {
      url +=  `?participant=${participant}`
    }

    return this.http.put( url, participants )
      .pipe(
        map((res: any) => res.data)
      );
  }

  getAllRequest(room: string) {
    let url = `${API_URL}/room/request/all/${room}`
  
    return this.http.get( url)
      .pipe(map((res: any) => res.data));
  }

  addRequest(room: string, participant = null) {
    let url = `${API_URL}/room/request/join/${room}?request=${participant}`
  
    return this.http.put( url, {})
      .pipe(map((res: any) => res.data));
  }

  deleteRequest(room: string, participant: string) {
    let url = `${API_URL}/room/request/remove/${room}/${participant}`
  
    return this.http.delete(url)
      .pipe(map((res: any) => res.data));
  }

  addAdmin(room: string, admins = null, admin = null) {
    let url = `${API_URL}/room/add/admin/${room}`;
    if (admin) {
      url +=  `?admin=${admin}`
    }

    return this.http.put( url, admins )
      .pipe(
        map((res: any) => res.data)
      );
  }

  removeParticipantAdmin(room: string, participant= null, admin=null) {
    let url = `${API_URL}/room/remove/participant/${room}`;
    if (participant) {
      url +=  `?participant=${participant}`
    } else if (admin) {
      url +=  `?admin=${admin}`
    }

    return this.http.delete( url )
      .pipe(
        map((res: any) => res.data)
      );
  }
}
