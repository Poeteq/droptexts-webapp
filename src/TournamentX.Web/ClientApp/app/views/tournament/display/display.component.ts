import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { take, debounceTime, takeUntil } from 'rxjs/operators';

// import { TournamentFireStore } from './../tournament.fstore';
// import { PlayerFireStore, MatchFireStore } from './../stores';
import { FilterPipe } from './../../../shared/pipes/filter.pipe'
import { BracketService } from '../services/bracket.service';
import { Bracket } from '@app/shared/models';
import { FireService } from '../services/fire.service';

@Component({
    selector: 'tom-tournament-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.scss']
})
export class TournamentDisplayComponent
{
    showPlayersBracket: boolean = false;
    showMatchesBracket: boolean = false;
    tournament: any = null;
    tournamentId: string;
    playersObs: any;
    matchesObs: any;
    matches: any = [];
    matchesFour: any = [];
    stations: any = [];
    pq: any = [];

    // Public
    bracket$: Observable<Bracket>;
    bracketId: string;


    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private route: ActivatedRoute,
        private fireService: FireService,
        private bracketService: BracketService) 
    {
        // private route: ActivatedRoute,
        // private tournamentStore: TournamentFireStore) {
        // this.route.paramMap.subscribe(params => {
        // this.tournamentId = params.get('id');
        // this.tournamentStore.loadTourney(this.tournamentId).pipe(debounceTime(250)).subscribe(tournament => {

        //     this.tournament = tournament;

        //     if (!tournament.live) {
        //         this.loadPlayers(this.tournamentId);
        //     }
        //     else if (tournament.live) {
        //         this.loadMatches(this.tournamentId);
        //     }
        // });
        // });
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
                    .subscribe(bracket => {
                        console.log(bracket);
                        this.matchesFour = new FilterPipe().transform(bracket.allMatches, 'Live').slice(0, 4);
                        this.stations = bracket.stations;
                        this.matches = bracket.allMatches;
                        this.pq = bracket.priorityQueue;
                        this.showMatchesBracket = true;
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

    // loadPlayers(tournamentId: string) {
    //     this.playersObs = this.playerStore.loadPlayers(this.tournamentId);
    //     this.playerStore.loadPlayers(this.tournamentId).pipe(take(1)).subscribe(players => {
    //         this.showPlayersBracket = true;
    //     });
    // }

    // loadMatches(tournamentId: string) {
    //     this.matchesObs = this.matchStore.loadMatches(this.tournamentId);
    //     this.matchStore.loadMatches(tournamentId).subscribe(matches => {
    //         this.matches = matches;
    //         this.matchesFour = new FilterPipe().transform(matches, 'live').slice(0, 4);
    //         this.showMatchesBracket = true;
    //     })
}