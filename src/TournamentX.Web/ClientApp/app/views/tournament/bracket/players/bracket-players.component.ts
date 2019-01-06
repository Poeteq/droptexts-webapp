import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Tournament } from '@app/shared/models';
import { TournamentService } from '@app/views/tournament/tournament.service';
import { tomAnimations } from '@app/shared/animations';
import { SidenavService } from '@app/core/services/sidenav.service';
import { FireService } from '../../services/fire.service';

@Component({
    selector: 'tom-tournament-bracket',
    templateUrl: './bracket-players.component.html',
    styleUrls: ['./bracket-players.component.scss'],
    animations: tomAnimations
})
export class TournamentBracketPlayersComponent implements OnInit, OnDestroy
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
    constructor (
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
                            this.tournament = tournament;
                            this.players = tournament.players;
                            this.showBracketStart = !this.players || this.players.length <= 1;
                            if (this.showBracketStart) {
                                this.router.navigate(["/tournament", this.tournamentId, "bracket", "start"]);
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
