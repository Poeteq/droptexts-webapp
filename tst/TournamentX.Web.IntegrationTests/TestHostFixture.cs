using System.Net.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

using TournamentX.Web;
using TournamentX.Web.Helpers;
using TournamentX.Web.IntegrationTests.Mocks;

/// <summary>
/// One instance of this will be created per test collection.
/// </summary>
public class TestHostFixture : ICollectionFixture<WebApplicationFactory<Startup>>
{
    public HttpClient Client;
    public WebApplicationFactory<Startup> factory;

    public TestHostFixture()
    {
        factory = new WebApplicationFactory<Startup>();
        Client = factory.CreateClient();
    }

    public HttpClient ClientWithMockedAuthorization()
    {
        void ConfigureTestServices(IServiceCollection services) =>
                services.AddTransient<IRequestFieldExtractor, MockRequestFieldExtractor>();

        return factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureTestServices(ConfigureTestServices);
        })
        .CreateClient();
    }
}