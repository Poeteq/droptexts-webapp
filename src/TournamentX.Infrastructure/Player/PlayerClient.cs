using System.Net.Http;
using TournamentX.Core.Config;
using TournamentX.Core.Interfaces;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Infrastructure.Player
{
    public class PlayerClient : BaseClient, IPlayerClient
    {
        HttpClient client;
        public PlayerClient(IHttpClientFactory httpClient, IAppConfig appConfig)
            : base(httpClient, appConfig)
        {
            client = httpClient.CreateClient(CoreApiClient);
        }

        public Response<EmptyResponse> UpdatePlayer(TxSessionCredentials credentials, PlayerRequest request)
        {
            client.DefaultRequestHeaders.Add("UserId", credentials.UserId);
            client.DefaultRequestHeaders.Add("SessionId", credentials.SessionId);
            var response = client.PostAsync($"players/{request.Id}/notifications", RequestSerializer.Content(request)).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<EmptyResponse>>(response.Content.ReadAsStringAsync().Result);
            }
            return new Response<EmptyResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

    }
}
