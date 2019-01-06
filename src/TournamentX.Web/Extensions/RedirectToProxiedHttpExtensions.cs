using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;

namespace TournamentX.Web.Extensions
{
    public static class RedirectToProxiedHttpsExtensions
    {
        public static ForwardedHeadersOptions GetForwardedHeadersOptions()
        {
            ForwardedHeadersOptions forwardedHeadersOptions = new ForwardedHeadersOptions()
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            };

            forwardedHeadersOptions.KnownNetworks.Clear();
            forwardedHeadersOptions.KnownProxies.Clear();

            return forwardedHeadersOptions;
        }
    }
}
