using System.Collections.Generic;

namespace TournamentX.Core.Models.Responses
{
    public class ErrorResponse
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
