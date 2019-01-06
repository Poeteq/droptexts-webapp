using System.Collections.Generic;
using TournamentX.Core.Entities;

namespace TournamentX.Core.Models.Responses
{
   public class GetTournamentsResponse
    {
        public IEnumerable<Tournament> Tournaments { get; set; }
    }
}
