/*Recibiendo parámetros por URL - ActivatedRoute*/
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/service.index';
import { User } from '../../models/user/user.model';

import swal from 'sweetalert';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.css' ]
})
export class UserComponent{

  user: User; // Variable local
loading: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public userService: UserService
    ) {
    this.activatedRoute.params.subscribe( params =>{
      this.loading = true;

        this.userService.getUser( params['id'] )
          .subscribe((user: User) => {
            this.user = user;
            this.loading = false;
          }, err => this.showSwalError(err))
    } );

   }

   showSwalError(err) {
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }
   regresar(){

     history.back()
   }

}
