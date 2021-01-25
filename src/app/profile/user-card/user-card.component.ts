import { Component, OnInit, Input /* Output, EventEmitter */ } from '@angular/core';
import { Router } from "@angular/router";
import { User } from './../../models/model.index';
import { UserService } from '../../services/service.index';

import swal from 'sweetalert';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Input() contacts: string[] = [];

  constructor( private router: Router,
               public userService: UserService ) {
    /* this.usuarioSeleccionado = new EventEmitter(); */
   }

  ngOnInit(): void {
  }

  addContact(user: User) {
    this.userService.addContact(user._id)
      .subscribe(() => {
        this.contacts.push(user._id);
        swal('Contacto agregado correctamente!!',`${user.name} ${user.last_name}`, 'success');
      }, err => swal({
        title: 'Ha ocurrido un error!!',
        text: `${user.name} ${user.last_name} no se pudo agregar a sus contactos.\nInténtelo de nuevo por favor.\n${err}`,
        icon: 'error'
      }));
    
  }
  
  getUser(user: string): void{
     this.router.navigate(['/profile/user', user]);
    }

}
