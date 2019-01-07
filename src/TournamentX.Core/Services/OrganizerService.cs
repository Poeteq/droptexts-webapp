using System.Collections.Generic;
using TournamentX.Core.Interface;
using TournamentX.Core.Entities;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Models;
using TournamentX.Core.Validation;

namespace TournamentX.Core.Service
{
    public class OrganizerService
    {
        IOrganizerClient orgClient;
        ITournamentClient tournamentClient;
        public OrganizerService(IOrganizerClient orgClient, ITournamentClient tournamentClient)
        {
            this.orgClient = orgClient;
            this.tournamentClient = tournamentClient;
        }
        
        public Response<UserIdentity> TemporaryLogin(TemporaryLoginRequest request)
        {
            return orgClient.TemporaryLogin(request);
        }

        private List<string> GetUserTournaments(TxSessionCredentials user)
        {
            if (user.IsAdmin) return null;

            Response<GetTournamentIdsResponse> response = orgClient.GetTemporaryOrganizerTournaments(user);
            return response.Payload == null ? null : response.Payload.Tournaments;
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

        public Response<GetTournamentsResponse> GetTournaments(TxSessionCredentials userCredentials)
        {
            RequestPreconditions.CheckNotNull(userCredentials, "userCredentials");

            Response<GetTournamentsResponse> response = tournamentClient.GetTournaments(userCredentials);
            RequestPreconditions.CheckNotNull(response.Payload?.Tournaments, "tournaments");
            response.Payload.Tournaments = FilterUserTournaments(userCredentials, response.Payload.Tournaments);
            return response;
        }
    }
}
