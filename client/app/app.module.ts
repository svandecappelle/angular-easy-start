import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MdButtonModule, MdCheckboxModule} from '@angular/material';

import { AppComponent } from './components/app.component';

@NgModule({
  declarations: [
    AppComponent
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
