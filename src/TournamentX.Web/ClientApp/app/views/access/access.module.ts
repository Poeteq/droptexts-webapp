import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../../shared/modules/material.module';
import { SharedModule } from '@app/shared/shared.module';

import { AccessRoutingModule } from './access-routing.module';
import { TomAdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { TomAccessComponent } from './access.component';

@NgModule({
  imports: [ AccessRoutingModule, CommonModule, MaterialModule, SharedModule ],
  exports: [ TomAccessComponent ],
  declarations: [TomAccessComponent, TomAdminDialogComponent],
  entryComponents: [TomAdminDialogComponent]
})
export class AccessModule { }
