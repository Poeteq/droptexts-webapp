import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomDashboardComponent } from './dashboard.component';
import { TomDashboardTournamentDialogComponent } from './tournament-dialog/tournament-dialog.component';
import { TomDashboardBannerComponent } from './banner/banner.component';

const routes: Routes = [
  { path: '', component: TomDashboardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule
{
  static components = [
    TomDashboardComponent,
    TomDashboardBannerComponent,
    TomDashboardTournamentDialogComponent
  ]
}
