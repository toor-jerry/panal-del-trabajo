import { ChatService } from './../../services/profile/chat/chat.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  @Input() user: any = {};
  @Input() index: string;
  @Input() type: string = 'CONTACT';

  @Output() contactsNews: EventEmitter<User[]> = new EventEmitter();
  @Output() contactsOnChatNews: EventEmitter<User> = new EventEmitter();

  constructor(
    private router: Router,
    public userService: UserService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  deleteContact(user: User) {
    swal({
      title: '¿Está segur@?',
      text: `Está opción eliminará su contacto ${user.user} | ${this.createName(user)} de forma permanente, esto eliminará todos los mensajes que tenga con él, esto incluye archivos y/o imágenes que haya enviado con el contacto!!`,
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        if (this.type == 'CONTACT') {
        this.userService.deleteContact(user._id)
          .subscribe(contacts => {
            this.contactsNews.emit(contacts);
            swal({
              title: 'Se ha eliminado correctamente su contacto!!',
              text: `${this.createName(user)}`,
              icon: 'success'
            })
          }, 
            err => swal({
              title: 'Ha ocurrido un error!!',
              text: `No se pudo eliminar al contacto: ${this.createName(user)}}\nInténtelo de nuevo por favor.\n${err}`,
              icon: 'error'
            }));

          } else if (this.type === 'CHAT') {
            this.chatService.deleteUserChat(user.chat)
          .subscribe((res: any) => {
            this.contactsOnChatNews.emit(user);
            let msgs = (res.totalFilesDeleted > 0) ? `Se han eliminado ${res.totalFilesDeleted} archivos del chat.\n`: '';
            msgs += (res.totalMessagesDeleted > 0) ? `Se han eliminado ${res.totalMessagesDeleted} mensajes del chat.`: '';;
            swal({
              title: 'Se ha eliminado correctamente su contacto!!',
              text: `${msgs}\n${this.createName(user)}`,
              icon: 'success'
            })
          }, 
            err => swal({
              title: 'Ha ocurrido un error!!',
              text: `No se pudo eliminar al contacto: ${this.createName(user)}\nInténtelo de nuevo por favor.\n${err}`,
              icon: 'error'
            }));
          }
      }
    });

  }

  getUser(){
     this.router.navigate(['/profile/user', this.index]);
  }
  createName(user: User) {
    let name = (user.name) ? `${user.name} ` : '';
    name += (user.last_name) ? `${user.last_name}` : '';
    return name;
  }
}
