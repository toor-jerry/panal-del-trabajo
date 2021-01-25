import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AccountTypeComponent } from './account-type/account-type.component';
import { ContactComponent } from './contact/contact.component';
import { PagesComponent } from './pages.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { HomeComponent } from './home/home.component';
import { EmploymentComponent } from './employment/employment.component';
import { EmpleosComponent } from './employments/employments.component';
import { FQAComponent } from './fqa/fqa.component';
import { SignUpComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const PAGES_ROUTES: Routes = [
    {
        path: '', component: PagesComponent,
        children:
        [
            { path: 'about', component: AboutComponent, data: { title: 'Acerca de' }},
            { path: 'contact', component: ContactComponent, data: { title: 'Contacto' }},
            { path: 'descargas', component: DownloadsComponent, data: { title: 'Descargas' }},
            { path: 'home', component: HomeComponent, data: { title: 'Home' }},
            { path: 'employment/:id', component: EmploymentComponent, data: { title: 'Empleo' } },
            { path: 'empleos', component: EmpleosComponent, data: { title: 'Empleos' } },
            { path: 'fqa', component: FQAComponent, data: { title: 'Preguntas y respuestas' } },
            { path: 'signup', component: AccountTypeComponent, data: { title: 'Registro' } },
            { path: 'signup/premium', component: SignUpComponent, data: { title: 'Registro | Premium' } },
            { path: 'signup/platino', component: SignUpComponent, data: { title: 'Registro | Platino' } },
            { path: 'signup/enterprise', component: SignUpComponent, data: { title: 'Registro | Enterprise' } },
            { path: 'home/forgot_password', component: ForgotPasswordComponent, data: { title: 'Recuperar cuenta' }},
            { path: 'terminos&condiciones', component: TermsConditionsComponent, data: { title: 'Términos y condiciones de uso' }},
            { path: 'home/terminos&condiciones', component: TermsConditionsComponent, data: { title: 'Términos y condiciones de uso' }},
            { path: 'home/recuperar_cuenta/terminos&condiciones', component: TermsConditionsComponent, data: { title: 'Términos y condiciones de uso' }},
            { path: '', pathMatch: 'full', redirectTo: 'home' }
        ]
    },
];

export const PAGES_ROUTING = RouterModule.forRoot(PAGES_ROUTES, { relativeLinkResolution: 'legacy' });
