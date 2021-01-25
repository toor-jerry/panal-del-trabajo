import { Component, Input, OnInit } from '@angular/core';
import { Employment } from '../../models/employment/employment.model';
import { PostulationService } from '../../services/postulation/postulation.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-employment-card',
  templateUrl: './employment-card.component.html',
  styleUrls: ['./employment-card.component.css']
})
export class EmploymentCardComponent implements OnInit {

  @Input() employment: any = {};
  @Input() enterprise: any = {};
  @Input() index: string;
  @Input() postulation = false;

  token: string;

  constructor(
    private router: Router,
    private postulationService: PostulationService
    ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
  }
  getEmpleo(): void{
     this.router.navigate(['/profile/employment', this.index]);
  }

  addPostulation(employment: Employment) {
    this.postulationService.createPostulation(employment._id)
      .subscribe(() => {
        swal('Postulación exitosa!', employment.name, 'success')
        this.postulation = true
      },err => {
        swal('Un error ha ocurrido!!', 'No se pudo realizar la postulación a: ' + employment.name + '\n' + err, 'error')
      })
  }

}
