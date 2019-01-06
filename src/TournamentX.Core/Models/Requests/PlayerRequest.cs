using TournamentX.Core.Entities;

namespace TournamentX.Core.Models.Requests
{
    public class PlayerRequest
    {
        public string Id {get;set;}
        public string Name { get; set; }
        public string PlayerName
        {
            get
            {
                return Name;
            }
        }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int Seed { get; set; }
        public int NotificationTypeId {get;set;}
        //public Player Player {get;set;}
    }
}
