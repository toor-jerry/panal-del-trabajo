import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

import swal from 'sweetalert';
import { API_URL } from './../../config/config';

@Component({
  selector: 'app-other-services',
  templateUrl: './other-services.component.html',
  styles: [
  ]
})
export class OtherServicesComponent implements OnInit {
  loading = false
  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }
  getPDF() {
    this.loading = true
    this.userService.getPDF()
    .subscribe(nameFile => {
      this.loading = false
      window.open(`${API_URL}/file/cv/${nameFile}?Authorization=${this.userService.getToken()}`, '_blank');
    }, err => this.showSwalError(err))
  }

  showSwalError(err) {
    this.loading = false
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }
}
