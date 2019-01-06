import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { Tournament } from '../../shared/models';
import { TournamentService } from './tournament.service';
import { SidenavService } from '../../core/services/sidenav.service';
import { MatSidenav } from '@angular/material';
import { BracketService } from './services/bracket.service';
import { FireService } from './services/fire.service';
import { tomAnimations } from '@app/shared/animations';

@Component({
    selector: 'tom-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: tomAnimations
})

export class TournamentComponent implements AfterViewInit, OnInit, OnDestroy, OnChanges
{
    // Public
    isLive: BehaviorSubject<boolean>;
    players: any[];
    matches: any[];
    tournament: Tournament;
    tournamentId: string;
    live: boolean;
    isLoading: boolean;
    showSidenav: boolean;
    sideNavReady: boolean;
    screenWidth: number;
    tournament$: Observable<Tournament>;
    viewReady: boolean;
    bracketId: string;
    state: string;

    @ViewChild('sidenav')
    sidenav: MatSidenav;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private sidenavService: SidenavService,
        private fireService: FireService,
        private bracketService: BracketService) 
    {
        // Set the defaults
        this.isLive = new BehaviorSubject<boolean>(false);

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

        this.initScreenFlex();

        this.route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((params) =>
            {
                this.showSidenav = true;
                this.tournamentId = params['id'];
                this.tournament$ = this.fireService.syncTournament(this.tournamentId);
                this.tournament$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(tom =>
                    {
                        this.tournament = tom as Tournament;
                    });
            });

        this.bracketService.bracketId$.subscribe(bid =>
        {
            this.bracketId = bid;
        });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        this.sideNavReady = true;
        this.sidenavService.setSidenav(this.sidenav);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngOnChanges() {
        let urlPaths = this.router.url.split('/');
        this.state = urlPaths[urlPaths.length - 1];
        console.log(this.state);
        if (this.state == 'display') {
            this.sidenavService.toggle();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set loading
     */
    setLoading(bool: boolean)
    {
        this.isLoading = bool;
    }

    /**
     * Set tournament status
     */
    markTournyStatus(live: boolean)
    {
        this.isLive.next(live);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * initialize screen flex
     */
    private initScreenFlex()
    {
        this.screenWidth = window.innerWidth;   // set screenWidth on page load
        this.viewReady = true;
        window.onresize = () =>
        { // set screenWidth on screen size change
            this.screenWidth = window.innerWidth;
        };
    }

}
