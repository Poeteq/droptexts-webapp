import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Tournament } from '@app/shared/models';
import { TournamentService } from '@app/views/tournament/tournament.service';
import { MatDialog } from '@angular/material';
import { TomTournamentMatchDialogComponent } from '@app/views/tournament/components';
import { FireService } from '../../services/fire.service';

@Component({
    selector: 'tom-tournament-finals-bracket',
    templateUrl: './finals-bracket.component.html',
    styleUrls: ['./finals-bracket.component.scss']
})
export class TournamentFinalsBracketComponent implements OnInit, OnDestroy
{
    // Public
    tournament$: Observable<Tournament>;
    tournamentId: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor (
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private fireService: FireService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit()
    {
        this.route.parent.parent.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((params) =>
            {
                let tid = params['id'];
                this.tournamentId = tid;
                this.tournament$ = this.fireService.syncTournament(tid);
                this.tournament$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe();
            });
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
     * Show Match dialog
     */
    showMatchDialog(match)
    {
        const dialogRef = this.dialog.open(TomTournamentMatchDialogComponent, {
            panelClass: match.stateName != 'Live' ? 'match-dialog' : 'match-dialog-live',
            data: {
                match: match,
                tournamentId: this.tournamentId
            }
        });

        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();
    }

}
