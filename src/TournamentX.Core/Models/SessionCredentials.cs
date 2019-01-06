using System.Collections.Generic;
using TournamentX.Core.Validation;

namespace TournamentX.Core.Models
{
    public class TxSessionCredentials
    {
        public string SessionId { get; set; }
        public string UserId { get; set; }
        public bool IsAdmin { get; set; }
        public List<string> Tournaments { get; set; }

        public TxSessionCredentials() { }
        public TxSessionCredentials(string sessionId, string userId)
        {
            SessionId = sessionId;
            UserId = userId;
            Tournaments = new List<string> { };
        }


        public bool IsActive()
        {
            return !string.IsNullOrEmpty(SessionId);
        }

        public void Validate()
        {
            RequestPreconditions.CheckNotBlank(SessionId, "SessionId");
        }

        public void SetAdmin(bool isAdmin)
        {
            IsAdmin = isAdmin;
        }
    }
}
