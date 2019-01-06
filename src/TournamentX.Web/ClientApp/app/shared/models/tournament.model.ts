export class Tournament {
    id: string;
    name: string;
    tournamentName: string;
    live: boolean;
    players: any[];
    stations: any[];
    queue: any[];
    WinnerBrackets: any[];
    LoserBrackets: any[];
    FinalBrackets: any[];
    state: number;
    stateName: string;
    allMatches: any[];
    brackets: any[];

    constructor(live) {
        this.live = live;
    }
}