using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using System;

namespace TournamentX.Web.IntegrationTests
{
    public class CustomWebApplicationFactory : WebApplicationFactory<Startup>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            base.ConfigureWebHost(builder);
            var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            if (string.IsNullOrEmpty(environmentName))
                throw new ArgumentException(
                    $"{nameof(CustomWebApplicationFactory)}.{nameof(ConfigureWebHost)} needs environment variable ASPNETCORE_ENVIRONMENT to set environment.");
            builder.UseEnvironment(environmentName);
        }
    }
}
