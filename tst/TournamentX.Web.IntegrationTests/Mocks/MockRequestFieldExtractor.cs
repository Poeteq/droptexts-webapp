using TournamentX.Core.Models;
using TournamentX.Web.Helpers;

namespace TournamentX.Web.IntegrationTests.Mocks
{
    public class MockRequestFieldExtractor : IRequestFieldExtractor
    {

        public TxSessionCredentials ExtractTomUserSessionCredentialsData { get; set; } = new TxSessionCredentials("foo", "bar");

        public MockRequestFieldExtractor() { }

        public MockRequestFieldExtractor(TxSessionCredentials credentials)
        {
            ExtractTomUserSessionCredentialsData = credentials;
        }

        public TxSessionCredentials ExtractTomUserSessionCredentials()
        {
            return ExtractTomUserSessionCredentialsData;
        }

        public void StoreTomUserSessionCredentials<T>(T obj)
        {
            ExtractTomUserSessionCredentialsData = obj as TxSessionCredentials;
        }

        public void ClearTomUserSessionCredentials()
        {
            ExtractTomUserSessionCredentialsData = null;
        }
    }
}
