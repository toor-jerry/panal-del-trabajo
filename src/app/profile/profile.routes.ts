import { BolsasPotroPracticasCardComponent } from './bolsas-potro-practicas-card/bolsas-potro-practicas-card.component';
import { EmploymentCreateComponent } from './employment-create/employment-create.component';
import { Routes, RouterModule } from '@angular/router';
// import { ProfileComponent } from './profile.component';
import { BolsasDelPotroComponent } from "./bolsas-del-potro/bolsas-del-potro.component";
import { ChatComponent } from './chat/chat.component';

// Guards
import {
  AdminGuard,
  EnterpriseRoleGuard,
  UserPlatinoGuard
} from '../services/service.index';

import { CustomProfileComponent } from './custom-profile/custom-profile.component';
import { EmpleosComponent } from '../pages/employments/employments.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ForosComponent } from './foros/foros.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { SoporteTecnicoComponent } from './soporte-tecnico/soporte-tecnico.component';
import { HomeComponent } from './home/home.component';
import { TermsConditionsComponent } from '../pages/terms-conditions/terms-conditions.component';
import { DownloadsComponent } from '../pages/downloads/downloads.component';
import { FQAComponent } from '../pages/fqa/fqa.component';
import { NoPageFoundComponent } from '../no-page-found/no-page-found.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { EmploymentComponent } from '../pages/employment/employment.component';
import { OtherServicesComponent } from './other-services/other-services.component';
import { MenuComponent } from './menu/menu.component';
import { UserPrivilegesGuard } from '../services/guards/user-privileges.guard';
import { EmploymentsManagerComponent } from './employments-manager/employments-manager.component';
import { PostulationsComponent } from './postulations/postulations.component';
import { BolsasPotroServicioSocialCardComponent } from './bolsas-potro-servicio-social-card/bolsas-potro-servicio-social-card.component';
import { OffersManagerComponent } from './offers-manager/offers-manager.component';
import { ForoComponent } from './foro/foro.component';
import { ForoDashboardComponent } from './foro-dashboard/foro-dashboard.component';




// {
//   path: 'profile', component: ProfileComponent,
//   canActivate: [ AuthGuard ],
//     children: [
const PERFIL_ROUTES: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'descargas', component: DownloadsComponent, data: { title: 'Descargas' }},
  { path: 'bolsa-trabajo', component: EmpleosComponent, data: { title: 'Bolsa de Trabajo' } },
  { path: 'postulations', component: PostulationsComponent, data: { title: 'Mis postulaciones' } },
  { path: 'employment/:id', component: EmploymentComponent, data: { after: [{title: 'Bolsa de Trabajo', rute: 'bolsa-trabajo'}], title: 'Empleo' } },
  { path: 'employment-crud/:id', component: EmploymentCreateComponent, data: { title: 'Empleo' } },
  { path: 'notificaciones', component: NotificacionesComponent, data: { title: 'Notificiones' } },
  { path: 'contacts', component: ContactsComponent, data: { title: 'Contactos' } },
  {
    path: 'foros',
    canActivate: [ UserPrivilegesGuard ],
    component: ForosComponent,
    data: { title: 'Foros' }
  },
  {
    path: 'admin-foro/:id',
    canActivate: [ UserPrivilegesGuard ],
    component: ForoComponent,
    data: { after: [{title: 'Foros', rute: 'foros'}], title: 'Foro' } 
  },
  {
    path: 'foro/:id',
    canActivate: [ UserPrivilegesGuard ],
    component: ForoDashboardComponent,
    data: { after: [{title: 'Foros', rute: 'foros'}], title: 'Foro' } 
  },
  {
    path: 'otros-servicios',
    component: OtherServicesComponent,
    canActivate: [ UserPrivilegesGuard ],
    loadChildren: () => import('./other-services/other-services.module').then(m => m.OtherServicesModule),
    data: { title: 'Otros servicios' }
  },
  { path: 'ofertas', component: OfertasComponent, data: { title: 'Ofertas' } },
  {
    path: 'soporte-tecnico',
    canActivate: [ UserPrivilegesGuard ],
    component: SoporteTecnicoComponent,
    data: { title: 'Soporte técnico' }
  },
  { path: 'setting', component: CustomProfileComponent, data: { title: 'Configuración' } },
  { path: 'setting/:tema', component: CustomProfileComponent, data: { title: 'Tema' } },
  { path: 'groups', component: RoomsComponent, data: { title: 'Grupos' } },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [ UserPrivilegesGuard ],
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
    data: { title: 'Chat' }
  },
  {
    path: 'bolsas-del-potro',
    canActivate: [ UserPlatinoGuard ],
    component: BolsasDelPotroComponent,
    data: { title: 'Las bolsas del potro' }
  },
  { 
    path: 'servicio-social',
    component: BolsasPotroServicioSocialCardComponent,
    data: { after: [{title: 'Las bolsas del potro',rute: 'bolsas-del-potro'}], title: 'Servicio Social' } },
    { 
      path: 'practicas',
      component: BolsasPotroPracticasCardComponent,
      data: { after: [{title: 'Las bolsas del potro',rute: 'bolsas-del-potro'}], title: 'Prácticas profesionales' } },
  { path: 'terminos&condiciones', component: TermsConditionsComponent, data: { title: 'Términos y condiciones de uso' } },
  { path: 'configuracion/terminos&condiciones', component: TermsConditionsComponent, data: { title: 'Términos y condiciones de uso' } },
  { path: 'fqa', component: FQAComponent, data: { title: 'Preguntas y respuestas' } },
  {
    path: 'job-offers',
    canActivate: [ EnterpriseRoleGuard ],
    component: JobOffersComponent,
    data: { title: 'Ofertas de trabajo' }
  },
  {
    path: 'employments-manager',
    canActivate: [ EnterpriseRoleGuard ],
    component: EmploymentsManagerComponent,
    data: { title: 'Administrador de empleos' }
  },
  {
    path: 'offers-manager',
    canActivate: [ AdminGuard ],
    component: OffersManagerComponent,
    data: { title: 'Administrador de ofertas' }
  },
  {
    path: 'manager-users',
    canActivate: [ AdminGuard ],
    component: UserManagerComponent,
    data: { title: 'Administrador de usuarios' }
  },
  {
    path: 'manager-menu',
    canActivate: [ AdminGuard ],
    component: MenuManagerComponent,
    data: { title: 'Administrador de menus' }
  },
  {
    path: 'menu/:id',
    canActivate: [ AdminGuard ],
    component: MenuComponent,
    data: { title: 'Menú' }
  },
  { path: 'users', canActivate: [ UserPrivilegesGuard ], component: UsersComponent, data: { title: 'Usuarios' } },
  { path: 'user/:id', component: UserComponent, data: { title: 'Usuario' } },
  { path: 'PageNotFound', component: NoPageFoundComponent, data: { title: 'Page Not Found' } },
  { path: '**', pathMatch: 'full', redirectTo: 'PageNotFound', data: { title: 'Page Not Found' } }
];

export const PERFIL_ROUTING = RouterModule.forChild(PERFIL_ROUTES);
