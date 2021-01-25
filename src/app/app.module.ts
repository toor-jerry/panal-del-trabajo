import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

// Socket io
// import { SocketIoModule } from "ngx-socket-io";
// import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { SERVER_URL } from './config/config';
// const config: SocketIoConfig = { url: SERVER_URL, options: {transports: ['polling', 'websocket']}path: '/SomeUniqueEndpoint/socket.io' };
// const config: SocketIoConfig = { url: SERVER_URL, options: {transports: ['websocket'], allowUpgrades : true} };

// Peticiones HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Language
import { registerLocaleData } from "@angular/common";
import localEs_MX from "@angular/common/locales/es-MX";
registerLocaleData(localEs_MX);

// Routes
import { APP_ROUTING } from './app.routes';

// Interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';

// Modules
import { PagesModule } from './pages/pages.module';
import { PipesModule } from './pipes/pipes.module';

// Services


// Components
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './profile/sidebar/sidebar.component';
import { BreadcrumbComponent } from './profile/breadcrumb/breadcrumb.component';
import { ProfileNavbarComponent } from './profile/profile-navbar/profile-navbar.component';
import { ModalUploadComponent } from './profile/modal-upload/modal-upload.component';

// Font Awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner, faSearch, fas, faCheckCircle, faUserFriends, faUsersCog, faSignInAlt, faMinus} from '@fortawesome/free-solid-svg-icons';
import { ModalUploadFileComponent } from './profile/modal-upload-file/modal-upload-file.component';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ModalUploadComponent,
    ModalUploadFileComponent,
    SidebarComponent,
    BreadcrumbComponent,
    ProfileNavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    // SocketIoModule,
    // SocketIoModule.forRoot(config),
    APP_ROUTING,
    PagesModule,
    FontAwesomeModule,
    PipesModule
    // ProfileModule <- se carga dinámica con lazy-load
  ],
  exports: [
    PipesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID, /* Idioma por defecto de la aplicacion */
      useValue: 'es-MX'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons( faSpinner, faSearch, faWhatsapp,faCheckCircle, faUserFriends, faUsersCog, faSignInAlt,faMinus);
    
  }
}
