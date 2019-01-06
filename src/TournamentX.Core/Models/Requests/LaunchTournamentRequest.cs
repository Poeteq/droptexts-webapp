namespace TournamentX.Core.Models.Requests
{
    public class LaunchTournamentRequest
    {
        private int playersPerPool;
        private int numOfStations;

        public LaunchTournamentRequest()
        {
        }

        public LaunchTournamentRequest(int playersPerPool, int numOfStations)
        {
            this.playersPerPool = playersPerPool;
            this.numOfStations = numOfStations;
        }

        public int NumberOfPlayersPerPool { get; set; }
        public int NumberOfStations {get;set;}
    }
}
