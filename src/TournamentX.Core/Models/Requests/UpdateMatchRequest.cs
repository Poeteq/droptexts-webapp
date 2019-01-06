using TournamentX.Core.Enumerations;

namespace TournamentX.Core.Models.Requests
{
    public class UpdateMatchRequest : Request
    {
        public int MatchNumber {get;set;}
        public MatchAction MatchAction { get; set; }
        public int Player1Score { get; set; }
        public int Player2Score { get; set; }
    }
}
