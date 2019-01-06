using TournamentX.Core.Models;
using TournamentX.Web.Tests.Mocks;

namespace TournamentX.Web.Tests.Api
{
    public class BaseControllerTest
    {
        #region Private
        public static readonly TxSessionCredentials CREDENTIALS = new TxSessionCredentials("foo", "bar");
        #endregion

        #region Mocks
        public MockRequestFieldExtractor requestFieldExtractor;
        #endregion 

        #region Constructor
        public BaseControllerTest()
        {
            requestFieldExtractor = new MockRequestFieldExtractor(CREDENTIALS);
        }
        #endregion 
    }
}
