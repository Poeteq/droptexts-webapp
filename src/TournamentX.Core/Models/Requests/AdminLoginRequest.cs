using System.ComponentModel.DataAnnotations;

namespace TournamentX.Core.Models.Requests
{
    public class AdminLoginRequest : Request
    {
        [Required]
        public string AccessToken { get; set; }

        public AdminLoginRequest() { }
        public AdminLoginRequest(string token)
        {
            AccessToken = token;
        }
    }
}
