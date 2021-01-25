import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from "@angular/cdk/drag-drop";

// Sockets

// Rutas
import { PERFIL_ROUTING } from './profile.routes';

// Pipes

// Modules
import { PipesModule } from '../pipes/pipes.module';

// Services
import { UploadFileService } from '../services/service.index';

// Components
import { SecuritySettingsComponent } from './security-settings/security-settings.component';
import { InformationSettingsComponent } from './information-settings/information-settings.component';
import { CustomSettingsComponent } from './custom-settings/custom-settings.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CustomProfileComponent } from './custom-profile/custom-profile.component';
import { BolsasDelPotroComponent } from './bolsas-del-potro/bolsas-del-potro.component';
import { ForosComponent } from './foros/foros.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SoporteTecnicoComponent } from './soporte-tecnico/soporte-tecnico.component';
import { MejorarCuentaComponent } from './mejorar-cuenta/mejorar-cuenta.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserCardComponent } from './user-card/user-card.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { OtherServicesComponent } from './other-services/other-services.component';


// Font Awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner, faSave, faTrash, faTrashAlt, faEdit, faCircle, faPlus, faSync, faTimesCircle, faArrowLeft, faLockOpen } from '@fortawesome/free-solid-svg-icons';
// import { faSync as farSync } from '@fortawesome/free-regular-svg-icons';
import {  } from '@fortawesome/free-brands-svg-icons';
import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './chat/chat.component';
import { ChatContactsComponent } from './chat/chat-contacts/chat-contacts.component';
import { EmploymentsManagerComponent } from './employments-manager/employments-manager.component';
import { EmploymentCreateComponent } from './employment-create/employment-create.component';
import { PostulationsComponent } from './postulations/postulations.component';
import { PostulationCardComponent } from './postulation-card/postulation-card.component';
import { CapitalizadoPipe } from '../pipes/capitalizado.pipe';
import { BolsasPotroServicioSocialCardComponent } from './bolsas-potro-servicio-social-card/bolsas-potro-servicio-social-card.component';
import { BolsasPotroPracticasCardComponent } from './bolsas-potro-practicas-card/bolsas-potro-practicas-card.component';
import { EmploymentCardComponent } from './employment-card/employment-card.component';
import { OffersManagerComponent } from './offers-manager/offers-manager.component';
import { ForoComponent } from './foro/foro.component';
import { ForoDashboardComponent } from './foro-dashboard/foro-dashboard.component';

@NgModule({
  declarations:
  [
    // ProfileComponent,
    ContactsComponent,
    CustomProfileComponent,
    BolsasDelPotroComponent,
    ForosComponent,
    RoomsComponent,
    SoporteTecnicoComponent,
    MejorarCuentaComponent,
    NotificacionesComponent,
    OfertasComponent,
    ContactCardComponent,
    HomeComponent,
    SecuritySettingsComponent,
    InformationSettingsComponent,
    CustomSettingsComponent,
    JobOffersComponent,
    UserManagerComponent,
    UsersComponent,
    UserComponent,
    UserCardComponent,
    MenuManagerComponent,
    OtherServicesComponent,
    MenuComponent,
    ChatComponent,
    ChatContactsComponent,
    EmploymentsManagerComponent,
    EmploymentCreateComponent,
    PostulationsComponent,
    PostulationCardComponent,
    BolsasPotroServicioSocialCardComponent,
    BolsasPotroPracticasCardComponent,
    EmploymentCardComponent,
    OffersManagerComponent,
    ForoComponent,
    ForoDashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    PERFIL_ROUTING,
    FontAwesomeModule,
    PipesModule
  ],
  exports: [
    PipesModule
  ],
  providers: [
    UploadFileService
  ]
})
export class ProfileModule {
  constructor(library: FaIconLibrary) {
    library.addIcons( faSpinner, faSave, faTrash, faTrashAlt, faEdit, faCircle, faPlus, faSync, faTimesCircle, faArrowLeft, faLockOpen);
  }
}
