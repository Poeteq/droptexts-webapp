import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TomTopBarModule } from '@app/shared/components/top-bar/top-bar.module';
import { TomDashboardTournamentDialogComponent } from './tournament-dialog/tournament-dialog.component';

import { TomTournamentWidgetComponent } from './tournament-widget/tournament-widget.component';
import { TomTournamentWidgetToggleDirective } from './tournament-widget/tournament-widget.directive';

@NgModule({
  imports: [DashboardRoutingModule, CommonModule, SharedModule, TomTopBarModule],
  declarations: [DashboardRoutingModule.components, TomTournamentWidgetComponent, TomTournamentWidgetToggleDirective],
  entryComponents: [TomDashboardTournamentDialogComponent],
  providers: []
})
export class DashboardModule { }
