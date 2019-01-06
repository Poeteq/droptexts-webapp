import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { TournamentResolver } from './tournament.resolver';
import { BracketResolver } from './bracket/bracket.resolver';
import { TournamentDisplayComponent } from './display/display.component';
import { TournamentBracketStartComponent, TournamentBracketPlayersComponent, TournamentBracketWinnersComponent, TournamentBracketLosersComponent, TournamentFinalsBracketComponent } from './bracket';
import { BracketGuardService, ParentBracketGuardService, LiveBracketGuardService } from './services/bracket-guard.service';

const routes: Routes = [
    { path: '', component: TournamentComponent },
    {
        path: ':id',
        component: TournamentComponent,
        resolve: { tournament: TournamentResolver },
        children: [
            {
                path: 'bracket',
                runGuardsAndResolvers: "always",
                canActivate: [ParentBracketGuardService],
                children: [
                    { path: '', redirectTo: 'players', pathMatch: 'full' },
                    { path: 'start', component: TournamentBracketStartComponent, runGuardsAndResolvers: "always", canActivate: [BracketGuardService] },
                    { path: 'players', component: TournamentBracketPlayersComponent, runGuardsAndResolvers: "always", canActivate: [BracketGuardService] },
                    { path: ':bracketId/winners', component: TournamentBracketWinnersComponent, runGuardsAndResolvers: "always", resolve: { bracket: BracketResolver }, canActivate: [LiveBracketGuardService] },
                    { path: ':bracketId/losers', component: TournamentBracketLosersComponent, runGuardsAndResolvers: "always", resolve: { bracket: BracketResolver }, canActivate: [LiveBracketGuardService] },
                    { path: ':bracketId/finals', component: TournamentFinalsBracketComponent, runGuardsAndResolvers: "always", resolve: { bracket: BracketResolver }, canActivate: [LiveBracketGuardService] },
                    { path: ':bracketId/display', component: TournamentDisplayComponent, runGuardsAndResolvers: "always", resolve: { bracket: BracketResolver }, canActivate: [LiveBracketGuardService] },
                    { path: '**', redirectTo: '', pathMatch: 'full' }
                ]
            },
            { path: '', redirectTo: 'bracket', pathMatch: 'full' },
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TournamentRoutingModule
{
    static components = [
        TournamentComponent,
        TournamentBracketStartComponent,
        TournamentBracketPlayersComponent,
        TournamentBracketWinnersComponent,
        TournamentBracketLosersComponent,
        TournamentFinalsBracketComponent,
        TournamentDisplayComponent
    ]
}
