import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/access', pathMatch: 'full' },
  { path: 'access', loadChildren: './views/access/access.module#AccessModule'},
  { path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]  },
  { path: 'tournament', loadChildren: './views/tournament/tournament.module#TournamentModule', canActivate: [AuthGuard]  },
  { path: 'error', loadChildren: './views/error-pages/error-pages.module#ErrorPagesModule' },
  { path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
