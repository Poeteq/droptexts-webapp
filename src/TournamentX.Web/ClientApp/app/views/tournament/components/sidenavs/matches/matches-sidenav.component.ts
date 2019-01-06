import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { tomAnimations } from '@app/shared/animations';
import { TournamentService } from '@app/views/tournament/tournament.service';
import { Tournament } from '@app/shared/models';
import { FireService } from '@app/views/tournament/services/fire.service';
import { BracketService } from '@app/views/tournament/services/bracket.service';

@Component({
    selector: 'tom-tournament-matches-sidenav',
    templateUrl: './matches-sidenav.component.html',
    styleUrls: ['./matches-sidenav.component.scss'],
    animations: tomAnimations
})
export class TournamentMatchesSidenavComponent implements OnInit, OnDestroy, OnChanges
{
    @Input()
    live: boolean;

    @Input()
    isLoading: boolean;

    @Input()
    bracketId: string;

    @Input()
    tournament;

    @Input()
    matches: any[];

    // Public
    state: string;
    searchText: string;
    tournament$: Observable<Tournament>;
    animationState: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor (
        private tournamentService: TournamentService,
        private bracketService: BracketService,
        private fireService: FireService) 
    {
        // Set the defaults
        this.matches = [];
        this.state = 'live';
        this.searchText = '';
        this.animationState = 'inactive';

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
        
        this.bracketService.bracketId$.subscribe(bid => {
            this.bracketId = bid;
        });
        // this.isLoading = true;
        // this.fireService.syncBracket(this.bracketId)
        //     .pipe(debounceTime(256))
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(data =>
        //     {
        //         if (data.allMatches)
        //         {
        //             this.matches = data.allMatches.sort((a, b) => this.sortMatchByPriority(a, b));
        //             this.isLoading = false;
        //         }
        //     });
    }

    /**
     * On changes
     */
    ngOnChanges(): void
    {
        if (!this.bracketId) return;
        
        this.isLoading = true;
        this.fireService.syncBracket(this.bracketId)
            .pipe(debounceTime(256))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data =>
            {
               this.toggleState();
                if (data.allMatches)
                {
                    this.matches = data.allMatches.sort((a, b) => this.sortMatchByPriority(a, b));
                    this.isLoading = false;
                }
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
     * Set loading
     */
    setLoading(e): void
    {
        this.isLoading = e;
    }

    toggleState() {
        this.animationState = this.animationState === 'active' ? 'inactive' : 'active';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sort match by priority
     */
    private sortMatchByPriority(a, b): number
    {
        //hack: fix finals priority
        if (a.isFinals) {
            a.round = 9999;
        }
        
        //hack: fix finals priority
        if (b.isFinals) {
            b.round = 9999;
        }

        if (a.round === b.round)
        {
            return a.matchNumber - b.matchNumber
        }

        return a.round - b.round
    }
}
