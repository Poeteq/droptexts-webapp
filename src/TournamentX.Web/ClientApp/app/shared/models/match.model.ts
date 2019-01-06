export interface UpdateMatchRequest
{
    bracketId: string;
    player1Score: number,
    player2Score: number,
    matchAction: number,
    matchNumber: number,
}

export class MatchAction
{
    public static readonly SetWinner = 1;
    public static readonly SetLive = 2;
    public static readonly SetStream = 3;
    public static readonly Revert = 4;

}
