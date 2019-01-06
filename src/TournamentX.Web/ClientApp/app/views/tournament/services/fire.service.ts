import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tournament, Bracket } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class FireService
{
    constructor (private fireDb: AngularFireDatabase) { }

    private syncRequest(requestUrlConfig): AngularFireObject<any>
    {
        return this.fireDb.object(requestUrlConfig.url);
    }

    private syncListRequest(requestUrlConfig: any): AngularFireList<any[]>
    {
        return this.fireDb.list(requestUrlConfig.url, ref => ref.orderByChild(requestUrlConfig.sortKey));
    }

    syncTournament(tid: string): Observable<Tournament>
    {
        let httpUrl = `tournaments/${tid}`;
        let $tournament = this.syncRequest({
            url: httpUrl
        }).valueChanges();

        return $tournament;
    }

    syncBracket(bid: string): Observable<Bracket>
    {
        let httpUrl = `brackets/${bid}`;
        let $bracket = this.syncRequest({
            url: httpUrl
        }).valueChanges();

        return $bracket.pipe(
            map(this.mapLosersMatches),
            map(this.mapWinnersMatches),
            map(this.mapFinalsMatches),
            map(this.mapMatches)
        );
    }

    syncMatches(tid: string, bracketType?: string): Observable<any>
    {
        let httpUrl = `tournaments/${tid}`;
        let matchesObs = this.syncRequest({
            url: httpUrl
        }).valueChanges();

        return matchesObs.pipe(
            map(this.mapLosersMatches),
            map(this.mapWinnersMatches),
            map(this.mapFinalsMatches),
            map(this.mapMatches)
        );
    }


    syncPlayers(tid: string): Observable<any>
    {
        let httpUrl = `tournaments/${tid}/players`;
        let playersObs = this.syncListRequest({
            url: httpUrl,
            sortKey: 'seed'
        }).valueChanges();

        return playersObs;
    }

    private mapMatches(t: Bracket)
    {
        let losersMatches: any[] = [];
        if (t.losersBracket)
        {
            t.losersBracket.forEach((matchSet, i, arr) =>
            {
                if (matchSet.matchOne)
                {
                    matchSet.matchOne.isLosers = true;
                    losersMatches.push(matchSet.matchOne);
                }
                if (matchSet.matchTwo)
                {
                    matchSet.matchTwo.isLosers = true;
                    losersMatches.push(matchSet.matchTwo);
                }
            });
        }

        // let finalsMatches: any[] = [];
        // if (t.FinalBrackets)
        // {
        //     t.FinalBrackets.forEach((matchSet, i, arr) =>
        //     {
        //         if (matchSet.matchOne)
        //         {
        //             matchSet.matchOne.isFinals = true;
        //             finalsMatches.push(matchSet.matchOne);
        //         }
        //         if (matchSet.matchTwo)
        //         {
        //             matchSet.matchTwo.isFinals = true;
        //             finalsMatches.push(matchSet.matchTwo);
        //         }
        //     });
        // }

        t.allMatches = [];

        if (t.winnersBracket)
        {
            t.allMatches = t.winnersBracket;
        }

        if (losersMatches)
        {
            t.allMatches = t.allMatches.concat(losersMatches);

        }
        // if (finalsMatches)
        // {
        //     t.allMatches = t.allMatches.concat(finalsMatches);

        // }

        return t;
    }

    private mapLosersMatches(t: Bracket)
    {
        if (t.losersBracket)
        {
            t.losersBracket = Object.keys(t.losersBracket).map(e =>
            {
                let g = {
                    matchSetId: e,
                    matchSetIndex: t.losersBracket[e].setIndex,
                    nextMatchSetIndex: t.losersBracket[e].nextSetIndex,
                    round: t.losersBracket[e].round,
                    state: t.losersBracket[e].state,
                    stateName: t.losersBracket[e].stateName,
                    matchOne: t.losersBracket[e].matches[0],
                    matchTwo: t.losersBracket[e].matches[1]
                }
                return g;
            });
        }
        return t;
    }

    private mapFinalsMatches(t: Tournament)
    {
        if (t.FinalBrackets)
        {
            t.FinalBrackets = Object.keys(t.FinalBrackets).map(e =>
            {
                let g = {
                    matchSetId: e,
                    matchSetIndex: t.FinalBrackets[e].setIndex,
                    nextMatchSetIndex: t.FinalBrackets[e].nextSetIndex,
                    round: t.FinalBrackets[e].round,
                    state: t.FinalBrackets[e].state,
                    stateName: t.FinalBrackets[e].stateName,
                    matchOne: t.FinalBrackets[e].matches[0],
                    matchTwo: t.FinalBrackets[e].matches[1]
                }
                return g;
            });
        }
        return t;
    }

    private mapWinnersMatches(t: Bracket)
    {
        if (t.winnersBracket)
        {
            t.winnersBracket = Object.keys(t.winnersBracket).map(e =>
            {
                let g = t.winnersBracket[e].matches[0];
                g.MatchSetIndex = t.winnersBracket[e].setIndex;
                g.MatchSetId = e;
                return g;
            });
        }
        return t;
    }
}
