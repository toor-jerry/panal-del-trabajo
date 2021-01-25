import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { UserService, ModalUploadService, UploadFileService } from '../../services/service.index';
import { User } from './../../models/model.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  token: string;
  imageUpload: File;
  imageTemp: string | ArrayBuffer;
  constructor( private userService: UserService,
               private uploadFileService: UploadFileService,
               public modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
  }

  imageSelected( file: File ): void {

    if ( !file ) {
      this.imageUpload = null;
      return;
    }

    if ( file.type.match(/image\/*/) == null ) {
      swal('Tipo de archivo no admitido!', 'Por favor sólo seleccione imágenes\nTipos admitidos: png, jpg, gif, jpeg.', 'warning');
      this.imageUpload = null;
      return;
    }

    this.imageUpload = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imageTemp = reader.result;
    };

}

hideModal(): void {
  this.imageTemp = null;
  this.imageUpload = null;
  this.modalUploadService.hideModal();
}

uploadFile(): void {
  this.modalUploadService.imageSelectedAndUpload.emit({image: this.imageTemp, _idTemp: this.modalUploadService._idTemp})
  this.uploadFileService.upladFile(
    this.imageUpload,
    this.modalUploadService.type,
    this.modalUploadService.category,
    this.modalUploadService.id,
    this.modalUploadService.typeRequest,
    this.modalUploadService.room,
    this.modalUploadService._idTemp
  )
    .then(res => {
      if (this.userService.getUserAuth()._id === this.modalUploadService.id) {
        const user: User = this.userService.getUserAuth();
        user.photography = res.data.photography;
        user.thumbnail_photography = res.data.thumbnail_photography;
        this.userService.saveStorage({ user, token: this.userService.getToken(), menu: this.userService.getMenu()});
      }

      this.modalUploadService.notif.emit( res );
      this.hideModal();
    })
    .catch(err => {
      this.modalUploadService.notifError.emit({err, _idTemp: this.modalUploadService._idTemp});
      this.hideModal();

      console.log(err);
    });
}
}