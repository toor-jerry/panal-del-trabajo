import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/service.index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private _theme: ThemeService ) {
    this._theme.loadSettings();
  }

  ngOnInit(): void {
  }

}
