import { Player } from './player.model';
import { MatchState } from './match.enum';

export class Match 
{
    player1: Player;
    player2: Player;
    winner: Player;
    loser: Player;
    bracket: number;
    console: number;
    loserPositionTop: boolean;
    matchNumber: number;
    nextMatchNumber: number;
    nextLoserMatchNumber: number;
    nextLoserMatchSetIndex: number;
    player1PlaceHolderText: string;
    player1Score: number;
    player2PlaceHolderText: string;
    player2Score: number;
    poolWinnerMatchNumber: number;
    round: number;
    state: MatchState;
    stateName: string;
    station: number;
    winnerPositionTop: boolean;

    /**
     * Constructor
     *
     * @param match
     */
    constructor(match)
    {
        this.player1 = match.player1 ? new Player(match.player1) : Player.Bye(match.player1PlaceHolderText);
        this.player2 = match.player2 ? new Player(match.player2) : Player.Bye(match.player2PlaceHolderText);
        this.winner = match.winner ? new Player(match.winner) : Player.Bye();
        this.loser = match.loser ? new Player(match.loser) : Player.Bye();
        this.matchNumber = match.matchNumber || null;
        this.nextMatchNumber = match.nextMatchNumber || null;
        this.bracket = match.bracket || -1;
        this.console = match.console || -1;
        this.loserPositionTop = match.loserPositionTop || false;
        this.nextLoserMatchNumber = match.nextLoserMatchNumber || -1;
        this.nextLoserMatchSetIndex = match.nextLoserMatchSetIndex || -1;
        this.player1PlaceHolderText = match.player1PlaceHolderText || '';
        this.player2PlaceHolderText = match.player2PlaceHolderText || '';
        this.player1Score = match.player1Score || 0;
        this.player2Score = match.player2Score || 0;
        this.poolWinnerMatchNumber = match.poolWinnerMatchNumber || -1;
        this.round = match.round || -1;
        this.state = match.state ? MatchState[MatchState[match.state]] : MatchState.Complete;
        this.stateName = match.stateName || '';
        this.station = match.station || -1;
        this.winnerPositionTop || match.winnerPositionTop || false;
    }
}