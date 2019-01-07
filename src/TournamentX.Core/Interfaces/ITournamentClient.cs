using System.Collections.Generic;
using TournamentX.Core.Entities;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Interface
{
    public interface ITournamentClient
    {
        Response<EmptyResponse> GetTournament();
        Response<GetTournamentsResponse> GetTournaments(TxSessionCredentials credentials);
        Response<GetTournamentIdsResponse> GetUserTournaments(TxSessionCredentials credentials);
        Response<EmptyResponse> LaunchTournament(string tournamentId, LaunchTournamentRequest request);
        Response<EmptyResponse> ResetTournament(TxSessionCredentials credentials, string tournamentId);
        Response<EmptyResponse> CreateTournament(CreateTournamentRequest request);
        Response<EmptyResponse> UpdateMatch(TxSessionCredentials credentials, string bracketId, UpdateMatchRequest request);
        //Response<GetAccessTokenResponse> GetAccessToken(TxSessionCredentials credentials, string tournamentId, GetAccessTokenRequest request);
        Response<EmptyResponse> SwapPlayers(TxSessionCredentials credentials, string tournamentId, string index1, string index2);
        Response<EmptyResponse> UpdatePlayer(TxSessionCredentials credentials, PlayerRequest request);
        Response<EmptyResponse> AddPlayer(TxSessionCredentials credentials, string tournamentId, PlayerRequest request);
        Response<EmptyResponse> DeletePlayer(TxSessionCredentials credentials, string tournamentId, int seed);
        Response<GetLogsResponse> GetLogs(string tournamentId);
        Response<EmptyResponse> SendNotification(TxSessionCredentials credentials, string bracketId, string matchId, SendNotificationRequest request);
    }
}
