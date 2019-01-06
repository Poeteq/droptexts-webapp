import { NgModule } from '@angular/core';

import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from "@angular/material/expansion"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table"
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  imports: [MatButtonModule, MatButtonToggleModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatStepperModule, MatTableModule, MatToolbarModule],
  exports: [MatButtonModule, MatButtonToggleModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatStepperModule, MatTableModule, MatToolbarModule]
})
export class MaterialModule { }
