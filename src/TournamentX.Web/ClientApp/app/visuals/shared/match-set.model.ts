import { Match } from './match.model';

export class MatchSet
{
    setIndex: number;
    nextSetIndex: number;
    matchOne: Match;
    matchTwo: Match;

    /**
    * Constructor
    *
    * @param matchSet
    */
    constructor(matchSet)
    { 
        this.setIndex = matchSet.matchSetIndex;
        this.nextSetIndex = matchSet.nextMatchSetIndex === -1 ? null : matchSet.nextMatchSetIndex;
        this.matchOne = matchSet.matchOne ? new Match(matchSet.matchOne) : null;
        this.matchTwo = matchSet.matchTwo ? new Match(matchSet.matchTwo) : null;

    }
}