namespace TournamentX.Core.Models.Requests
{
    public class Request
    {
        public TxSessionCredentials SessionCredentials { get; set; }

        public void SetCredentials(TxSessionCredentials credentials)
        {
            SessionCredentials = credentials;
        }
    }
}
