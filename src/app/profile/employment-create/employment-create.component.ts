import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { EmploymnetService } from '../../services/employment/employment.service';
import { Employment } from '../../models/employment/employment.model';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-employment-create',
  templateUrl: './employment-create.component.html',
  styleUrls: ['./employment-create.component.css']
})
export class EmploymentCreateComponent implements OnInit {
  loading: boolean = true;
  action: string = 'Actualizar';
  employment: Employment = {
    name: '',
    salary: '0',
    horary: 'Lunes a Viernes 8:00 A.M. - 5:00 P.M., Sábados 8:00 A.M. - 1:00 P.M.',
    workable_days: 'Lunes - Sábado',
    description: '',
    vacancy_numbers: 1,
    domicile: this.userService.getDomicile(),
    requeriments: '',
    dateCreate: new Date(),
    dateLimit: null,
    type: 'JOB_OFFER',
    state: true,
    total: 0
  };

  edit: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employmnetService: EmploymnetService,
    private userService: UserService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== 'new') {
        this.employmnetService.getEmployment(params['id'])
        .subscribe((empl: Employment) => {
          this.employment = empl;
          if (this.employment?.dateLimit) {
            let dateTemp = Date.parse(''+this.employment.dateLimit);
            let date = new Date(dateTemp);
            let day = '' + date.getDate();
            let month = '' + (date.getMonth() + 1);
            if (date.getDate()< 10) {
                day = '0' + day;
              }
              if (date.getMonth() + 1< 10) {
                month = '0' + month;
              }
              this.employment.dateLimit = `${date.getFullYear()}-${month}-${day}`;
          }
          
          this.loading = false;
        });
        this.edit = true;
      } else {
        this.action = 'Crear';
        this.edit = false;
        this.loading = false;
      }
    });
}

  ngOnInit(): void {

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
  create(employment: Employment) {
    this.showLoading();
      this.employmnetService.createEmployment(employment)
      .subscribe(empl => {
        swal('Creación exitosa!', 'El empleo ha sido creado con éxito.\n'+empl?.name, 'success');
        swal.stopLoading();
        swal.close();
      }, err => {
        swal.stopLoading();
        swal.close();
        this.showSwalError(err);
      });
  }

  persist(employment: Employment) {
    if (this.edit) {
      this.update(employment);
    } else {
      this.create(employment);
    }
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
        swal.stopLoading();
        swal.close();
        this.router.navigate(['profile/employments-manager']);
      }, err => {
        swal.stopLoading();
        swal.close();
        this.showSwalError(err);
      })
    }
  });

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
