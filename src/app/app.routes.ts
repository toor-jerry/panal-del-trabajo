import { RouterModule, Routes } from '@angular/router';

import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { PagesComponent } from './pages/pages.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard, CheckTokenGuard } from './services/service.index';

const APP_ROUTES: Routes = [
    /* { path: 'chat', component: ChatComponent, outlet: '_chat' }, */
    /* { path: '', component: PagesComponent }, */
    {
        path: '',
        component: PagesComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [ AuthGuard, CheckTokenGuard ],
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
    },
    { path: '**', component: NoPageFoundComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true, relativeLinkResolution: 'legacy' });
