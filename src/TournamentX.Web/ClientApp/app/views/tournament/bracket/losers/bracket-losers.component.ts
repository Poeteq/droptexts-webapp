import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Tournament, Bracket } from '@app/shared/models';
import { TournamentService } from '@app/views/tournament/tournament.service';
import { MatDialog } from '@angular/material';
import { TomTournamentMatchDialogComponent } from '@app/views/tournament/components';
import { BracketService } from '../../services/bracket.service';
import { FireService } from '../../services/fire.service';

@Component({
    selector: 'tom-tournament-bracket-losers',
    templateUrl: './bracket-losers.component.html',
    styleUrls: ['./bracket-losers.component.scss']
})
export class TournamentBracketLosersComponent implements OnInit, OnDestroy
{
    // Public
    tournament$: Observable<Tournament>;
    tournamentId: string;
    bracket$: Observable<Bracket>;
    bracketId: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor (
        private route: ActivatedRoute,
        private bracketService: BracketService,
        private fireService: FireService,
        private dialog: MatDialog)
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
    ngOnInit(): void
    {
        let bracket = this.route.snapshot.data.bracket;
        this.route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((params) =>
            {
                let bid = params['bracketId'];
                this.bracketService.setBracketId$(bid);
                this.bracketId = bid;
                this.bracket$ = this.fireService.syncBracket(bid);
                this.bracket$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe();
            });
        // this.route.parent.parent.params
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((params) =>
        //     {
        //         let tid = params['id'];
        //         this.tournamentId = tid;
        //         this.tournament$ = this.tournamentService.start(tid);
        //         this.tournament$
        //             .pipe(takeUntil(this._unsubscribeAll))
        //             .subscribe();
        //     });
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
     * Show match dialog
     */
    showMatchDialog(match): void
    {
        const dialogRef = this.dialog.open(TomTournamentMatchDialogComponent, {
            panelClass: match.stateName != 'Live' ? 'match-dialog' : 'match-dialog-live',
            data: {
                match: match,
                bracketId: this.bracketId
            }
        });
        
        dialogRef.afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe();
    }
}
