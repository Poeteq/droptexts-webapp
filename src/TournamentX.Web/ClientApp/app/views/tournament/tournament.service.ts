import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from '@app/shared/models';
import { FireService } from './services/fire.service';
@Injectable({
    providedIn: 'root'
})
export class TournamentService
{
    tournamentObs: Observable<Tournament>;

    constructor (private fireService: FireService) 
    {
    }

    start(tournamentId: string)
    {
        this.tournamentObs = this.fireService.syncTournament(tournamentId);
        return this.tournamentObs;
    }

    getMatchUpdates(tournamentId: string): Observable<any>
    {
        let matchesObs = this.fireService.syncMatches(tournamentId);
        return matchesObs;
    }

    getPlayerUpdates(tournamentId: string): Observable<any>
    {
        let playersObs = this.fireService.syncPlayers(tournamentId);
        return playersObs;
    }

}