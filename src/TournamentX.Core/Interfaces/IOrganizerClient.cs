using TournamentX.Core.Entities;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Interface
{
    public interface IOrganizerClient
    {
        Response<TxSessionCredentials> TemporaryLogin(TemporaryLoginRequest request);
        Response<GetAccessTokenResponse> GenerateTemporaryOrganizer(TxSessionCredentials credentials, GenerateTemporaryOrganizerRequest request);
        Response<GetTournamentIdsResponse> GetTemporaryOrganizerTournaments(TxSessionCredentials credentials);
    }
}
