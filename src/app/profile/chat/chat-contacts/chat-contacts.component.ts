import { Component, HostListener, OnInit } from '@angular/core';
import { ChatService, UserService } from '../../../services/service.index';
import { Contact, Chat } from '../../../models/model.index';

@Component({
  selector: 'app-chat-contacts',
  templateUrl: './chat-contacts.component.html',
  styleUrls: ['./chat-contacts.component.css']
})
export class ChatContactsComponent implements OnInit {

  contacts: Contact[] = [];
  chats: Chat[] = [];

  search: string;
  loading: boolean = true;
  from: number = 0;
  hide: boolean = false;

  heightComponents: number = 250;
  height: number = window.innerHeight - this.heightComponents;
  classHeight: string;
  movil: boolean;

  @HostListener('window:resize', ['$event'])
  onWindowResize( event ): void {
    const win = event.target;
    // movile
    if ( win.innerWidth <= 991 ) {
      this.classHeight = 'height: 100%;';
      return;
    }
    this.height = win.innerHeight - this.heightComponents;
    this.classHeight = 'height: ' + this.height + 'px;';
  }


  constructor(
    public userService: UserService,
    public chatService: ChatService) {
      if ( window.innerWidth <= 991 ) {
        this.classHeight = 'height: 100%;';
      } else {
        this.classHeight = 'height: ' + this.height + 'px;';
      }
    }

  ngOnInit(): void {
    this.loadConversations();
    this.loadContacts();

    // this.chatService.createChatSocket()
    //   .subscribe((res: any) => {
    //     this.contacts = res.contacts;
    //     this.chats = res.chats;
    //   });

    // this.chatService.deleteChatSocket()
    // .subscribe((res: any) => {
    //   this.contacts = res.contacts;
    //   this.chats = res.chats;
    // });
  }

  loadContacts(): void {
    this.loading = true;
    this.chatService.getContacts()
      .subscribe((contacts: Contact[]) => {
        this.loading = false;
        this.contacts = contacts;
      },
      () => this.loading = false);
  }

  loadConversations(): void {
    this.loading = true;

    this.chatService.getConversations()
      .subscribe((chats: Chat[]) => {
        this.loading = false;
        this.chats = chats;
      },
        () => this.loading = false);
  }

  searchContacts(term: string): void {
    this.loading = true;
    if (term === '' || term === '+' || term === '*' || term === '.') {
      this.loadContacts();
      return;
    }

    this.chatService.searchContacts(term)
        .subscribe((contacts: Contact[]) => {
          this.loading = false;
          this.contacts = contacts;
        },
        () => this.loading = false);

  }
}
