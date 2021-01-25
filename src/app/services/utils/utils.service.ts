import { Injectable } from '@angular/core';

import swal from 'sweetalert';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getIdTmp() {
    return new Date().getMilliseconds() * 999999999 + '';
  }

  removeSpinner(idTmp) {
    $('#spinner-' + idTmp).remove();
  }

  showMessageErrorSendMsg(err = null) {
    return swal('No se envió el mensaje!!', 'Inténtelo de nuevo.\n' + err, 'error')
  }
}
