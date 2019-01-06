using TournamentX.Core.Interfaces;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Services
{
    public class BracketService
    {
        IBracketClient bracketClient;
        public BracketService(IBracketClient bracketClient)
        {
            this.bracketClient = bracketClient;
        }

        public Response<EmptyResponse> UpdateMatch(
            TxSessionCredentials credentials, 
            string bracketId, 
            UpdateMatchRequest request)
        {
            return bracketClient.UpdateMatch(credentials, bracketId, request);
        }

        public Response<EmptyResponse> SendNotification(
            TxSessionCredentials credentials, 
            string bracketId, string matchId, 
            SendNotificationRequest request)
        {
            return bracketClient.SendNotification(credentials, bracketId, matchId, request);
        }

    }
}
