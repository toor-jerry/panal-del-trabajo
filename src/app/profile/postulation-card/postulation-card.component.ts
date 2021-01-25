import { Component, Input, OnInit } from '@angular/core';
import { PostulationService } from '../../services/postulation/postulation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postulation-card',
  templateUrl: './postulation-card.component.html',
  styleUrls: ['./postulation-card.component.css']
})
export class PostulationCardComponent implements OnInit {

  @Input() employment: any = {};
  @Input() enterprise: any = {};
  @Input() index: string;
  @Input() postulation = false;
  auth = (localStorage.getItem('token')?.length > 5) ? true : false;

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

}
