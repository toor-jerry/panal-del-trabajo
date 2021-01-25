import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/profile/room/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../models/room/room.model';
import swal from 'sweetalert';
import { Message } from '../../models/room/message.model';
import { MessageService } from '../../services/profile/message/message.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user.model';
import { ModalUploadService } from '../../services/profile/modal-upload/modal-upload.service';
import { ForoumService } from '../../services/profile/foroum/foroum.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ModalUploadFileService } from '../../services/profile/modal-upload-file/modal-upload-file.service';

declare const $: any;
declare const socket: any;

@Component({
  selector: 'app-foro-dashboard',
  templateUrl: './foro-dashboard.component.html',
  styleUrls: ['./foro-dashboard.component.css']
})
export class ForoDashboardComponent implements OnInit {
  
  loading = true
  foro: Room
  messages: Message[] = []
  from = 0
  fromSearch = 0
  fromForos = 0
  totalMsgs = 0
  totalForos = 0
  totalSearch = 0
  foros: Room[] = []
  I: User
  audioNewMsg = "../../../assets/audio/new-msg.mp3";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
    private messageService: MessageService,
    private foroumService: ForoumService,
    public userService: UserService,
    private modalUploadService: ModalUploadService,
    private utilsService: UtilsService,
    private modalUploadFileService: ModalUploadFileService
  ) {
    this.I = this.userService.getUserAuth() 
    this.activatedRoute.params.subscribe(params => {
    this.roomService.getById(params['id'])
        .subscribe(res => {
          this.foro = res
          this.getMessages()
          
        }, err => this.showSwalError(err));
  });
  this.getAllForos()

}

  ngOnInit(): void {

    this.modalUploadService.notif.subscribe(res => {
  
      $('#msg-' + res._idTemp).attr('id', 'msg-' + res._id);
      this.removeSpinner(res._idTemp);
    });

    
    this.modalUploadService.imageSelectedAndUpload.subscribe(res => {
      
      const message: Message = {
        room: this.foro._id,
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
      room: this.foro._id,
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
    this.messages = this.messages.filter( msgTmp => {
      if (msgTmp._idTemp === res._idTemp) {
        msgTmp.status = res.data.status;
        msgTmp._id = res.data._id;
        msgTmp._idTemp = res.data._id;
      }
      return msgTmp;
    });
  });

  this.modalUploadFileService.notifError.subscribe(err => {
    
    swal('No se envió el mensaje!!', `Inténtelo de nuevo.\n${err.err}`, 'error');
    this.removeSpinner(err._idTemp);
    this.messages = this.messages.filter( msgTmp => {
      if (msgTmp._idTemp === err._idTemp) {
        msgTmp.status = 'ERROR';
      }
      return msgTmp;
    });
  });
    socket.on('new-message', (res) => {
      
      res.msg.sender = res.infoUser;
      let msg: Message = res.msg;
      
      const src = new Audio(this.audioNewMsg);
      src.play();
    });

  }
  addMsg(msg: Message) {
    this.messages.push(msg);
  }

  getMessages() {
    if (this.totalMsgs < this.from) {
      return
    }
    this.messageService.getMsgsWhitoutRoom(this.foro._id, this.from)
          .subscribe(res => {
            this.loading = false
            
            this.totalMsgs = res.total
            this.from +=10
            this.messages = res.msgs.concat(this.messages)
            this.messages = this.messages.reverse();
          }, err => this.showSwalError(err))
  }
  showLoading() {
    swal({
      title: 'Espere por favor...',
      icon: '../../../assets/img/Wedges-3s-200px.svg',
      buttons: [false, false],
      closeOnClickOutside: false,
      closeOnEsc: false,
    });
  }

  showSwalError(err) {
    this.loading = false
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }

  uploadImg(): void {
    this.modalUploadService.showModal( 'img', 'chat', null, 'POST', this.foro._id, new Date().getMilliseconds() * 999999999 + '');
  }

  uploadFile(): void {
    this.modalUploadFileService.showModal( 'file', 'chat', null, 'POST', this.foro._id, new Date().getMilliseconds() * 999999999 + '');
  }

  // --- Search Messages --
  searchInput(search: string): void {
    
        this.loading = true;
        this.messageService.searchMessages(this.foro._id, search, this.fromSearch)
        .subscribe(res => {
          // this.msgs = res.msgs.reverse();
          this.loading = false;
          this.totalSearch = res.total;
          
          if (this.totalSearch === 0) {
            return swal({
              title: 'Sin resultados!!',
              icon: 'info'
            });
          }
          this.messages = res.msgs
          
        }, err => {
          this.loading = true;
          this.showSwalError(err);
        });

      
  }

  getAllForos() {
    
    if (this.totalForos < this.fromForos) {
      return
    }
    this.foroumService.getAllForoums(this.fromForos)
    .subscribe((res: any) => {
      this.totalForos = res.total
      this.foros = res.foros.concat(this.foros)
      this.fromForos += 10
    }, err => this.showSwalError(err))
  }

  // getRandom(max: number, min=0) {
  //   return Math.ceil(Math.random() * (max-min))
  // }
  // getRandomColor() {
  //   return 'hsla('+this.getRandom(360)+',50%,50%,1)'
  // }
  sendRequestJoin(foro: string) {
    this.showLoading()
    this.roomService.addRequest(foro, this.I._id) 
    .subscribe(res => {
      this.foros = this.foros.filter(foroTmp => {
        return foroTmp._id+'' !== foro
      })
      swal('Petición enviada con éxito!', 'Los administradores del foro le darán acceso al foro.', 'success')
    }, err => this.showSwalError(err))
  }


  

  sendMsg( msg: string, event ): void {
    event.preventDefault();

    if ( this.foro === undefined){
      swal('Foro inválido!', '', 'error');
      this.router.navigate(['/profile/foros']);
      return;
    }

    if ( msg === '' ){
      swal('Mensaje vacío!', '', 'warning');
      return;
    }

    const message: Message = {
      room: this.foro._id,
      message: msg,
      type: 'TXT',
      _idTemp: this.utilsService.getIdTmp(),
    };
    
    
    message.status = 'SENDING';
    message.date = new Date();
    message.sender = this.userService.getUserAuth();
    $('#inputMessageForoTxt').val('');
      
      this.messageService.sendMessageRoom(message)
      .subscribe((res: any) => {

        $('#msg-' + message._idTemp).attr('id', 'msg-' + res.data._id);
        this.messages = this.messages.filter( msgTmp => {
          if (msgTmp._idTemp === message._idTemp) {
            msgTmp._id = res.data._id;
            msgTmp.status = res.data.status;
          }
          return msgTmp;
        });

        this.utilsService.removeSpinner(message._idTemp);
        message.status = res.data.status;

        }
        , err => this.utilsService.showMessageErrorSendMsg(err));
    
    
    this.messages.push(message);

    
    }

    removeSpinner(idTmp) {
      $('#spinner-' + idTmp).remove();
    }
}
