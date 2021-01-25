import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/service.index';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  dark: boolean = true;

  constructor( private themeService: ThemeService ) {
    if ( this.themeService.getTheme().indexOf('dark') < 0 ) {
      this.dark = false;
    }
  }
  ngOnInit(): void {
  }

  changeTheme(): void {
    let theme: string = '';
    if ( this.dark ) {
      theme = 'light';
    } else {
      theme = 'default-dark';
    }

    this.themeService.setTheme( theme );

    this.dark = !this.dark;
  }
}
