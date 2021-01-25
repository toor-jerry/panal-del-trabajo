import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalUploadFileService } from '../../services/profile/modal-upload-file/modal-upload-file.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload-file',
  templateUrl: './modal-upload-file.component.html',
  styleUrls: ['./modal-upload-file.component.css']
})
export class ModalUploadFileComponent implements OnInit {
  token: string;
  fileUpload: File;
  extention: String;

  constructor(
    private userService: UserService,
    private uploadFileService: UploadFileService,
    public modalUploadFileService: ModalUploadFileService
  ) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
  }

  fileSelected( file: File ): void {
    
    if ( !file ) {
      this.fileUpload = null;
      return;
    }
    
    
    let type = file.type;
    
    if( type.match(/image\/*/)){
      swal('Tipo de archivo no admitido!', `Por favor sólo seleccione archivos\nTipos admitidos: ${this.uploadFileService.getFileExtentions().join(', ')}`, 'warning')
      this.fileUpload = null;
      return;
    }
    let extValid = false;
    let exts = this.uploadFileService.getFileExtentions();
    for (let index = 0; index < exts.length; index++) {
      
      if(type.match(exts[index])){
        extValid = true;
        break;
      }
      
    }

    if(extValid){  
      this.fileUpload = file;
      if (type.match(/application\/pdf/)) {
        this.extention = 'pdf';
      } else if (type.match(/application\/msword/) || type.match(/application\/msword/) || type.match(/application\/vnd.openxmlformats-officedocument.wordprocessingml.document/)) {
        this.extention = 'word';
      } else {
        this.extention = 'file';
      }
    } else {
      swal('Tipo de archivo no admitido!', `Por favor sólo seleccione archivos\nTipos admitidos: ${this.uploadFileService.getFileExtentions().join(', ')}`, 'warning')
      this.fileUpload = null;
    }
    
}

hideModal(): void {
  this.fileUpload = null;
  this.extention = null;
  this.modalUploadFileService.hideModal();
}

uploadFile(): void {
  this.modalUploadFileService.fileSelectedAndUpload.emit({fileName: this.fileUpload.name, _idTemp: this.modalUploadFileService._idTemp})
  this.uploadFileService.upladFile(
    this.fileUpload,
    this.modalUploadFileService.type,
    this.modalUploadFileService.category,
    this.modalUploadFileService.id,
    this.modalUploadFileService.typeRequest,
    this.modalUploadFileService.room,
    this.modalUploadFileService._idTemp
  )
    .then(res => {
      
      this.modalUploadFileService.notif.emit( res );
      this.hideModal();
    })
    .catch(err => {

      this.modalUploadFileService.notifError.emit({err, _idTemp: this.modalUploadFileService._idTemp});

      this.hideModal();
      console.log(err);
      
    });
}
}
