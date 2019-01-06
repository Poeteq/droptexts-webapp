using System.Collections.Generic;
using TournamentX.Core.Entities;

namespace TournamentX.Core.Models.Responses
{
    public class GetLogsResponse
    {
        public List<Log> Logs { get; set; }
    }
}
