import { Component, OnInit } from '@angular/core';
import { Employment } from '../../models/model.index';
import { EmploymnetService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {

  employments: Employment[] = [];
  loading: boolean = false;
  total: number = 0;
  from: number = 0;
  page: number = 0;
  limit: number = 10;

  constructor( private employmnetService: EmploymnetService ) { }

  ngOnInit(): void {
    this.loadEmployments();
  }

  loadEmployments(): void {
    this.loading = true;
    this.employmnetService.getEmploymentsByEnterpriseDB(this.from).subscribe((res: any) => {
      this.loading = false;
      this.employments = res.employments;
      this.total = res.total;
    });
  }

  changePagination( fromPage: number, page: number ): void {

    let from = this.from + fromPage;

    if (from >= this.total) {
      return;
    }

    if (from < 0) {
      return;
    }

    this.from += fromPage;
    this.page += page;
    this.loadEmployments();

  }

  delete( employment: Employment ): void {
    
    swal({
      title: '¿Está segur@?',
      text: 'Está opción eliminará el empleo "' + employment.name + '"',
      icon: 'warning',
      buttons: ['Cancelar', 'De acuerdo'],
      dangerMode: true
    })
    .then( res => {
      if (res) {
        this.employmnetService.deleteEmployment(employment._id).subscribe(res => {
          this.loadEmployments();
        });
      }
    });
  }

}
