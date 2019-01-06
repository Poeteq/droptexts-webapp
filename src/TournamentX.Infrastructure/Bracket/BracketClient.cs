using System.Net.Http;
using TournamentX.Core.Config;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Infrastructure;

namespace TournamentX.Core.Interfaces
{
    public class BracketClient : BaseClient, IBracketClient
    {
        HttpClient client;
        public BracketClient(IHttpClientFactory httpClient, IAppConfig appConfig)
            : base(httpClient, appConfig)
        {
            client = httpClient.CreateClient(CoreApiClient);
        }

        public Response<EmptyResponse> UpdateMatch(
            TxSessionCredentials credentials, 
            string bracketId, 
            UpdateMatchRequest request)
        {
            client.DefaultRequestHeaders.Add("UserId", credentials.UserId);
            client.DefaultRequestHeaders.Add("SessionId", credentials.SessionId);
            var response = client.PostAsync($"bracket/{bracketId}/match", RequestSerializer.Content(request)).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }

            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<EmptyResponse> SendNotification(TxSessionCredentials credentials, string bracketId, string matchId, SendNotificationRequest request)
        {
            client.DefaultRequestHeaders.Add("UserId", credentials.UserId);
            client.DefaultRequestHeaders.Add("SessionId", credentials.SessionId);
            var response = client.PostAsync($"bracket/{bracketId}/match/{matchId}/notification", RequestSerializer.Content(request)).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }
            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }
    }
}
