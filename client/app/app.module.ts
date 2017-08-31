import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './root/app.component';

import { SharedModule } from './modules/shared.module';
import { appRouting } from './modules/app.routing';

import { AuthGuard } from './guards/index';
import { AlertService, AuthenticationService, UserService } from './services/index';

import { TableService, TableDataService } from './components/table/table.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    appRouting.routes
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
