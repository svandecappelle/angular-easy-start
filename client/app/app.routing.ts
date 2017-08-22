import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/middleware/login/login.component';
import { AppComponent } from './root/app.component';
import { IndexComponent } from './views/index/index.component';
import { TableComponent } from './components/table/table.component';

import { IRouting } from './shared/interfaces';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: IndexComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

export const appRouting: IRouting = {
    routes: RouterModule.forRoot(routes, { enableTracing: true }),
    components: [ LoginComponent, IndexComponent, TableComponent ]
};
