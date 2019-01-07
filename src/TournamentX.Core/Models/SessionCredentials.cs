using System.Collections.Generic;

namespace TournamentX.Core.Models
{
    public class TxSessionCredentials
    {
        public string SessionId { get; set; }
        public string UserId { get; set; }
        public bool IsAdmin { get; set; }
        public List<string> Tournaments { get; set; }

        public bool IsActive()
        {
            return !string.IsNullOrEmpty(SessionId);
        }
    }
}
