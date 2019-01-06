using System.ComponentModel.DataAnnotations;

namespace TournamentX.Core.Models.Requests
{
    public class GenerateTemporaryOrganizerRequest
    {
        [Required]
        public string TournamentId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }

        public GenerateTemporaryOrganizerRequest()
        {

        }
        public GenerateTemporaryOrganizerRequest(string tid, string name, string email)
        {
            TournamentId = tid;
            Name = name;
            Email = email;
        }
    }
}
