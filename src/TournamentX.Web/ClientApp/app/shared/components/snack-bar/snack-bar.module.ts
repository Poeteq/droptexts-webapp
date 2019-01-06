import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TomSnackBarComponent } from './snack-bar.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarHorizontalPosition } from '@angular/material';
import { MaterialModule } from '@app/shared/modules/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [TomSnackBarComponent],
  declarations: [TomSnackBarComponent],
  entryComponents: [TomSnackBarComponent],
  providers: [{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
      duration: 2500, horizontalPosition: 'left' as MatSnackBarHorizontalPosition
    }
  }]

})
export class TomSnackBarModule { }
