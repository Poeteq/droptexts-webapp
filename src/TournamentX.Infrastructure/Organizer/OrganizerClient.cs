using System.Net.Http;
using TournamentX.Infrastructure;
using TournamentX.Core.Config;
using TournamentX.Core.Interface;
using TournamentX.Core.Entities;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Models;

namespace TournamentX.Core.Client
{

    public class OrganizerClient : BaseClient, IOrganizerClient
    {
        private static readonly string TEMPORARY_ORGANIZER = "/api/user/temporaryOrganizer";
        private static readonly string TEMPORARY_ORGANIZER_LOGIN = "/api/user/temporaryOrganizer/login";
        private static readonly string TEMPORARY_ORGANIZER_GET_TOURNAMENTS = "/api/user/temporaryOrganizer/getTournaments";

        HttpClient client;
        public OrganizerClient(IHttpClientFactory httpClient, IAppConfig appConfig)
            : base(httpClient, appConfig)
        {
            client = httpClient.CreateClient(CoreApiClient);
        }
        public Response<GetAccessTokenResponse> GenerateTemporaryOrganizer(TxSessionCredentials credentials, GenerateTemporaryOrganizerRequest request)
        {
            client.DefaultRequestHeaders.Add("SessionId", credentials.SessionId);
            var response = client.PostAsync(TEMPORARY_ORGANIZER, RequestSerializer.Content(request)).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<GetAccessTokenResponse>>(response.Content.ReadAsStringAsync().Result);
            }

            return new Response<GetAccessTokenResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<TxSessionCredentials> TemporaryLogin(TemporaryLoginRequest request)
        {
            var response = client.PostAsync(TEMPORARY_ORGANIZER_LOGIN, RequestSerializer.Content(request)).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<TxSessionCredentials>>(response.Content.ReadAsStringAsync().Result);
            }
            return new Response<TxSessionCredentials>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }

        public Response<GetTournamentIdsResponse> GetTemporaryOrganizerTournaments(TxSessionCredentials credentials)
        {
            client.DefaultRequestHeaders.Add("UserId", credentials.UserId);
            var response = client.PostAsync(TEMPORARY_ORGANIZER_GET_TOURNAMENTS, null).Result;
            if (response.IsSuccessStatusCode)
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<Response<GetTournamentIdsResponse>>(response.Content.ReadAsStringAsync().Result);
            }

            return new Response<GetTournamentIdsResponse>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }
    }
}
