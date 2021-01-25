import { Offer } from './../../models/offer/offer.model';
import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/profile/offer/offer.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  offers: Offer[] = []
  total = 0
  from = 0
  loading = false
  constructor(
    private offerService: OfferService
  ) {
    this.getAllOfferts()
  }

  ngOnInit(): void {
  }

  getAllOfferts(): void {
    this.loading = true
    this.offerService.getOffers(this.from)
      .subscribe(res => {
        this.loading = false
        this.offers = res.offers.concat(this.offers)
        this.total = res.total
        this.from +=10
      }, err => {
        this.loading = false
        this.offerService.showSwalError(err)
      })
  }

  show(id: string ): void {
    this.offerService.showLoading()
    this.offerService.getOfferById(id)
      .subscribe(res => {
        swal(res.title,res.description + '\n\nFecha limite: ' + res?.duration)
      }, err => this.offerService.showSwalError(err))
  }

  showMore(): void {
    
    if (this.from >= this.total) {
      return;
    }
    
  this.getAllOfferts()
  }
}
