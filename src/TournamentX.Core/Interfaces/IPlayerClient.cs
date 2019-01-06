using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Interfaces
{
    public interface IPlayerClient
    {
        Response<EmptyResponse> UpdatePlayer(TxSessionCredentials credentials, PlayerRequest request);
    }
}
