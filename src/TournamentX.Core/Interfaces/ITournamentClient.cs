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
        Response<EmptyResponse> SwapPlayers(TxSessionCredentials credentials, string tournamentId, string index1, string index2);
        Response<EmptyResponse> AddPlayer(TxSessionCredentials credentials, string tournamentId, PlayerRequest request);
        Response<EmptyResponse> DeletePlayer(TxSessionCredentials credentials, string tournamentId, int seed);
        Response<GetLogsResponse> GetLogs(string tournamentId);
    }
}
