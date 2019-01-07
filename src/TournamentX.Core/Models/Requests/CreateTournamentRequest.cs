namespace TournamentX.Core.Models.Requests
{
    public class CreateTournamentRequest : Request
    {
        public string TournamentName { get; set; }
        public int Style { get; set; } 
        public int NumberOfStations { get; set; }
    }
}
