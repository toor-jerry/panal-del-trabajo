export interface Settings {
    themeUrl: string;
    theme: string;
  }

export interface Theme {
  bg: string;
  navbar: string;
  navbarBg: string;
  workArea: string;
  breadCrumb: string;
  sidebar: string;
  custom?: boolean;
}