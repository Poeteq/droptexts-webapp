import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { tomAnimations } from '@app/shared/animations';
import { HttpService } from '@app/core/services/http.service';
import { Tournament } from '@app/shared/models';

@Component({
    selector: 'tom-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: tomAnimations
})
export class TomDashboardComponent implements OnInit, OnDestroy
{
    // Public
    tournaments: Tournament[];
    filteredTournaments: Tournament[];
    searchTerm: string;
    isLoading: boolean;
    onInit: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor (
        private httpService: HttpService,
        private _router: Router) 
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
        this.searchTerm = '';
        this.onInit = true;
        this.getTournaments();
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
     * Get tournaments
     */
    getTournaments(): void
    {
        this.httpService.getTournaments()
            .then(res =>
            {
                this.isLoading = false;
                this.onInit = false;
                this.filteredTournaments = this.tournaments = res.payload.tournaments.reverse() as Tournament[];
            }, error => console.log(error));
    }

    navigateToTournament(tournamentId: number, pageName: string, subPage): void
    {
        this.isLoading = true;
        this._router.navigate(["/tournament", tournamentId, pageName, subPage]);
    }

    eventClicked(eventId): void
    {
        this._router.navigate(["/event", eventId, "dashboard"]);
    }
}
