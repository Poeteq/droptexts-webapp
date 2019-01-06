import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorRoutingModule } from './error-routing.module';

import { MaterialModule } from './../../shared/modules/material.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [ErrorRoutingModule, CommonModule, MaterialModule, SharedModule],
  declarations: [ErrorRoutingModule.components]
})
export class ErrorPagesModule { }
