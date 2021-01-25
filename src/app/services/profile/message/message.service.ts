import { Injectable } from '@angular/core';
import { Message } from '../../../models/room/message.model';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../../../config/config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  sendMessageRoom(msg: Message) {
    const url = `${API_URL}/message`;
    return this.http.post(url, msg);
  }

  getMsgs = (room: string, from: number = 0) => {
    const url = `${API_URL}/message/${room}?from=${from}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          const data = res.data;
          const msgs = data.messages;
          
          return {
            msgs: msgs.messages,
            room: data.room.data,
            total: msgs.total
          };
        }
        )
      );
  }

  getMsgsWhitoutRoom = (room: string, from: number = 0) => {
    const url = `${API_URL}/message/whitout-room/${room}?from=${from}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          let data = res.data;
          return {
            msgs: data.messages,
            total: data.total
          };
        }
        )
      );
  }

  searchMessages(room: string, term: string, from: number = 0) {
    const url = `${API_URL}/search/messages/${room}/${term}?from=${from}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          let data = res.data;
          return {
            msgs: data.data,
            total: data.total
          };
        })
      );
  }

  deleteMessage = (message: Message) => {

    const url = `${API_URL}/message/${message.room}/${message._id}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => res.data)
      );
  }

  sendMessage(msg: Message) {
    const url = `${API_URL}/message/chat`;
    return this.http.post(url, msg);
  }
}
