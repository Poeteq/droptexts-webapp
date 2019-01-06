import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module';
import { TomPipesModule } from './pipes/pipes.module';
import { TomDirectivesModule } from './directives/directives';


@NgModule({
  imports: [FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule, TomPipesModule,
      TomDirectivesModule],
  exports: [FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule, TomPipesModule,
      TomDirectivesModule ],
  declarations: [] 
})
export class SharedModule { }
