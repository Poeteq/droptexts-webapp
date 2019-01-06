import { Component, EventEmitter, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '@app/core/services/http.service';
import { MatchAction, UpdateMatchRequest } from '@app/shared/models';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TomSnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';
import { TomTournamentPlayerNotificationsDialogComponent } from '@app/views/tournament/components/dialogs/player-notifications/player-notifications-dialog.component';

@Component({
    selector: 'tom-match-live',
    templateUrl: './match-live.component.html',
    styleUrls: ['./match-live.component.scss'],
    providers: [HttpService]
})
export class TournamentMatchListItemLiveComponent implements OnInit, OnDestroy
{
    @Input()
    match: any;

    @Input()
    bracketId: any;

    @Output()
    loading: EventEmitter<any>;

    @Output()
    confirmAction: EventEmitter<any>;

    // Public
    confirmingWinner: boolean;
    isLoading: boolean;
    winnerId: number;
    winnerName: string;
    player1Checked: boolean;
    player2Checked: boolean;
    hideMatch: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor(
        private matDialog: MatDialog,
        private httpService: HttpService,
        public snackBar: MatSnackBar) 
    {
        // Set the defaults
        this.loading = new EventEmitter<any>();
        this.confirmAction = new EventEmitter<any>();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.confirmingWinner = false;
        this.winnerId = this.match.player1Score != null ? this.match.player1Score > this.match.player2Score ? 1 : 2 : null;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set match state as live
     */
    updateMatch(action): void 
    {
        let matchRequest = this.buildUpdateMatchRequest(action, 0, 0);
        this.httpService.updateMatch(matchRequest)
            .then();
    }
    
    /**
     * Winning player selected
     */
    onWinnerSelected(winnerId): void
    {
        this.player1Checked = winnerId == 1 && !this.player1Checked;
        this.player2Checked = winnerId == 2 && !this.player2Checked;
        this.confirmingWinner = this.player1Checked || this.player2Checked;
        this.winnerId = !this.player1Checked && !this.player2Checked ? null : winnerId;
        this.winnerName = winnerId == 1 ? this.match.player1.name : this.match.player2.name;
    }

    /**
     * Confirm winner of match
     */
    onConfirmWinner(): void
    {
        this.isLoading = true;
        this.confirmAction.emit(this.match);
        this.loading.emit(true);
        let player1Score = this.winnerId == 1 ? 1 : 0;
        let player2Score = this.winnerId == 2 ? 1 : 0;

        let matchRequest = this.buildUpdateMatchRequest(MatchAction.SetWinner, player1Score, player2Score);
        this.httpService.updateMatch(matchRequest)
            .then(() => { this.notifySnackBar("Match updated successfully!") });
    }

    /**
     * Cancel winner selection
     */
    onCancelWinner(): void
    {
        this.confirmingWinner = false;
        this.player1Checked = false;
        this.player2Checked = false;
        this.winnerId = null;
        this.winnerName = null;
    }

    sendNotification()
    {
        let playerIds = [];
        if (this.match.player1)
        {
            playerIds.push(this.match.player1.playerId);
        }
        if (this.match.player2)
        {
            playerIds.push(this.match.player2.playerId);
        }

        this.httpService.sendNotification(this.bracketId, this.match.matchNumber, { playerIds: playerIds })
            .then(() => { this.notifySnackBar('Notification successfully sent!'); });
    }

    openPlayerDialog(num) 
    {

        let dialogRef = null;
        if (num == 1)
        {
            dialogRef = this.matDialog.open(TomTournamentPlayerNotificationsDialogComponent, {
                panelClass: 'player-notifications-dialog',
                data: {
                    player: this.match.player1
                }
            });
        } else
        {
            dialogRef = this.matDialog.open(TomTournamentPlayerNotificationsDialogComponent, {
                panelClass: 'player-notifications-dialog',
                data: {
                    player: this.match.player2
                }
            });
        }
        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    notifySnackBar(message) 
    {
        this.snackBar.openFromComponent(TomSnackBarComponent, {
            data: {
                message: message
            }
        });
    }

    /**
     * Build update match request
     */
    private buildUpdateMatchRequest(matchAction: number, player1Score: number, player2Score: number): UpdateMatchRequest
    {
        return {
            matchAction: matchAction,
            bracketId: this.bracketId,
            matchNumber: this.match.matchNumber,
            player1Score: player1Score,
            player2Score: player2Score
        } as UpdateMatchRequest;
    }

}
