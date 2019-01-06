using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Interfaces
{
    public interface IBracketClient
    {
        Response<EmptyResponse> UpdateMatch(TxSessionCredentials credentials, string bracketId, UpdateMatchRequest request);
        Response<EmptyResponse> SendNotification(TxSessionCredentials credentials, string bracketId, string matchId, SendNotificationRequest request);
    }
}
