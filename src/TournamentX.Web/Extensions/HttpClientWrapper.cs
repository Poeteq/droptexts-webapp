using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TournamentX.Core.Models;

namespace TournamentX.Web.Extensions
{
    public interface IHttpClientWrapper { }

    public class HttpClientWrapper : IHttpClientWrapper
    {
        //private readonly ITokenProvider _tokenProvider;
        //private readonly IJsonManager _jsonManager;
        private HttpClient _client;

        // you can inject the interfaces
        public HttpClientWrapper(
            //ITokenProvider tokenProvider,
            //IJsonManager jsonManager
            )
        {
            //_tokenProvider = tokenProvider;
            //_jsonManager = jsonManager;
        }

        // who set this property?
        public string BaseAddress { get; set; }

        // this is just to demonstrate a simple reuse technique. you can do it in other ways. (singleton, DI, static)
        public HttpClient Client => _client ?? (_client = new HttpClient());

        public Task<T> GetAsync<T>(string uri, string clientId)
        {
            return InvokeAsync<T>(
               clientId,
               client => client.GetAsync(uri),
               response => response.Content.ReadAsAsync<T>());
        }

        public Task<T> PostAsJsonAsync<T>(object data, string uri, string clientId)
        {
            return InvokeAsync<T>(
               clientId,
               client => client.PostAsJsonAsync(uri, data),
               response => response.Content.ReadAsAsync<T>());
        }

        public Task PostAsJsonAsync(object data, string uri, string clientId)
        {
            return InvokeAsync<object>(
                clientId,
                client => client.PostAsJsonAsync(uri, data));
        }

        public Task PutAsJsonAsync(object data, string uri, string clientId)
        {
            return InvokeAsync<object>(
                clientId,
                client => client.PutAsJsonAsync(uri, data));
        }

        public Task<T> PutAsJsonAsync<T>(object data, string uri, string clientId)
        {
            return InvokeAsync<T>(
                clientId,
                client => client.PutAsJsonAsync(uri, data),
                response => response.Content.ReadAsAsync<T>());
        }

        private async Task<T> InvokeAsync<T>(
            string clientId,
            Func<HttpClient, Task<HttpResponseMessage>> operation,
            Func<HttpResponseMessage, Task<T>> actionOnResponse = null)
        {
            if (operation == null)
                throw new ArgumentNullException(nameof(operation));
            // consider to make pre check validation also to clientId argument if it's needed

            var token = ""; // GetToken();

            ConfigurateHttpClient(_client, token, clientId);

            HttpResponseMessage response = await operation(_client).ConfigureAwait(false);

            if (!response.IsSuccessStatusCode)
            {
                var exception = new Exception($"Resource server returned an error. StatusCode : {response.StatusCode}");
                exception.Data.Add("StatusCode", response.StatusCode);
                throw exception;
            }
            if (actionOnResponse != null)
            {
                return await actionOnResponse(response).ConfigureAwait(false);
            }
            else
            {
                return default(T);
            }
        }

        //private string GetToken()
        //{
        //    // if IsTokenNullOrExpired return null and not string.Empty, you can do the foloowing:
        //    var token = await _tokenProvider.IsTokenNullOrExpired() ?? await _tokenProvider.GetTokenAsync();
        //    if (string.IsNullOrEmpty(token))
        //    {
        //        var exception = new Exception();
        //        exception.Data.Add("StatusCode", HttpStatusCode.Unauthorized);
        //        throw exception;
        //    }
        //    //else, do this:
        //    string token = await _tokenProvider.IsTokenNullOrExpired();
        //    if (string.IsNullOrEmpty(token))
        //    {
        //        token = await _tokenProvider.GetTokenAsync();
        //        if (string.IsNullOrEmpty(token))
        //        {
        //            var exception = new Exception();
        //            exception.Data.Add("StatusCode", HttpStatusCode.Unauthorized);
        //            throw exception;
        //        }
        //    }
        //    return token;
        //}

        private void ConfigurateHttpClient(HttpClient client, string bearerToken, string resourceServiceClientName)
        {
            // do this first
            if (string.IsNullOrEmpty(BaseAddress))
            {
                throw new Exception("BaseAddress is required!");
            }
            // consider to do pre check also for arguments if it make sense

            if (!string.IsNullOrEmpty(resourceServiceClientName))
            {
                client.DefaultRequestHeaders.Add("CN", resourceServiceClientName);
            }

            client.BaseAddress = new Uri(BaseAddress);
            client.Timeout = new TimeSpan(0, 0, 0, 10);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
        }
    }
}
