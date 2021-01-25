 /// <reference path="../../../node_modules/@types/socket.io-client/index.d.ts" /> 
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, ThemeProfileService, ThemeService } from '../services/service.index';
import swal from 'sweetalert';

declare var socket: SocketIOClient.Socket;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit, OnDestroy {

  conected: boolean = true;
  constructor(
    private themeProfileService: ThemeProfileService,
    private themeService: ThemeService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {

    // Load theme
    this.themeProfileService.loadSettingsPerfil();

    socket.connect();
    // Join room
    this.register();

    // Listen errors
    socket.on('error', err => {
      swal('Error!!', `Ha ocurrido un errror, inténtelo de nuevo por favor.\nRevise su conexión a internet e inténtelo de nuevo.\n${err || ''}`, 'error');
    });

    socket.on('unauthorized', err => {
      swal('Error!!', `Ha ocurrido un errror, inténtelo de nuevo por favor.\nNo se pudo verificar su identidad.\n${err || ''}`, 'error');
    });
    

    // Listen I connections
    socket.on('new-conection', (users) => {this.userService.setSetions(users); 
    console.log(users);
    });
    socket.on('i-logout', (users) => {
      console.log('LOGOUT: ',users);
      
      this.userService.setSetions(users)
    });


    socket.on('connect',() => {
      this.conected = true;
      this.register();
    });
    
    socket.on('disconnect', () => {
      this.conected = false;
    });

    socket.on('user-disconnect', (user) => {
      console.log(user);
      
    });

  }

  ngOnDestroy(): void{
    this.themeService.restoreSettings( this.themeProfileService.getSettingsBody() );
  }

  register(): void {
    socket.emit('register', this.userService.getToken());
  }

}
