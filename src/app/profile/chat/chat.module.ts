import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routes
import { CHAT_ROUTING } from './chat.routes';

// Services
import { ChatService } from '../../services/service.index';
import { MessagesComponent } from './messages/messages.component';

// Pipes
import { PipesModule } from '../../pipes/pipes.module';

// Font Awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner, faSearch, faEllipsisV, faTrash, faTrashAlt, faFileArchive, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { CreateRoomComponent } from './create-room/create-room.component';


@NgModule({
  declarations: [
    MessagesComponent,
    CreateRoomComponent
  ],
  imports: [
    CommonModule,
    CHAT_ROUTING,
    FontAwesomeModule,
    PipesModule
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule {
  constructor(library: FaIconLibrary) {
    library.addIcons( faSpinner, faSearch, faEllipsisV, faTrashAlt, faTrash, faFileArchive, faArrowCircleUp );
  }
}
