import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

@NgModule({
  exports: [MdButtonModule, MdCheckboxModule]
})
export class CustomMaterialModule { }
