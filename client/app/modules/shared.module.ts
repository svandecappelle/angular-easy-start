import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from '../components/table/table.component';
import { HeaderComponent } from '../components/header/header.component';

import { CdkTableModule } from '@angular/cdk';
import { HttpModule } from '@angular/http';

import { MaterialModule } from './material-module';

import { appRouting } from './app.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    HttpModule,
    MaterialModule,
    appRouting.routes
  ],
  declarations: [
    TableComponent,
    HeaderComponent,
    appRouting.components,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    HttpModule,
    MaterialModule,
    TableComponent,
    HeaderComponent,
    appRouting.components
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
