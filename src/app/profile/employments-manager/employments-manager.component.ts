import { Employment } from './../../models/employment/employment.model';
import { Component, OnInit } from '@angular/core';
import { EmploymnetService } from '../../services/employment/employment.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-employments-manager',
  templateUrl: './employments-manager.component.html',
  styleUrls: ['./employments-manager.component.css']
})
export class EmploymentsManagerComponent implements OnInit {

  employments: Employment[] = [];
  total: number;
  loading: boolean = false;
  from: number = 0;
  pages: number = 1;
  page: number = 1;
  filter: string = 'Empleos';
  nFilter: number = 1;
  route = 'enterprise/all';

  constructor(
    private employmnetService: EmploymnetService
  ) { }

  getEmployments() {
    this.loading = true;
    this.employmnetService.getEmploymentsByEnterpriseDB(this.from, this.route)
      .subscribe((res: any) => {
        this.employments = res.employments;
        this.total = res.total;
        this.pages = Math.ceil(this.total / 10);
        if (this.pages === 0) {
          this.pages = 1;
        }
        this.loading = false;
      }, err => {
        this.loading = false;
        this.showSwalError(err);
      })
  }

  ngOnInit(): void {
    this.getEmployments();
  }


  update(employment: Employment): void {
    this.showLoading();
    this.employmnetService.updateEmployment(employment)
      .subscribe(empl => {
        swal('Actualización exitosa!', 'El empleo ha sido actualizado con éxito.\n'+empl?.name, 'success');
        swal.stopLoading();
        swal.close();
      }, err => {
        swal.stopLoading();
        swal.close();
        this.showSwalError(err);
      });
  }

  delete(id: string): void {
    swal({
      title: '¿Está segur@?',
      text: `Está opción eliminará el menú de forma permanente!!`,
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
    this.showLoading();

    this.employmnetService.deleteEmployment(id)
      .subscribe(() => {
        this.getEmployments();
        swal.stopLoading();
        swal.close();
      }, err => {
        swal.stopLoading();
        swal.close();
        this.showSwalError(err);
      })
    }
  });

}

changeFilter(type: number) {
  if (type === this.nFilter) {
    return;
  }
  switch(type) {
    case 1:
      this.resetEmployments('Empleos', 'enterprise/all', type);
      break;
    case 2:
      this.resetEmployments('Prácticas profesionales','social/service', type);
      break;
    case 3:
      this.resetEmployments('Servicio social', 'profesional/practices', type)
      break;
  }
}
resetEmployments(filter: string, route: string, type: number) {
  this.filter = filter;
  this.route = route;
  this.from = 0;
  this.nFilter = type;
  this.getEmployments();
}
changePagination( page: number ): void {
  const from = this.from + page;

  if (from >= this.total) {
    return;
  }

  if (from < 0) {
    return;
  }
  if (page > 0) {
    this.page += 1;
  }else {
    this.page -=1;
  }
  this.from += page;
  this.getEmployments();
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
