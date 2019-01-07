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
    public class AdminClient : BaseClient, IAdminClient
    {
        private static readonly string ADMIN_LOGIN = "/api/user/admin/login";

        HttpClient client;
        public AdminClient(IHttpClientFactory httpClient, IAppConfig appConfig)
            : base(httpClient, appConfig)
        {
            client = httpClient.CreateClient(CoreApiClient);
        }

        public Response<UserIdentity> Login(AdminLoginRequest request)
        {
            var response = client.PostAsync(ADMIN_LOGIN, RequestSerializer.Content(request)).Result;
            if (response.IsSuccessStatusCode)
            {
                var userResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<Response<UserIdentity>>(response.Content.ReadAsStringAsync().Result);
                return userResponse;
            }
            return new Response<UserIdentity>(response.RequestMessage.ToString(), (int)response.StatusCode);
        }
    }
}
