import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { SharedModule } from '@app/shared/shared.module';
import { TomTopBarModule } from '@app/shared/components/top-bar/top-bar.module';
import { TomSnackBarModule } from '@app/shared/components/snack-bar/snack-bar.module';
import { PlayersBracketVisualModule } from '@app/visuals/players-bracket-visual/players-bracket-visual.module';
import { WinnersBracketVisualModule } from '@app/visuals/winners-bracket-visual/winners-bracket-visual.module';
import { LosersBracketVisualModule } from '@app/visuals/losers-bracket-visual/losers-bracket-visual.module';
import { FinalsBracketVisualModule } from '@app/visuals/finals-bracket-visual/finals-bracket-visual.module';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { TournamentResolver } from './tournament.resolver';
import { TournamentService } from './tournament.service';
import { ParentBracketGuardService, BracketGuardService, LiveBracketGuardService } from './services/bracket-guard.service';
import { BracketResolver } from './bracket/bracket.resolver';
import
{
  TournamentNavBarComponent, TournamentWidgetBarComponent, TournamentBracketBarComponent, TournamentMatchesSidenavComponent, TournamentMatchListComponent,
  TournamentMatchListItemLiveComponent, TournamentMatchListItemPendingComponent, TournamentMatchListItemCompletedComponent, PlayersSidenavComponent,
  PlayerListComponent, PlayerListItemComponent, TomTournamentUserManagementDialogComponent, TomTournamentMatchDialogComponent, TomTournamentLogDialogComponent, 
  TomTournamentSettingsDialogComponent, TomTournamentLaunchDialogComponent
} from './components';
import { BracketService } from './services/bracket.service';
import { TomTournamentPlayerNotificationsDialogComponent } from './components/dialogs/player-notifications/player-notifications-dialog.component';
import { TournamentPendingMatchListComponent } from './display/pending-match-list/pending-match-list.component';
import { TournamentLiveMatchComponent } from './display/live-match/live-match.component';


@NgModule({
  imports: [
    TournamentRoutingModule,
    CommonModule,
    NgxDnDModule,
    SharedModule,
    TomTopBarModule,
    TomSnackBarModule,
    PlayersBracketVisualModule,
    WinnersBracketVisualModule,
    LosersBracketVisualModule,
    FinalsBracketVisualModule
  ],
  declarations: [
    TournamentRoutingModule.components,
    TournamentComponent,
    TomTournamentLogDialogComponent,
    TomTournamentUserManagementDialogComponent,
    TomTournamentMatchDialogComponent,
    TomTournamentSettingsDialogComponent,
    TomTournamentLaunchDialogComponent,
    TomTournamentPlayerNotificationsDialogComponent,
    TournamentNavBarComponent,
    TournamentWidgetBarComponent,
    TournamentBracketBarComponent,
    TournamentMatchesSidenavComponent,
    TournamentMatchListComponent,
    TournamentMatchListItemLiveComponent,
    TournamentMatchListItemPendingComponent,
    TournamentMatchListItemCompletedComponent,
    PlayersSidenavComponent,
    PlayerListComponent,
    PlayerListItemComponent,
    TournamentPendingMatchListComponent,
    TournamentLiveMatchComponent
  ],
  providers: [
    TournamentResolver,
    TournamentService,
    ParentBracketGuardService,
    BracketGuardService,
    BracketResolver,
    BracketService,
    LiveBracketGuardService
  ],
  entryComponents: [
    TomTournamentLogDialogComponent,
    TomTournamentUserManagementDialogComponent,
    TomTournamentMatchDialogComponent,
    TomTournamentSettingsDialogComponent,
    TomTournamentLaunchDialogComponent,
    TomTournamentPlayerNotificationsDialogComponent
  ]
})
export class TournamentModule { }
