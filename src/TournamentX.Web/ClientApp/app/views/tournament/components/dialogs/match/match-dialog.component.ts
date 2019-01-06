import { Component, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatchState } from '@app/visuals/shared';
import { HttpService } from '@app/core/services/http.service';
import { MatchAction, UpdateMatchRequest } from '@app/shared/models';
import { MatSnackBar } from '@angular/material';
import { TomSnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';

@Component({
    selector: 'tom-tournament-match-dialog',
    templateUrl: './match-dialog.component.html',
    styleUrls: ['./match-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [HttpService]
})
export class TomTournamentMatchDialogComponent implements OnDestroy
{
    MatchState = MatchState;

    user = { name: '', email: '' };
    isLoading: boolean;
    accessToken: string;
    showToken: boolean;
    bracketId: string;
    match: any;
    selectedWinner: number;
    isConfirmingWinner: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor (
        public dialogRef: MatDialogRef<TomTournamentMatchDialogComponent>,
        private httpService: HttpService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data)
    {
        // Set the defaults
        this.match = data.match;
        this.bracketId = data.bracketId;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

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

    selectPlayerOne(): void
    {
        if (this.isMatchReady())
        {
            this.selectedWinner = 1;
            this.isConfirmingWinner = true;
        }
    }

    selectPlayerTwo(): void
    {
        if (this.isMatchReady())
        {
            this.selectedWinner = 2;
            this.isConfirmingWinner = true;
        }
    }

    onCancelWinner(): void
    {
        this.isConfirmingWinner = false;
    }

    onConfirmWinner(): void
    {
        this.isLoading = true;
        let player1Score = this.selectedWinner == 1 ? 1 : 0
        let player2Score = this.selectedWinner == 2 ? 1 : 0

        let matchRequest = this.buildMatchRequest(MatchAction.SetWinner, player1Score, player2Score);
        this.httpService.updateMatch(matchRequest)
            .then(() =>
            {
                this.notifySnackBar();
                this.dialogRef.close();
            });

    }

    
    notifySnackBar() 
    {
        this.snackBar.openFromComponent(TomSnackBarComponent, {
            data: {
                message: 'Match successfully updated!'
            }
        });
    }

    buildMatchRequest(matchAction: number, player1Score: number, player2Score: number): UpdateMatchRequest
    {
        return {
            matchAction: matchAction,
            bracketId: this.bracketId,
            matchNumber: this.match.matchNumber,
            player1Score: player1Score,
            player2Score: player2Score
        } as UpdateMatchRequest;
    }

    isMatchReady(): boolean
    {
        return !this.match.isPlayer1Bye && !this.match.isPlayer2Bye;
    }
}