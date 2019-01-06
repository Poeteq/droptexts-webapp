using System.Collections.Generic;
using TournamentX.Core.Interface;
using TournamentX.Core.Entities;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Validation;
using TournamentX.Core.Models;

namespace TournamentX.Core.Services
{
    public class TournamentService
    {
        ITournamentClient tournamentClient;
        public TournamentService(ITournamentClient tournamentClient)
        {
            this.tournamentClient = tournamentClient;
        }

        public Response<EmptyResponse> GetTournament()
        {
            var response = tournamentClient.GetTournament();
            return response;
        }

        public Response<EmptyResponse> LaunchTournament(string tournamentId, LaunchTournamentRequest request)
        {
            var response = tournamentClient.LaunchTournament(tournamentId, request);
            return response;
        }

        public Response<EmptyResponse> ResetTournament(TxSessionCredentials userCredentials, string tournamentId)
        {
            RequestPreconditions.CheckNotNull(userCredentials, "userCredentials");
            return tournamentClient.ResetTournament(userCredentials, tournamentId);
        }

        //private List<string> GetUserTournaments(TxSessionCredentials user)
        //{
        //    if (user.IsAdmin) return null;

        //    Response<GetTournamentIdsResponse> response = tournamentClient.GetTournamentIds(user);
        //    return response.Payload == null ? null : response.Payload.Tournaments;
        //}

        private List<Tournament> FilterUserTournaments(TxSessionCredentials user, IEnumerable<Tournament> tournaments, List<string> userTournaments)
        {
            if (userTournaments == null)
            {
                return (List<Tournament>)tournaments;
            }

            List<Tournament> filteredTournaments = new List<Tournament>();
            foreach (var tournament in tournaments)
            {
                if (userTournaments.IndexOf(tournament.TournamentId) > -1)
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
            //response.Payload.Tournaments = FilterUserTournaments(userCredentials, response.Payload.Tournaments, userCredentials.Tournaments);
            return response;
        }

        public Response<EmptyResponse> CreateTournament(CreateTournamentRequest request)
        {
            var response = tournamentClient.CreateTournament(request);
            return response;
        }

        public Response<GetLogsResponse> GetLogs(string tournamentId)
        {
            return tournamentClient.GetLogs(tournamentId);
        }


        public Response<EmptyResponse> SwapPlayers(TxSessionCredentials credentials, string tournamentId, string index1, string index2)
        {
            return tournamentClient.SwapPlayers(credentials, tournamentId, index1, index2);
        }

        public Response<EmptyResponse> AddPlayer(TxSessionCredentials credentials, string tournamentId, PlayerRequest request)
        {
            return tournamentClient.AddPlayer(credentials, tournamentId, request);
        }

        public Response<EmptyResponse> DeletePlayer(TxSessionCredentials credentials, string tournamentId, int seed)
        {
            return tournamentClient.DeletePlayer(credentials, tournamentId, seed);
        }

        private GetAccessTokenRequest BuildGetAccessTokenRequest(string email, string name)
        {
            return new GetAccessTokenRequest { Email = email, Name = name };
        }
    }
}
