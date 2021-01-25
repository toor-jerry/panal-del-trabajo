import { Routes, RouterModule } from '@angular/router';

const OTHER_SERVICES_ROUTES: Routes = [
  { path: '**', pathMatch: 'full', redirectTo: 'PageNotFound' }
];

export const OTHER_SERVICES_ROUTING = RouterModule.forChild(OTHER_SERVICES_ROUTES);
