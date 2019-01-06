namespace TournamentX.Core.Models.Requests
{
    public class TemporaryLoginRequest
    {
        public string AccessToken { get; set; }
        public string Email { get; set; }

        public TemporaryLoginRequest(string token, string email)
        {
            AccessToken = token;
            Email = email;
        }
    }
}
