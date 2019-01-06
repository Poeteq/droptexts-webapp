namespace TournamentX.Web.IntegrationTests.Api
{
    public class BaseControllerTest
    {
        public TestHostFixture _testHostFixture;

        public BaseControllerTest(TestHostFixture testHostFixture)
        {
            _testHostFixture = testHostFixture;
        }
    }
}
