import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit} from '@angular/core';

import { ThemeProfileService, UserService, AuthService } from '../../services/service.index';
import { ItemMenu } from '../../models/model.index';

declare const socket: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.css' ]
})
export class SidebarComponent implements OnInit {

  ocultarMostrar: boolean = true;

  audioNewMsg = "../../../assets/audio/new-msg.mp3";

  theme: string;
  menu: ItemMenu[] = [];

  ocultarColumna: boolean = false;

  constructor(
    private themeProfileService: ThemeProfileService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.theme = 'bg-' + this.themeProfileService.getThemeSideBar();
    this.menu = this.userService.getMenu();
    
    socket.on('new-message', (res) => {
      this.playAudioMsg();
    });
  }
  playAudioMsg(): void {
    const src = new Audio(this.audioNewMsg);
    src.play();
  }
}
