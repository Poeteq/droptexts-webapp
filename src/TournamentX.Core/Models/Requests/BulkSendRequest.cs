using System.Collections.Generic;

namespace TournamentX.Core.Models.Requests
{
    public class BulkSendRequest
    {
        public List<string> Recipients { get; set; }
        public string Body { get; set; }
    }
}
