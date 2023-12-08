import { Routes } from '@angular/router';
import {TableComponent} from './table/table.component';
import {ContentComponent} from './content/content.component';
import {AuthComponent} from './auth/auth.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {authGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'content', pathMatch: 'full' },
  { path: 'table', component: TableComponent, canActivate: [authGuard] },
  { path: 'content', component: ContentComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: PageNotFoundComponent },
];
