import { Offer } from './../../../models/offer/offer.model';
import { map } from 'rxjs/operators';
import { API_URL } from './../../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user/user.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }


  getOffers = (from: number = 0) => {
    let reqByRole = '';
    switch (this.userService.getUserAuth().role) {
      case 'USER_ROLE':
        reqByRole += '/by-USER_ROLE'
        break;
      case 'USER_PLATINO_ROLE':
        reqByRole += '/by-USER_PLATINO_ROLE'
        break;
      case 'ENTERPRISE_ROLE':
        reqByRole += '/by-ENTERPRISE_ROLE'
        break;
    }
    const url = `${API_URL}/offer${reqByRole}?from=${from}`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          return {
            offers: res.data,
            total: res.total
          };
        })
      );
  }

  getOfferById = (id: string) => {
    const url = `${API_URL}/offer/${id}`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          return res.data
        })
      );
  }
  createOffer = (offer: Offer) => {
    let url = `${API_URL}/offer`;
    
    return this.http.post(url, offer)
      .pipe(
        map((res: any) => {
          swal('Oferta creada correctamente.', '', 'success');
          return res.data
        })
      );
  }
  deleteOffer = (id: string) => {
    let url = `${API_URL}/offer/${id}`;
    
    return this.http.delete(url)
      .pipe(
        map((res: any) => {
          swal('Oferta eliminada correctamente.', '', 'success');
          return res.data
        })
      );
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
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }
}
