using System;
using System.Collections.Generic;
using System.Text;

namespace TournamentX.Core.Models.Requests
{
    public class GenerateTemporaryOrganizerRequest
    {
        public string TournamentId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
