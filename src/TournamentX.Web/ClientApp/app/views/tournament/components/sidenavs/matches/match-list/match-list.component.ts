import { Component, EventEmitter, Input, Output, ViewEncapsulation, OnChanges } from '@angular/core';
import { tomAnimations } from '@app/shared/animations';

@Component({
    selector: 'tom-tournament-match-list',
    templateUrl: './match-list.component.html',
    styleUrls: ['./match-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: tomAnimations
})
export class TournamentMatchListComponent implements OnChanges
{
    @Input() 
    searchText: string = '';

    @Input() 
    isLoading: boolean = false;

    @Input()
    matches: any[];

    @Input() 
    state: string;

    @Input() 
    cachedMatches: any[];

    @Input() 
    bracketId: string;

    @Output() 
    load: EventEmitter<any>;

    /**
     * Constructor
     *
     */
    constructor () 
    {
        // Set the defaults
        this.load = new EventEmitter<any>();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnChanges()
    {
        if (this.matches)
        {
            this.cachedMatches = this.matches;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Emit loading
     */
    onLoading(event: boolean)
    {
        this.load.emit(event);
    }
}
