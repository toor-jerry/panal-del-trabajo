import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { CreateRoomComponent } from './create-room/create-room.component';

const CHAT_ROUTES: Routes = [
  { path: 'conversation/:id', component: MessagesComponent, data: { title: 'Chat' } },
  {
    path: 'conversation/new/:id',
    component: CreateRoomComponent,
    data: { title: 'Chat' }
  },
  { path: '**', pathMatch: 'full', redirectTo: 'PageNotFound', data: { title: 'Page Not Found' } }
];

export const CHAT_ROUTING = RouterModule.forChild(CHAT_ROUTES);
