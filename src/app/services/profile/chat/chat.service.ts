import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { API_URL } from '../../../config/config';
import { Message } from '../../../models/model.index';

declare const socket: any;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // socket = new Observable();
  constructor(
    private http: HttpClient
  ) { }

  createChat = (contact: string) => {
    const url = `${API_URL}/room/chat`;
    return this.http.post(url, { contact })
      .pipe(
        map((res: any) => res.data.room)
      );
  }



  deleteChat = (chat: string) => {
    const url = `${API_URL}/room/chat/${chat}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => {
          const data = res.data;
          const user = data.user.data;
          return {
            contacts: user.contacts,
            conversations: user.conversations,
            totalMessagesDeleted: data.totalMessagesDeleted,
            totalFilesDeleted: data.totalFilesDeleted
          };
        })
      );
  }

  deleteUserChat = (chat: string) => {
    const url = `${API_URL}/room/user-chat/${chat}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => {
          const data = res.data;
          const user = data.user.data;
          return {
            totalMessagesDeleted: data.totalMessagesDeleted,
            totalFilesDeleted: data.totalFilesDeleted
          };
        })
      );
  }


  getContacts = () => {
    const url = `${API_URL}/user/contacts/byid`;

    return this.http.get(url)
      .pipe(
        map((res: any) => res.data.contacts)
      );
  }

  getContactsOnlyId = () => {
    const url = `${API_URL}/user/contacts-id/byid`;

    return this.http.get(url)
      .pipe(
        map((res: any) => res.data.contacts)
      );
  }

  getContactsOnChats = () => {
    const url = `${API_URL}/room/conversations/contacts`;

    return this.http.get(url)
      .pipe(
        map((res: any) => res.data)
      );
  }

  getContactsOnChatsOnlyId = () => {
    const url = `${API_URL}/room/conversations/contacts-id`;

    return this.http.get(url)
      .pipe(
        map((res: any) => res.data)
      );
  }

  getConversations = () => {
    const url = `${API_URL}/user/conversations`;

    return this.http.get(url)
      .pipe(
        map((res: any) => res.data.conversations)
      );
  }

  searchContacts = (term: string, from: number = 0) => {
    const url = `${API_URL}/user/search/contact/${term}?from=${from}`;

    return this.http.get(url)
      .pipe(
        map((res: any) => res.data.contacts)
      );
  }

  // ==========================
  // Sockets
  // ==========================
  // createChatSocket(): Observable<any>{
  //   return this.socket
  // .fromEvent("create-chat")
  //   .pipe(
  //     map((res: any) => {
  //       const user = res.data.user.data;
  //       return {
  //         contacts: user.contacts,
  //         chats: user.conversations
  //     };
  //     })
  //   );
  // }

  // deleteChatSocket(): Observable<any>{
  // return this.socket
  // .fromEvent("delete-chat")
  //   .pipe(
  //     map((res: any) => {
  //       const user = res.data.user.data;
  //       return {
  //         contacts: user.contacts,
  //         chats: user.conversations
  //     };
  //     })
  //   );
  // }

}
