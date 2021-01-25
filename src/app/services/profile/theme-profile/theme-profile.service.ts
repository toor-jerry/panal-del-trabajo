import { Injectable } from '@angular/core';
import { Theme } from "../../../models/model.index";


@Injectable({
  providedIn: 'root'
})
export class ThemeProfileService {

  themes: Theme[] = [];
  /* Theme custom or default */
  settings: Theme;

  constructor() {
    this.setThemes();
    this.settings = this.themes['dark'];
  }

  getDefaultTheme(): Theme {
    return this.settings;
  }

   getSettingsBody(): string {
     return this.settings.bg;
   }

   getColors(): string[] {
    return Object.keys(this.themes);
   }

  getThemes(): Theme[] {
    return this.themes;
  }

  /** Lather charge */

   loadSettingsPerfil() {

    this.setCustomTheme('body', 'bg-' + this.settings.bg, 'bg-container');
    this.setCustomTheme('navbarProfile', 'navbar-' + this.settings.navbar);
    this.setCustomTheme('navbarProfile', 'bg-' + this.settings.navbarBg);
    this.setCustomTheme('workArea', 'bg-' + this.settings.workArea);
    this.setCustomTheme('breadCrumb', 'bg-' + this.settings.breadCrumb);
   }

  setCustomTheme( idComponent: string, classThemeNew: string, classThemeOld: string = '' ) {
    if (!document?.getElementById(idComponent))
    return;
      const doc = document.getElementById(idComponent).classList;
      if (classThemeOld != '') {
        this.removeClass( idComponent, classThemeOld );
      }
      doc.add(classThemeNew);
  }

  getThemeSideBar(): string {
    return this.settings.sidebar;
  }

  setCustomThemeGroup( nameComponents: string, classThemeNew: string, classThemeOld: string = '' ) {    
    document.getElementsByName(nameComponents).forEach( item => {
      if(classThemeOld != '') {
        item.classList.remove(classThemeOld);
      }
        item.classList.add(classThemeNew);
    } );
  }

  removeClass( idComponent: string, classRemove: string) {
    const doc = document.getElementById(idComponent).classList;
    doc.remove(classRemove);
  }

  addClass( idComponent: string, classAdd: string) {
    const doc = document.getElementById(idComponent).classList;
    doc.add(classAdd);
  }

  setThemes() {
    this.themes['primary'] = {
      bg: 'primary',
      navbar: 'dark',
      navbarBg: 'dark',
      breadCrumb: 'info',
      workArea: 'light',
      sidebar: 'light'
    };
    this.themes['secondary'] = {
      bg: 'secondary',
      navbar: 'light',
      navbarBg: 'light',
      breadCrumb: 'info',
      workArea: 'light',
      sidebar: 'light'
    };
    this.themes['success'] = {
      bg: 'success',
      navbar: 'light',
      navbarBg: 'light',
      breadCrumb: 'info',
      workArea: 'light',
      sidebar: 'light'
    };
    this.themes['danger'] = {
      bg: 'danger',
      navbar: 'light',
      navbarBg: 'light',
      breadCrumb: 'info',
      workArea: 'light',
      sidebar: 'light'
    };
    this.themes['warning'] = {
      bg: 'warning',
      navbar: 'light',
      navbarBg: 'light',
      breadCrumb: 'info',
      workArea: 'light',
      sidebar: 'light'
    };
    this.themes['info'] = {
      bg: 'info',
      navbar: 'dark',
      navbarBg: 'dark',
      breadCrumb: 'custom-gray',
      workArea: 'light',
      sidebar: 'light'
    };
    this.themes['light'] = {
      bg: 'light',
      navbar: 'light',
      navbarBg: 'light',
      breadCrumb: 'info',
      workArea: 'light',
      sidebar: 'light'
    };
    this.themes['dark'] = {
      bg: 'dark',
      navbar: 'dark',
      navbarBg: 'dark',
      breadCrumb: '',
      workArea: 'warning',
      sidebar: ''
    };
    this.themes['white'] = {
      bg: 'white',
      navbar: 'light',
      navbarBg: 'light',
      breadCrumb: 'info',
      workArea: 'light',
      sidebar: 'light'
    };
  }
}
