import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '@app/core/services/http.service';

export class MatchState
{
    Completed = 1;
    Ready = 2;
    Awaiting = 3;
    Live = 4;
    Pending = 5;
}

@Component({
    selector: 'tom-match-completed',
    templateUrl: './match-completed.component.html',
    styleUrls: ['./match-completed.component.scss']
})
export class TournamentMatchListItemCompletedComponent implements OnDestroy
{

    @Input()
    match: any;

    @Input()
    bracketId: string;

    @Output()
    confirmAction: EventEmitter<any>;

    flipped: boolean;
    loading: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     */
    constructor (private httpService: HttpService) 
    {
        // Set the defaults
        this.confirmAction = new EventEmitter<any>();

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

    /**
     * Flip match item
     */
    flipItem(): void
    {
        this.flipped = !this.flipped;
    }

    /**
     * Reset match
     */
    resetMatch(matchNum): void
    {
        this.loading = true;
        let request = this.buildResetMatchRequest(matchNum);
        this.httpService.updateMatch(request)
            .then();
    }

    /**
     * Build reset match request
     */
    private buildResetMatchRequest(matchNum): any
    {
        return {
            bracketId: this.bracketId,
            matchNumber: matchNum,
            matchAction: 4 // reset
        }
    }

}
