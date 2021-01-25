import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmploymnetService } from "../../services/service.index";
import { Employment } from '../../models/model.index';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {

employment: Employment;
token: string;
auth = localStorage.getItem('token') || false;
  constructor( private _activatedRoute: ActivatedRoute,
               private employmnetService: EmploymnetService,
               private _router: Router ) {
    this.token = localStorage.getItem('token');

    this._activatedRoute.params.subscribe( params =>{
      this.employmnetService.getEmployment( params['id'] ).subscribe((res: Employment) => {
        this.employment = res;
      })
    });
}

  ngOnInit(): void {
  }
  regresar(){

    history.back()
  }
}
