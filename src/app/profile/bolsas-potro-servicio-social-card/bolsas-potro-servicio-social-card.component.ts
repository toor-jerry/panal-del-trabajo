import { Component, OnInit } from '@angular/core';
import { EmploymnetService } from '../../services/employment/employment.service';
import { Employment } from '../../models/employment/employment.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-bolsas-potro-servicio-social-card',
  templateUrl: './bolsas-potro-servicio-social-card.component.html',
  styleUrls: ['./bolsas-potro-servicio-social-card.component.css']
})
export class BolsasPotroServicioSocialCardComponent implements OnInit {

  employments: Employment[] = [];
  terminoAnteriorBuscado: string = "";
  total: number = 0;
  from: number = 0;
  totalSearch = 0;
  searching = false;
  loading = true;
  constructor(
    private employmnetService: EmploymnetService,
  ) { }

  ngOnInit(): void {
    this.loadProfessionalPracticeService()

  }
  
  
  loadProfessionalPracticeService() {
    this.employmnetService.getOnlySocietyServiceDB(this.from).subscribe((res: any) => {
      this.loading = false;
      this.employments = res.employments;
      
      this.total = res.total;
    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  changePagination( page: number ): void {
    const from = this.from + page;

    if (from >= this.total) {
      return;
    }

    if (from < 0) {
      return;
    }

    this.from += page;
    this.loadProfessionalPracticeService();
  }

  searchEmployment( term: string ): void {
    term = term.trim();

    this.loading = true;
    if (term === '' || term === '+' || term === '*' || term === '.') {
      this.loadProfessionalPracticeService()
      this.searching = false;
      this.totalSearch = 0;
      return;
    }

    this.searchSocialService(term)
  }

  searchSocialService(term: string) {
    this.searching = true;
    this.employmnetService.searchSocietyService(term)
    .subscribe( (res: any) => {

      this.loading = false;
      this.totalSearch = res.total;
      this.employments = res.employments;

    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }
  
}
