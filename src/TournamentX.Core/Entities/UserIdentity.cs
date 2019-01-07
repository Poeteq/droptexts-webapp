using System.Collections.Generic;
using TournamentX.Core.Validation;

namespace TournamentX.Core.Entities
{
    public class UserIdentity
    {
        public string SessionId { get; set; }
        public string UserId { get; set; }
        public bool IsAdmin { get; set; }

        public List<string> Tournaments { get; set; }

        public void Validate()
        {
            RequestPreconditions.CheckNotBlank(SessionId, "SessionId");
        }

        public void SetUser()
        {
            IsAdmin = true;
        }
    }
}
