import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert';

import { ChatService } from '../../../services/service.index';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html'
})
export class CreateRoomComponent implements OnInit {

  loading = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService
  ) {
    this.activatedRoute.params.subscribe( params => {
      const param = 'id';
      this.createChat(params[ param ]);
    });
  }

  ngOnInit(): void {}
  createChat(contact: string): void {
    this.chatService.createChat(contact)
      .subscribe((res: any) => {
        this.router.navigate(['/profile/chat/conversation', res]);
      }
      , err => {
        swal('No se realizó la creación del chat', 'Inténtelo de nuevo.\n' + err, 'error');
        this.loading = false;
        this.router.navigate(['/profile/chat']);
      });
  }
}
