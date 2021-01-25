import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Routes
import { PAGES_ROUTING } from "./pages.routes";

// Services
import { UserService } from '../services/service.index';

// Components
import { AboutComponent } from './about/about.component';
import { AccountTypeComponent } from './account-type/account-type.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { NoPageFoundComponent } from '../no-page-found/no-page-found.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { EmploymentComponent } from './employment/employment.component';
import { EmploymentCardComponent } from './employment-card/employment-card.component';
import { EmpleosComponent } from './employments/employments.component';
import { ContactComponent } from './contact/contact.component';
import { FQAComponent } from './fqa/fqa.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { SignUpComponent } from './signup/signup.component';
import { FormLoginComponent } from './form-login/form-login.component';

// Modules
import { PipesModule } from './../pipes/pipes.module';

// Font Awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


@NgModule({
    declarations: [
        NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    AccountTypeComponent,
    TermsConditionsComponent,
    ForgotPasswordComponent,
    FQAComponent,
    ContactComponent,
    FormLoginComponent,
    EmpleosComponent,
    EmploymentCardComponent,
    EmploymentComponent,
    DownloadsComponent,
    NoPageFoundComponent,
    PagesComponent,
    SignUpComponent
],
imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PAGES_ROUTING,
    PipesModule,
    FontAwesomeModule
  ],
exports:
[
    NavbarComponent,
    TermsConditionsComponent,
    FQAComponent,
    PipesModule
],
providers: [
    UserService
]

})

export class PagesModule {
    constructor(library: FaIconLibrary) {
        library.addIcons( faSpinner );
      }
}
