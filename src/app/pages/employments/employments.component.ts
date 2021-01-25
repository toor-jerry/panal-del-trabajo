import { Component, OnInit } from '@angular/core';
import { EmploymnetService, NotificationService } from '../../services/service.index';
import { Employment } from '../../models/model.index';
import swal from 'sweetalert';
import { PostulationService } from '../../services/postulation/postulation.service';
import { UserService } from '../../services/user/user.service';
declare const $: any;

@Component({
  selector: 'app-employments',
  templateUrl: './employments.component.html',
  styleUrls: ['./employments.component.css']
})
export class EmpleosComponent implements OnInit {

  employments: Employment[] = [];
  postulations: Employment[] = [];
  terminoAnteriorBuscado: string = "";
  total: number = 0;
  from: number = 0;
  nFilter: number = 1;
  filter: string = 'Todo';
  totalSearch = 0;
  searching = false;
  auth = false;
  loading = true;
  showInputSearch = true;
  constructor(
    private employmnetService: EmploymnetService,
    private notificationService: NotificationService,
    private postulationService: PostulationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.userService.getStatusAuth()) {
      this.auth = true;
    } else {
      this.nFilter = 1;
      this.filter = 'Empleos';
    }
    this.loadEmployments();
    this.notificationService.newEmployment()
      .subscribe((employment: Employment) => this.employments.unshift(employment));
  }

  loadEmployments(): void {
    this.loading = true;
    switch (this.nFilter) {
      case 1:
        this.loadAll()
        break;
      case 2:
          this.loadOnlyEmployments()
        break
      case 3:
        this.loadOnlySocialService()
      break
      case 4:
        this.loadProfessionalPracticeService()
      break
      case 5:
        this.loadPostulations()
      break;
      default:
        this.employments = [];
        this.postulations = []
        this.loading = false
        break;
    
    }
  }

  loadAll() {
    this.employmnetService.getEmploymentsDB(this.from).subscribe((res: any) => {
      this.loading = false;
      this.postulations = res.postulations;
      this.employments = res.employments;
      
      this.total = res.total;
    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  loadOnlyEmployments() {
    this.employmnetService.getOnlyEmploymentsDB(this.from).subscribe((res: any) => {
      this.loading = false;
      this.postulations = [];
      this.employments = res.employments;
      
      this.total = res.total;
    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  loadOnlySocialService() {
    this.employmnetService.getOnlySocietyServiceDB(this.from).subscribe((res: any) => {
      this.loading = false;
      this.postulations = [];
      this.employments = res.employments;
      
      this.total = res.total;
    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }


  loadProfessionalPracticeService() {
    this.employmnetService.getOnlyProfessionalPracticeDB(this.from).subscribe((res: any) => {
      this.loading = false;
      this.postulations = [];
      this.employments = res.employments;
      
      this.total = res.total;
    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  loadPostulations() {
    this.postulationService.getPostulations(this.from).subscribe((res: any) => {

      this.loading = false;
      this.postulations = res.postulations;
      this.employments = [];
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
    this.loadEmployments();
  }

  searchEmployment( term: string ): void {
    term = term.trim();

    this.loading = true;
    if (term === '' || term === '+' || term === '*' || term === '.') {
      this.loadEmployments();
      this.searching = false;
      this.totalSearch = 0;
      return;
    }

    switch (this.nFilter) {
      case 1:
        this.searchAllEmployments(term)
        break;
      case 2:
        this.searchOnlyEmployments(term)
        break;
      case 3:
      this.searchSocialService(term)
      break;
      case 5:
      this.searchProfessionalPractice(term)
      break;
    }
  }

  searchAllEmployments(term: string) {
    this.searching = true;

    this.employmnetService.searchEmployment(term)
    .subscribe( (res: any) => {
    
      this.loading = false;
      this.totalSearch = res.total;
      this.employments = res.employments
      this.postulations = []

    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  searchOnlyEmployments(term: string) {
    this.searching = true;
    this.employmnetService.searchOnlyEmployments(term)
    .subscribe( (res: any) => {

      this.loading = false;
      this.totalSearch = res.total;
      this.postulations = []
      this.employments = res.employments;

    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  searchSocialService(term: string) {
    this.searching = true;
    this.employmnetService.searchSocietyService(term)
    .subscribe( (res: any) => {

      this.loading = false;
      this.totalSearch = res.total;
      this.postulations = []
      this.employments = res.employments;

    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }
  searchProfessionalPractice(term: string) {
    this.searching = true;
    this.employmnetService.searchProfessionalPractices(term)
    .subscribe( (res: any) => {

      this.loading = false;
      this.totalSearch = res.total;
      this.postulations = []
      this.employments = res.employments;

    }, err => {
      swal('Un error ha ocurrido!!', err, 'error')
      this.loading = false
    });
  }

  changeFilter(type: number) {
    if (type === this.nFilter) {
      return;
    }
    if (type === 5) {
      this.showInputSearch = false
    } else {
      this.showInputSearch = true
    }
    switch(type) {
      case 1:
        this.resetSearchUsers('Todo', type);
        break;
      case 2:
        this.resetSearchUsers('Empleos', type);
        break;
      case 3:
        this.resetSearchUsers('Servicio social', type);
      break;
      case 4:
        this.resetSearchUsers('Prácticas profesionales', type);
      break;
      case 5:
        this.resetSearchUsers('Postulaciones', type);
      break;
    }
  }

  resetSearchUsers(filter: string, type: number) {
    this.filter = filter;
    // this.route = route;
    this.from = 0;
    this.total = 0;
    this.nFilter = type;
    this.employments = []
    this.postulations = []
    $('#searchInputEmplyments').val('')
    this.totalSearch = 0
    this.searching = false
    this.loadEmployments()
  }

}
