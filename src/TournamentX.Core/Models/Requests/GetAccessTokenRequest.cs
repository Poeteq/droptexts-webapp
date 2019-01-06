namespace TournamentX.Core.Models.Requests
{
    public class GetAccessTokenRequest : Request
    {
        public string Email { get; set; }
        public string Name { get; set; }
    }
}
