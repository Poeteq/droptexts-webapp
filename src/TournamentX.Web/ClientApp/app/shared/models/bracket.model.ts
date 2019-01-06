import { MatchSet } from '@app/visuals/shared/match-set.model';

export class Bracket
{
    id: string;
    tournamentId: string;
    tournamentName: string;
    bracketName: string;
    isPool: boolean;
    state: number;
    stateName: string;
    winnersBracket: any[];
    losersBracket: any[];
    allMatches: any[];
    stations: any[];
    priorityQueue: any[];

    /**
    * Constructor
    *
    * @param matchSet
    */
    // constructor(matchSet)
    // { 
    //     this.setIndex = matchSet.matchSetIndex;
    //     this.nextSetIndex = matchSet.nextMatchSetIndex === -1 ? null : matchSet.nextMatchSetIndex;
    //     this.matchOne = matchSet.matchOne ? new Match(matchSet.matchOne) : null;
    //     this.matchTwo = matchSet.matchTwo ? new Match(matchSet.matchTwo) : null;

    // }
}