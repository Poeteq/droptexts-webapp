using System.Net.Http;
using TournamentX.Core.Config;
using TournamentX.Core.Models;

namespace TournamentX.Infrastructure
{
    public class BaseClient
    {
        protected readonly IHttpClientFactory httpClient;
        protected readonly IAppConfig appConfig;
        protected const string CoreApiClient = "CoreApiClient";

        public BaseClient(IHttpClientFactory httpClient, IAppConfig appConfig)
        {
            this.httpClient = httpClient;
            this.appConfig = appConfig;
        }
    }
}
