using FluentAssertions;
using System.Net;
using System.Threading.Tasks;
using Xunit;

using TournamentX.Core.Models.Requests;
using TournamentX.Infrastructure;

namespace TournamentX.Web.IntegrationTests.Api
{
    [Collection("Integration tests collection")]
    public class TournamentControllerTest : BaseControllerTest
    {
        #region Private
        private static readonly string TEST_TOURNAMENT_ID = "foo";
        #endregion

        #region Constructor
        public TournamentControllerTest(TestHostFixture testHostFixture) : base(testHostFixture) { }
        #endregion

        #region Integration Tests
        [Fact]
        public async Task TestGetTournaments()
        {
            // Arrange

            // Act
            var client = _testHostFixture.ClientWithMockedAuthorization();
            var response = await client.GetAsync("/api/tournament/all");

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task TestCreateTournament()
        {
            // Arrange
            int TEST_STYLE_ID = 1;
            int TEST_NUM_OF_STATIONS = 4;
            var request = new CreateTournamentRequest(TEST_TOURNAMENT_ID, TEST_STYLE_ID, TEST_NUM_OF_STATIONS);

            // Act
            var client = _testHostFixture.Client;
            var response = await client.PostAsync("/api/tournament/create", RequestSerializer.Content(request));

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task TestLaunchTournament()
        {
            // Arrange
            int playersPerPool = 32;
            int numOfStations = 4;
            var request = new LaunchTournamentRequest(playersPerPool, numOfStations);

            // Act
            var client = _testHostFixture.Client;
            var response = await client.PostAsync($"/api/tournament/{TEST_TOURNAMENT_ID}/start", RequestSerializer.Content(request));

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task TestResetTournament()
        {
            // Arrange

            // Act
            var client = _testHostFixture.ClientWithMockedAuthorization();
            var response = await client.GetAsync($"/api/tournament/{TEST_TOURNAMENT_ID}/reset");

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);
        }


        [Fact]
        public async Task TestAddPlayer()
        { 
            // Arrange
            var request = new PlayerRequest();
            request.Name = "Tom";

            // Act
            var client = _testHostFixture.ClientWithMockedAuthorization();
            var response = await client.PostAsync($"/api/tournament/{TEST_TOURNAMENT_ID}/player", RequestSerializer.Content(request));

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);

        }

        [Fact]
        public async Task TestSwapPlayers()
        {
            // Arrange
            int playerIndex1 = 2;
            int playerIndex2 = 1;

            // Act
            var client = _testHostFixture.ClientWithMockedAuthorization();
            var response = await client.GetAsync($"/api/tournament/{TEST_TOURNAMENT_ID}/swap?index1={playerIndex1}&index2={playerIndex2}");

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task TestDeletePlayer()
        {
            // Arrange
            int playerSeed = 2;

            // Act
            var client = _testHostFixture.ClientWithMockedAuthorization();
            var response = await client.DeleteAsync($"/api/tournament/{TEST_TOURNAMENT_ID}/player?seed={playerSeed}");

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);
        }
        #endregion
    }
}
