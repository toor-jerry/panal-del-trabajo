import { Component, OnInit } from '@angular/core';
import { Employment } from '../../models/employment/employment.model';
import { PostulationService } from '../../services/postulation/postulation.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.css']
})
export class PostulationsComponent implements OnInit {

  postulations: Employment[] = [];
  terminoAnteriorBuscado: string = "";
  aut = localStorage.getItem('token') || false;
  total: number = 0;
  from: number = 0;
  nFilter: number = 1;
  filter: string = 'Todas mis postulaciones';

  loading = true;
  constructor(
    private postulationService: PostulationService
  ) { }

  ngOnInit(): void {
    this.loadData(this.nFilter);
  }

  loadData(type) {  
    switch(type) {
      case 1:
        this.loadPostulations()
        break;
      case 2:
        this.loadEmploymentsPostulations()
        break
      case 3:
        this.loadEmploymentsSocialService()
        break
      case 4:
        this.loadEmploymentsProfessionalPractice()
      break
    }
  }
  
  loadPostulations() {
    this.loading = true
    this.postulationService.getPostulations(this.from).subscribe((res: any) => {

      this.loading = false;
      this.postulations = res.postulations;
      this.total = res.total;
    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  loadEmploymentsPostulations() {
    this.loading = true
    this.postulationService.getPostulationsByEmployments(this.from).subscribe((res: any) => {

      this.loading = false;
      this.postulations = res.postulations;
      this.total = res.total;
    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  loadEmploymentsSocialService() {
    this.loading = true
    this.postulationService.getPostulationsBySocialService(this.from).subscribe((res: any) => {

      this.loading = false;
      this.postulations = res.postulations;
      this.total = res.total;
    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  loadEmploymentsProfessionalPractice() {
    this.loading = true
    this.postulationService.getPostulationsByProfessionalPractiece(this.from).subscribe((res: any) => {

      this.loading = false;
      this.postulations = res.postulations;
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
    this.loadPostulations();
  }

  
  changeFilter(filter: string, type: number) {
    if (type === this.nFilter) {
      return;
    }
    this.filter = filter;
    this.from = 0;
    this.nFilter = type;
    this.postulations = [];
    this.total = 0
    this.loadData(type)
  }

}