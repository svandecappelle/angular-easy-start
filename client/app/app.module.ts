import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MdButtonModule, MdCheckboxModule} from '@angular/material';

import { AppComponent } from './root/app.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    MdButtonModule, MdCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
