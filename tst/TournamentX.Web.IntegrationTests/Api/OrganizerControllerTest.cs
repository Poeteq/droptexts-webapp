using FluentAssertions;
using System.Net;
using System.Threading.Tasks;
using Xunit;

using TournamentX.Core.Models.Requests;
using TournamentX.Infrastructure;

namespace TournamentX.Web.IntegrationTests.Api
{
    [Collection("Integration tests collection")]
    public class OrganizerControllerTest : BaseControllerTest
    {
        #region Private
        private static readonly string TEST_TOURNAMENT_ID = "foo";
        private static readonly string TEST_NAME = "Tom";
        private static readonly string TEST_EMAIL = "tom@tournamentx.com";
        #endregion

        #region Constructor
        public OrganizerControllerTest(TestHostFixture testHostFixture) : base(testHostFixture) {}
        #endregion

        #region Integration Tests
        [Fact]
        public async Task TestTempLogin_WrongPostBody()
        {
            // Arrange
            var request = new TemporaryLoginRequest("helloworld", TEST_EMAIL);

            // Act
            var client = _testHostFixture.Client;
            var response = await client.PostAsync("/api/organizer/login", RequestSerializer.Content(request));

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task TestTempLogin()
        {
            // Arrange
            var request = new TemporaryLoginRequest("x1ckkk", TEST_EMAIL);

            // Act
            var client = _testHostFixture.Client;
            var response = await client.PostAsync("/api/organizer/login", RequestSerializer.Content(request));

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task TestGrantAccessToken_WrongPostBody()
        {
            // Arrange
            var request = new GenerateTemporaryOrganizerRequest();

            // Act
            var client = _testHostFixture.Client;
            var response = await client.PostAsync("/api/organizer/accessToken", RequestSerializer.Content(request));

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task TestGrantAccessToken()
        {
            // Arrange
            var request = new GenerateTemporaryOrganizerRequest(TEST_TOURNAMENT_ID, TEST_NAME, TEST_EMAIL);

            // Act
            var client = _testHostFixture.ClientWithMockedAuthorization();
            var response = await client.PostAsync("/api/organizer/accessToken", RequestSerializer.Content(request));

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);
        }
#endregion
    }
}
