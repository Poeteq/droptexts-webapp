using System.Net.Http;
using TournamentX.Core.Config;
using TournamentX.Core.Interface;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Infrastructure.Tournaments
{
    public class TournamentClient : BaseClient, ITournamentClient
    {
        HttpClient client;
        public TournamentClient(IHttpClientFactory httpClient, IAppConfig appConfig)
            : base(httpClient, appConfig)
        {
            client = httpClient.CreateClient(CoreApiClient);
        }
        public Response<EmptyResponse> CreateTournament(CreateTournamentRequest request)
        {
            var response = client.PostAsync("tournament", RequestSerializer.Content(request)).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }
            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<EmptyResponse> GetTournament()
        {
            var response = client.GetAsync("tournament/all").Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }
            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<GetTournamentsResponse> GetTournaments(TxSessionCredentials credentials)
        {
            client.DefaultRequestHeaders.Add("UserId", credentials.UserId);
            client.DefaultRequestHeaders.Add("SessionId", credentials.SessionId);
            var response = client.GetAsync($"tournament/all").Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<GetTournamentsResponse>>(response.Content.ReadAsStringAsync().Result);
            }
            return new Response<GetTournamentsResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<GetTournamentIdsResponse> GetUserTournaments(TxSessionCredentials credentials)
        {
            var response = client.PostAsync($"user/temporaryOrganizer/{credentials.UserId}/tournaments", null).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<GetTournamentIdsResponse>>(response.Content.ReadAsStringAsync().Result);
            }
            return new Response<GetTournamentIdsResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }


        public Response<EmptyResponse> LaunchTournament(string tournamentId, LaunchTournamentRequest request)
        {
            var response = client.PostAsync($"tournament/{tournamentId}/start", RequestSerializer.Content(request)).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }

            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<EmptyResponse> ResetTournament(TxSessionCredentials credentials, string tournamentId)
        {
            client.DefaultRequestHeaders.Add("UserId", credentials.UserId);
            client.DefaultRequestHeaders.Add("SessionId", credentials.SessionId);
            var response = client.GetAsync($"tournament/{tournamentId}/reset").Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }

            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<GetLogsResponse> GetLogs(string tournamentId)
        {
            var response = client.GetAsync($"tournament/{tournamentId}/logs").Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<GetLogsResponse>>(response.Content.ReadAsStringAsync().Result);
            }

            return new Response<GetLogsResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<EmptyResponse> SwapPlayers(TxSessionCredentials credentials, string tournamentId, string index1, string index2)
        {
            client.DefaultRequestHeaders.Add("UserId", credentials.UserId);
            client.DefaultRequestHeaders.Add("SessionId", credentials.SessionId);
            var response = client.GetAsync($"tournament/{tournamentId}/player/seeds?player1Seed={index1}&player2Seed={index2}").Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }

            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<EmptyResponse> AddPlayer(TxSessionCredentials credentials, string tournamentId, PlayerRequest request)
        {
            client.DefaultRequestHeaders.Add("UserId", credentials.UserId);
            client.DefaultRequestHeaders.Add("SessionId", credentials.SessionId);
            var response = client.PostAsync($"tournament/{tournamentId}/player", RequestSerializer.Content(request)).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }
            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<EmptyResponse> DeletePlayer(TxSessionCredentials credentials, string tournamentId, int seed)
        {
            client.DefaultRequestHeaders.Add("UserId", credentials.UserId);
            client.DefaultRequestHeaders.Add("SessionId", credentials.SessionId);
            var response = client.DeleteAsync($"tournament/{tournamentId}/player/{seed}").Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }
            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }
        

    }
}
