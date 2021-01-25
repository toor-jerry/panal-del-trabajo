import { Component, OnInit } from '@angular/core';
import { EmploymnetService } from '../../services/employment/employment.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bolsas-del-potro',
  templateUrl: './bolsas-del-potro.component.html',
  styleUrls: ['./bolsas-del-potro.component.css']
})
export class BolsasDelPotroComponent implements OnInit {

  loading = true;
  loadingProfesionalPractice = true
  loadingSocialService = true

  nSocialService = 0;
  nProfessionalService = 0;
  constructor(
    private router: Router,
    private employmnetService: EmploymnetService
  ) {
    this.countSocialService()
    this.countProfessionalPractice()
  }

  ngOnInit(): void {
    this.loading = false
  }
  countProfessionalPractice() {
    this.loadingProfesionalPractice = true
    this.employmnetService.countProfessionalPratice()
      .subscribe(nProfP => {
        this.loadingProfesionalPractice = false
        this.nProfessionalService = nProfP

      },
        err => {
          this.loadingProfesionalPractice = false
          this.showSwalError(err)
        })
  }

  countSocialService() {
    this.loadingSocialService = true
    this.employmnetService.countSocialService()
      .subscribe(nSocialSrv => {
        this.loadingSocialService = false
        this.nSocialService = nSocialSrv
      },
        err => {
          this.loadingSocialService = false
          this.showSwalError(err)
        })
  }

  showSwalError(err) {
    swal({
      title: 'Ha ocurrido un error!!',
      text: 'Inténtelo de nuevo por favor.' + err,
      icon: 'error'
    });
  }

  showSocialService() {
    if (this.nSocialService === 0) {
      this.showNoInfo()
      return
    }
    this.router.navigate(['/profile/servicio-social'])
  }

  showProfessionalPratice() {
    if (this.nProfessionalService === 0) {
      this.showNoInfo()
      return
    }
    this.router.navigate(['/profile/practicas'])
  }
  showNoInfo() {
    return swal('Por el momento no contamos con vacantes...', 'Lamentamos el inconveniente.', 'info')
  }
}
