import { Component, OnInit} from '@angular/core';
import { ThemeProfileService } from '../../services/service.index';
import { Theme } from "../../models/model.index";

@Component({
  selector: 'app-custom-settings',
  templateUrl: './custom-settings.component.html',
  styleUrls: ['./custom-settings.component.css']
})
export class CustomSettingsComponent implements OnInit {

themes: Theme[];
customTheme: Theme;
colors: string[];

themeDefaultSelected='';

  constructor( private _themeProfileService: ThemeProfileService ) {
    this.themes = this._themeProfileService.getThemes();
    this.colors = this._themeProfileService.getColors();
    this.customTheme = this._themeProfileService.getDefaultTheme();
    if(!this.customTheme.custom) {
      this.themeDefaultSelected = this.customTheme.bg;
    }
  }
  
  ngOnInit(): void {
  }
  changeTheme( theme: string, reset: boolean  = true ) {
    if ( theme === this.themeDefaultSelected ){
      return;
    }
    
    this.themeDefaultSelected = theme;
    
    let themeTemp: Theme = this.themes[theme];

    this._themeProfileService.setCustomTheme('body', 'bg-' + themeTemp.bg, 'bg-' + this.customTheme.bg);
    this._themeProfileService.setCustomTheme('navbarProfile', 'bg-' + themeTemp.navbarBg, 'bg-'+this.customTheme.navbarBg);
    this._themeProfileService.setCustomTheme('navbarProfile', 'navbar-' + themeTemp.navbar, 'navbar-'+this.customTheme.navbar);
    this._themeProfileService.setCustomThemeGroup('sidBarItem', 'bg-' + themeTemp.sidebar, 'bg-'+this.customTheme.sidebar);
    this._themeProfileService.setCustomTheme('workArea', 'bg-' + themeTemp.workArea, 'bg-' + this.customTheme.workArea);
    this._themeProfileService.setCustomTheme('breadCrumb', 'bg-' + themeTemp.breadCrumb, 'bg-' + this.customTheme.breadCrumb);

    this.customTheme = themeTemp;
    this.customTheme.custom = false;
  }

  changeThemeNavbar( theme: string, reset: boolean  = true ) {
    if ( theme != this.customTheme.navbarBg ){
      this._themeProfileService.setCustomTheme('navbarProfile', 'bg-' + theme, 'bg-'+this.customTheme.navbarBg);
      this.customTheme.navbarBg = theme;
      if(reset) {
        this.resetTheme();
      }
    }
  }

  changeStyleThemeNavbar( style: string, reset: boolean = true ) {
    if ( style != this.customTheme.navbar ){
      this._themeProfileService.setCustomTheme('navbarProfile', 'navbar-' + style, 'navbar-'+this.customTheme.navbar);
      this.customTheme.navbar = style;
      if(reset) {
        this.resetTheme();
      }
    }
  }

  changeThemeSidebar( theme: string, reset: boolean  = true ) {
    if ( theme != this.customTheme.sidebar ){
      if(theme =='white' || theme =='light') {
        theme = '';
      }
      this._themeProfileService.setCustomThemeGroup('sidBarItem', 'bg-' + theme, 'bg-'+this.customTheme.sidebar);
      this.customTheme.sidebar = theme;
      if(reset) {
        this.resetTheme();
      }
    }
  }
  
  changeWorkArea( theme: string, reset: boolean  = true ) {
    if ( theme != this.customTheme.workArea ){
      this._themeProfileService.setCustomTheme('workArea', 'bg-' + theme, 'bg-' + this.customTheme.workArea);
      this.customTheme.workArea = theme;
      if(reset) {
        this.resetTheme();
      }
    }
  }

  changeBody( theme: string, reset: boolean  = true ) {
    if ( theme != this.customTheme.bg ){
      this._themeProfileService.setCustomTheme('body', 'bg-' + theme, 'bg-' + this.customTheme.bg);
      this.customTheme.bg = theme;
      if(reset) {
        this.resetTheme();
      }
    }
  }

  changeBreAdcrumb( theme: string, reset: boolean  = true ) {
    if ( theme != this.customTheme.breadCrumb ){
      this._themeProfileService.setCustomTheme('breadCrumb', 'bg-' + theme, 'bg-' + this.customTheme.breadCrumb);
      this.customTheme.breadCrumb = theme;
      if(reset) {
        this.resetTheme();
      }
    }
  }

  resetTheme() {
    this.themeDefaultSelected = '';
    this.customTheme.custom = true;
  }
}
