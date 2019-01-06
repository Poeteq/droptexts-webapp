using System.Collections.Generic;
using TournamentX.Core.Interface;
using TournamentX.Core.Entities;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Models;

namespace TournamentX.Core.Services
{
    public class OrganizerService
    {
        IOrganizerClient orgClient;
        public OrganizerService(IOrganizerClient orgClient)
        {
            this.orgClient = orgClient;
        }
        
        public Response<TxSessionCredentials> TemporaryLogin(TemporaryLoginRequest request)
        {
            return orgClient.TemporaryLogin(request);
        }

        private List<string> GetUserTournaments(TxSessionCredentials user)
        {
            if (user.IsAdmin) return null;

            Response<GetTournamentIdsResponse> response = orgClient.GetTemporaryOrganizerTournaments(user);
            return response.Payload?.Tournaments;
        }

        private List<Tournament> FilterUserTournaments(TxSessionCredentials user, IEnumerable<Tournament> tournaments)
        {
            List<string> usersTournyIds = GetUserTournaments(user);
            if (usersTournyIds == null) return (List<Tournament>)tournaments;

            List<Tournament> filteredTournaments = null as List<Tournament>;
            foreach (var tournament in tournaments)
            {
                if (usersTournyIds.IndexOf(tournament.TournamentId) > -1)
                {
                    filteredTournaments.Add(tournament);
                }
            }
            return filteredTournaments;
        }

        public Response<GetAccessTokenResponse> GetAccessToken(TxSessionCredentials credentials, GenerateTemporaryOrganizerRequest request)
        {
            return orgClient.GenerateTemporaryOrganizer(credentials, request);
        }
    }
}
