import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  type: string;
  id: string;
  category: string;
  typeRequest: string;
  room: string;
  _idTemp: string;

  hide: string = 'hide-modal';

  notif = new EventEmitter<boolean | any>();
  notifError = new EventEmitter<boolean | any>();
  imageSelectedAndUpload = new EventEmitter<boolean | any>();

  constructor() { }

  hideModal(): void {
    this.hide = 'hide-modal';
    this.type = null;
    this.id = null;
    this.category = null;
    this.typeRequest = null;
    this.room = null;
    this._idTemp = null;
  }

  showModal(type: string = 'img', category: string = 'photography', id: string = null, typeRequest: string = null, room: string = null, _idTemp: string = null): void {
    this.hide = '';
    this.type = type;
    this.category = category;
    this.id = id;
    this.typeRequest = typeRequest;
    this.room = room;
    this._idTemp = _idTemp;
  }
}
