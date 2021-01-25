import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

import { ChatService } from '../../services/service.index';
import { User } from './../../models/model.index';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  // ************Data*************
  contacts: User[] = [];
  contactsOnChat: User[] = [];
  loading: boolean = false;

  constructor(
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.getContacts()
      .subscribe(users => this.contacts = users,
        err => this.showSwalError(err));

    this.chatService.getContactsOnChats()
      .subscribe(users => {
        this.contactsOnChat = users
      },
        err => this.showSwalError(err));
  }

  newsContacts(contacts: User[] ) {
    this.contacts = contacts;
  }
  
  newsContactsOnChat(contact: User) {    
    this.contactsOnChat = this.contactsOnChat.filter(contactItem => contactItem._id !== contact._id);
  }
  
  showSwalError(err) {
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }
}
