import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Tournament } from '@app/shared/models';
import { tomAnimations } from '@app/shared/animations';
import { SidenavService } from '@app/core/services/sidenav.service';
import { FireService } from '../../services/fire.service';

@Component({
    selector: 'tom-tournament-start',
    templateUrl: './bracket-start.component.html',
    styleUrls: ['./bracket-start.component.scss'],
    animations: tomAnimations
})
export class TournamentBracketStartComponent implements OnInit, OnDestroy
{
    // Public
    tournament$: Observable<Tournament>;
    tournamentId: string;
    players: any[];
    tournament: Tournament;
    showBracketStart: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private sidenav: SidenavService,
        private route: ActivatedRoute,
        private router: Router,
        private fireService: FireService)
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
                this.tournament$ = this.fireService.syncTournament(tid).pipe(debounceTime(256));
                this.tournament$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(tournament =>
                    {
                        if (tournament)
                        {
                            this.players = tournament.players ? tournament.players : [];
                            if (this.players.length > 1)
                            {
                                this.router.navigate(["/tournament", this.tournamentId, "bracket", "players"]);
                            }
                        }
                    });
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

    toggleSidenav()
    {
        this.sidenav.toggle();
    }

}
