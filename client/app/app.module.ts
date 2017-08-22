import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';
import { HttpModule } from '@angular/http';

import { MaterialModule } from './modules/material-module';

import { AppComponent } from './root/app.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './views/middleware/login/login.component';
import { appRouting } from './app.routing';
import { IndexComponent } from './views/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    appRouting.components,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    appRouting.routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
