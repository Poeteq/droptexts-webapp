using TournamentX.Core.Interfaces;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Services
{
    public class PlayerService
    {
        IPlayerClient playerClient;
        public PlayerService(IPlayerClient playerClient)
        {
            this.playerClient = playerClient;
        }

        public Response<EmptyResponse> UpdatePlayer(TxSessionCredentials credentials, PlayerRequest request)
        {
            return playerClient.UpdatePlayer(credentials, request);
        }
    }
}
