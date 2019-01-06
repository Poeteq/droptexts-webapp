import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Tournament, Bracket } from '@app/shared/models';
import { TournamentService } from '@app/views/tournament/tournament.service';
import { FireService } from './../../services/fire.service';
import { TomTournamentMatchDialogComponent } from '@app/views/tournament/components';
import { BracketService } from '../../services/bracket.service';
import { tomAnimations } from '@app/shared/animations';

@Component({
    selector: 'tom-tournament-bracket-winners',
    templateUrl: './bracket-winners.component.html',
    styleUrls: ['./bracket-winners.component.scss'],
    animations: tomAnimations
})
export class TournamentBracketWinnersComponent implements OnInit, OnDestroy
{
    // Public
    bracket$: Observable<Bracket>;
    bracketId: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor (
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private fireService: FireService,
        private bracketService: BracketService) 
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
     * Navigate and show bracket
     */
    showMatchDialog(match)
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
