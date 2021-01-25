import { Injectable, Inject } from '@angular/core';

import { Settings } from '../../../models/model.index';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  settingsTheme: Settings = {
    themeUrl: 'assets/css/themes/theme-default-dark.css',
    theme: 'default-dark'
  };

  constructor() { }

  saveSettings = () => localStorage.setItem( 'settings', JSON.stringify( this.settingsTheme ) );
  
  loadSettings = () => {
    if ( localStorage.getItem('settings') ) {
      this.settingsTheme = JSON.parse( localStorage.getItem('settings') );
    }
      this.setTheme( this.settingsTheme.theme );
  }
  
  restoreSettings = ( themeProfile: string ) => {
    
    const THEME =  `bg-${ themeProfile }`;
    document.getElementById('body').classList.remove(THEME);
    document.getElementById('body').classList.add('bg-container');
  }

  setTheme = ( theme: string ) => {
    const URL =  `assets/css/themes/theme-${ theme }.css`;
    document.getElementById('theme-pages').setAttribute('href', URL);

    this.settingsTheme.themeUrl = URL;
    this.settingsTheme.theme = theme;

    if ( theme.indexOf('dark') < 0) {
      this.saveSettings();
    } else if ( localStorage.getItem('settings') ) {
      localStorage.removeItem('settings');
    }
  }

  getTheme = (): string => this.settingsTheme.theme;

}