import { Component, OnInit } from '@angular/core';
import { Offer } from './../../models/offer/offer.model';
import { OfferService } from '../../services/profile/offer/offer.service';
import swal from 'sweetalert';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-offers-manager',
  templateUrl: './offers-manager.component.html',
  styleUrls: ['./offers-manager.component.css']
})
export class OffersManagerComponent implements OnInit {
  loading: boolean = true;
  offers: Offer[] = [];
  total = 0
  from = 0
  page =0
  pages = 1
  showCreateOffer = false
  labelBtnCreateOffer="Agregar oferta"
  offerForm: FormGroup;

  

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService ) { 
    this.createForm()
  }

  ngOnInit(): void {
    this.getOffers();
  }
  createForm(): void{
    this.offerForm = this.fb.group({
    title: ['', [ Validators.required, Validators.minLength(3) ] ],
    description: ['', Validators.required],
    role: ['USER_ROLE', Validators.required],
    duration: [null]
    });
  }
  
  viewFormCreateOffer() {
    this.showCreateOffer = !this.showCreateOffer
    if (this.showCreateOffer)
      this.labelBtnCreateOffer = "Agregar oferta"
    else
      this.labelBtnCreateOffer = "Cancelar"
  }
  createOffer() {
    if ( this.offerForm.invalid ) {
      swal('Complete los campos "Titulo" y "Descripción" cuando menos!!', '', 'warning');
      return;
    }
    this.showLoading()
    this.offerService.createOffer(this.offerForm.value)
      .subscribe(res => {
        swal('Oferta creada con éxito!!', res?.title + '\n'+res?.description, 'success')
        console.log(res)
      }, err => this.showSwalError(err))
  }

  getOffers(): void {
    this.loading = true;
    this.offerService.getOffers(this.from)
      .subscribe((res: any) => {
        this.loading = false;
        this.offers = res.offers;
        this.total = res.total
        this.pages = Math.ceil(this.total / 10);

      }, err => this.showSwalError(err));
  }
  showSwalError(err) {
    this.loading = false
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }

  delete(id: string): void {
    swal({
      title: '¿Está segur@?',
      text: `Está opción eliminará la oferta de forma permanente!!`,
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
      this.showLoading()
      this.offerService.deleteOffer(id)
      .subscribe(() => {
        this.offers = this.offers.filter(offer => {
          return ''+offer._id !== id
        });
      });
    }
  });

}

show(id: string ): void {
  this.showLoading()
  this.offerService.getOfferById(id)
    .subscribe(res => {
      swal(res.title,res.description + '\n\nFecha limite: ' + res?.duration)
    }, err => this.showSwalError(err))
}

showMore(fromPage: number, page: number ): void {
  const from = this.from + fromPage;

  if (from >= this.total) {
    return;
  }

  if (from < 0) {
    return;
  }
  this.page += page;
  this.from += fromPage;
  
this.getOffers()
}

sync() {
  this.getOffers()
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
}
