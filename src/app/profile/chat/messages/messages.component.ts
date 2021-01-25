import { Component, HostListener, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChatService, MessageService } from '../../../services/service.index';

import { Message } from '../../../models/model.index';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/user/user.service';
import swal from 'sweetalert';
import { Room } from '../../../models/room/room.model';
import { ModalUploadService } from '../../../services/profile/modal-upload/modal-upload.service';
import { ModalUploadFileService } from '../../../services/profile/modal-upload-file/modal-upload-file.service';

declare const $: any;
declare const socket: any;
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewChecked {

  // ************Data*************

  // Funcionalidad CHAT
  msgs: Message[];
  participants: User[] = [];
  total: number = 0;
  from: number = 0;
  loading: boolean = true;
  room: string;
  roomInfo: Room;
  lastMsgs: boolean = false;
  search: string;
  searchOption: boolean = false;
  searchTotal: number = 0;
  showOptionsMsg: boolean = false;

  msgSelected: Message;


  heightComponents: number = 250;
  height: number = window.innerHeight - this.heightComponents;
  classHeight: string;
  movil: boolean;
  

  constructor(
    private router: Router,
    public userService: UserService,
    public chatService: ChatService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService,
    public modalUploadFileService: ModalUploadFileService 
  ) {
    
    this.msgs = [];
  }

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
  
  ngAfterViewChecked(): void {
    if (!this.searchOption) {
      let endChat = document.getElementById('endChat');
    endChat.scrollIntoView(false);
    }
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      const param = 'id';
      this.room = params[ param ];
      this.loadMessages();
    });

    this.modalUploadService.notif.subscribe(res => {
  
      $('#msg-' + res._idTemp).attr('id', 'msg-' + res._id);
      this.removeSpinner(res._idTemp);

      // this.newMsgEventEmit();
    });

    
    this.modalUploadService.imageSelectedAndUpload.subscribe(res => {
      
      const message: Message = {
        room: this.room,
        message: '',
        imageTemp: res.image,
        type: 'IMG',
        _idTemp: res._idTemp,
      };
  
      
      message.status = 'SENDING';
      message.date = new Date();
      message.sender = this.userService.getUserAuth();
      this.addMsg(message);

    });
    
    this.modalUploadService.notifError.subscribe(err => {
      swal('No se envió el mensaje!!', `Inténtelo de nuevo.\nerr.err`, 'error');
      this.removeSpinner(err._idTemp);
      $('#imageSending-' + err._idTemp).addClass('img-no-send');
      
    });
    /***************************
    * FILE UPLOADING
    ***************************/
   this.modalUploadFileService.fileSelectedAndUpload.subscribe(res => {
      
    const message: Message = {
      room: this.room,
      message: '',
      fileName: res.fileName,
      type: 'FILE',
      _idTemp: res._idTemp
    };

    
    message.status = 'SENDING';
    message.date = new Date();
    message.sender = this.userService.getUserAuth();
    this.addMsg(message);

  });
  this.modalUploadFileService.notif.subscribe(res => {
  
    $('#msg-' + res._idTemp).attr('id', 'msg-' + res._id);
    this.removeSpinner(res._idTemp);
    this.msgs = this.msgs.filter( msgTmp => {
      if (msgTmp._idTemp === res._idTemp) {
        msgTmp.status = res.data.status;
        msgTmp._id = res.data._id;
        msgTmp._idTemp = res.data._id;
      }
      return msgTmp;
    });
    // this.newMsgEventEmit();
  });

  this.modalUploadFileService.notifError.subscribe(err => {
    
    swal('No se envió el mensaje!!', `Inténtelo de nuevo.\n${err.err}`, 'error');
    this.removeSpinner(err._idTemp);
    this.msgs = this.msgs.filter( msgTmp => {
      if (msgTmp._idTemp === err._idTemp) {
        msgTmp.status = 'ERROR';
      }
      return msgTmp;
    });
    // this.newMsgEventEmit();
  });
    socket.on('new-message', (res) => {
      
      res.msg.sender = res.infoUser;
      let msg: Message = res.msg;
      
      this.addMsg(msg)
      this.newMsgEventEmit();
    });
  }
  
  uploadImg(): void {
    this.modalUploadService.showModal( 'img', 'chat', null, 'POST', this.room, new Date().getMilliseconds() * 999999999 + '');
  }

  uploadFile(): void {
    this.modalUploadFileService.showModal( 'file', 'chat', null, 'POST', this.room, new Date().getMilliseconds() * 999999999 + '');
  }

  loadMessages(): void {
    this.loading = true;
    this.messageService.getMsgs( this.room , this.from )
      .subscribe((res: any) => {
        
        this.loading = false;
        this.msgs = res.msgs;
        this.msgs = this.msgs.reverse();
      
        this.roomInfo = res.room;
        
        this.participants = this.participants.concat(res.room.admins, res.room.participants);

        this.total = res.total;
        this.room = res.room._id;
        const endChat = document.getElementById('endChat');
    }, err => {
      swal('No se pudo obtener sus mensajes.', 'Inténtelo de nuevo.\n' + err, 'error');
      this.loading = false;
      this.router.navigate(['/profile/chat']);
    });
    
  }
  

  messageOptions(msg: Message): void {
    if (this.msgSelected) {
      $('#msg-' + this.msgSelected._id || this.msgSelected._idTemp).removeClass('bg-info')
    }
    if (this.msgSelected == msg ) {
      this.showOptionsMsg = !this.showOptionsMsg;
    } else {
      this.showOptionsMsg = true;
    }
    this.msgSelected = msg;
    $('#msg-'+msg._id || msg._idTemp).addClass('bg-info')
    
  }

  closeMessageOptions(): void{
    this.showOptionsMsg = !this.showOptionsMsg;
    $('#msg-'+this.msgSelected._id || this.msgSelected._idTemp).removeClass('bg-info')
    
  }

  deleteMessage(): void {
    swal({
      title: '¿Se encuentra segur@?',
      text: 'El elemento se borrará definitivamente, ¿confirma la acción?',
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        this.messageService.deleteMessage(this.msgSelected)
          .subscribe( (resp: any) => {
            swal('Mensaje eliminado correctamente!', '', 'success');
            $(`#${resp._id}`).remove();
      this.showOptionsMsg = false;
          }, err => swal('Ocurrio un error!', `No se pudo eliminar el mensaje!! \n${err}`, 'error'));
      }
    });
  }

  // --- Search Messages --
  searchInput(): void {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingrese su búsqueda",
          type: "text",
        },
      },
      buttons: {
        confirm: true,
        cancel: true,
      },
    })
    .then( res => {
      if (res) {
        this.loading = true;
        this.search = res;
        this.searchOption = true; // Show search bar
        this.messageService.searchMessages(this.room, this.search)
        .subscribe(res => {
          this.msgs = res.msgs.reverse();
          this.loading = false;
          this.searchTotal = res.total;
          if (this.total === 0) {
            swal({
              title: 'Sin resultados!!',
              icon: 'info'
            });
          }
          
        }, err => {
          this.loading = true;
          this.showSwalError(err);
          this.loadMessages();
          console.log(err)
        });
        
      }
      
    });
  }

  // --- More messages (Search) --
  moreSearchMessages(): void {
    
        this.loading = true;
        this.from += 10;
        this.messageService.searchMessages(this.room, this.search, this.from)
        .subscribe(res => {
          console.log(res.msgs);
          
          this.msgs = res.msgs.reverse().concat(this.msgs.concat());
          console.log(this.msgs);
          
          this.loading = false;
          
        }, err => {
          this.loading = true;
          this.showSwalError(err);
          this.loadMessages();
          console.log(err)
        });
        
      }
      
  hideSearch() {
    this.searchOption = false;
    this.from = 0;
    this.searchTotal = 0;
    this.loadMessages();
  }
  deleteChat(): void {
    swal({
      title: '¿Se encuentra segur@?',
      text: 'Está opción eliminará de manera PERMANENTE todos los mensajes, imágenes, archivos de la conversación. ',
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        this.chatService.deleteChat(this.room)
          .subscribe( (resp: any) => {
            swal('Conversación eliminada correctamente!', `Mensajes eliminados: ${resp.totalMessagesDeleted}\nArchivos eliminados: ${resp.totalFilesDeleted}`, 'success');
            this.router.navigate(['profile/chat']);
          }, err => swal('Ocurrio un error!', `No se pudo eliminar la conversación!! \n${err}`, 'error'));
      }
    });
  }


  sendMsg( msg: string, event ): void {
    event.preventDefault();

    if ( this.room === undefined){
      swal('Chat inválido!', '', 'error');
      this.router.navigate(['/profile/chat/']);
      return;
    }

    if ( msg === '' ){
      swal('Mensaje vacío!', '', 'warning');
      return;
    }

    // console.log('MENSAJE ESCRITO',msg);

    const message: Message = {
      room: this.room,
      message: msg,
      type: 'TXT',
      _idTemp: this.getIdTmp(),
    };

    
    message.status = 'SENDING';
    message.date = new Date();
    message.sender = this.userService.getUserAuth();
    $('#inputMessageTxt').val('');

    if ( this.roomInfo.type === 'CHAT' ) {
      message.contact = this.participants.filter(participant => participant._id !== this.userService.getUserAuth()._id)[0];
      
      this.messageService.sendMessage(message)
      .subscribe((res: any) => {

        $('#msg-' + message._idTemp).attr('id', 'msg-' + res.data._id);
        this.msgs = this.msgs.filter( msgTmp => {
          if (msgTmp._idTemp === message._idTemp) {
            msgTmp._id = res.data._id;
            msgTmp.status = res.data.status;
          }
          return msgTmp;
        });

        this.removeSpinner(message._idTemp);
        message.status = res.data.status;

        }
        , err => {
          swal('No se envió el mensaje!!', 'Inténtelo de nuevo.\n' + err, 'error');
        });
    } else {
      message.participants = this.participants;
    }
    // this.msgs.push(message);
    this.addMsg(message);

    
    }

    addMsg(msg: Message) {
      
    this.msgs.push(msg);
    }

    newMsg(event) {
        event.preventDefault();
    }

    newMsgEventEmit() {
      $('#newMsgButton').click();
    }

    getIdTmp() {
      return new Date().getMilliseconds() * 999999999 + '';
    }

    removeSpinner(idTmp) {
      $('#spinner-' + idTmp).remove();
    }

    showSwalError(err) {
      swal({
        title: 'Ha ocurrido un error!!',
        text: 'Inténtelo de nuevo por favor.' + err,
        icon: 'error'
      });
    }
}
