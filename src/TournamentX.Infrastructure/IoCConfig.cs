using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using TournamentX.Core.Interface;
using TournamentX.Core.Client;
using TournamentX.Core.Config;
using TournamentX.Infrastructure.Tournaments;
using TournamentX.Core.Interfaces;
using TournamentX.Infrastructure.Message;

namespace TournamentX.Infrastructure
{
    public static class IoCConfig
    {
        public static void TomRegisterServices(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddScoped<ITournamentClient, TournamentClient>();
            services.AddScoped<IAdminClient, AdminClient>();
            services.AddScoped<IOrganizerClient, OrganizerClient>();
            services.AddScoped<IMessageProvider, MessageProvider>();

            var appConfig = new AppConfig();
            Configuration.GetSection("Config").Bind(appConfig);
            services.AddSingleton<IAppConfig>(appConfig);
            services.AddHttpClient("CoreApiClient", client =>
            {
                client.BaseAddress = new Uri(Configuration["Config:CoreApiBaseAddress"]);
                client.DefaultRequestHeaders.Add("appId", Configuration["Config:AppId"]);
                client.DefaultRequestHeaders.Add("siteId", Configuration["Config:SiteId"]);
            });
        }
    }
}
