import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TomTopBarComponent } from './top-bar.component';
import { MaterialModule } from '@app/shared/modules/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [TomTopBarComponent],
  declarations: [TomTopBarComponent],
  entryComponents: []
})
export class TomTopBarModule { }
