using Microsoft.AspNetCore.Http;
using TournamentX.Core.Models;
using TournamentX.Web.Extensions;

namespace TournamentX.Web.Helpers
{
    public interface IRequestFieldExtractor
    {
        TxSessionCredentials ExtractTomUserSessionCredentials();
        void StoreTomUserSessionCredentials<T>(T obj);
        void ClearTomUserSessionCredentials();
    }

    public class RequestFieldExtractor : IRequestFieldExtractor
    {
        private static readonly string SessionKey = "_TomUserSessionKey";

        private static IHttpContextAccessor _accessor;
        public static HttpContext HttpContext => _accessor.HttpContext;
        public static void Configure(IHttpContextAccessor httpContextAccessor)
        {
            _accessor = httpContextAccessor;
        }

        public TxSessionCredentials ExtractTomUserSessionCredentials()
        {
            return HttpContext.Session.Get<TxSessionCredentials>(SessionKey);
        }

        public void StoreTomUserSessionCredentials<T>(T obj)
        {
            HttpContext.Session.Set(SessionKey, obj);
        }

        public void ClearTomUserSessionCredentials()
        {
            HttpContext.Session.Remove(SessionKey);
        }
    }
}
