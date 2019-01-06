using System.Collections.Generic;
using TournamentX.Core.Entities;

namespace TournamentX.Core.Models.Requests
{
    public class SendNotificationRequest
    {
      public List<string> PlayerIds {get;set;}
    }
}
