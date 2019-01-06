using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using Xunit;

using TournamentX.Core.Interface;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Entities;
using TournamentX.Core.Models.Requests;
using TournamentX.Web.Api;

namespace TournamentX.Web.Tests.Api
{
    public class TournamentControllerTest : BaseControllerTest
    {
        #region Private
        private static readonly string TEST_TOURNAMENT_ID = "foo";
        private static readonly Tournament SAMPLE_TOURNAMENT = new Tournament();
        #endregion

        #region Tests
        [Fact]
        public void TestGetTournaments()
        {
            // Arrange
            var expectedTournaments = new List<Tournament> { SAMPLE_TOURNAMENT };
            var expectedPayload = new GetTournamentsResponse { Tournaments = expectedTournaments };
            var expectedResponse = new Response<GetTournamentsResponse>(expectedPayload);

            var mockClient = new Mock<ITournamentClient>();
            mockClient.Setup(client => client.GetTournaments(CREDENTIALS))
                .Returns(expectedResponse.WithSuccess());

            // Act
            var tournamentController = new TournamentController(
                requestFieldExtractor,
                mockClient.Object);

            var result = tournamentController.GetTournaments() as OkObjectResult;
            var response = result.Value as Response<GetTournamentsResponse>;

            // Assert
            Assert.NotNull(response);
            Assert.True(response.IsSuccessStatusCode);
            Assert.Equal(expectedResponse.Payload, response.Payload);
        }

        [Fact]
        public void TestCreateTournament()
        {
            // Arrange
            int TEST_STYLE_ID = 1;
            int TEST_NUM_OF_STATIONS = 4;

            var request = new CreateTournamentRequest(TEST_TOURNAMENT_ID, TEST_STYLE_ID, TEST_NUM_OF_STATIONS);
            var expectedResponse = new Response<EmptyResponse>();

            var mockClient = new Mock<ITournamentClient>();
            mockClient.Setup(client => client.CreateTournament(request))
                .Returns(expectedResponse.WithSuccess());

            // Act
            var tournamentController = new TournamentController(
                requestFieldExtractor,
                mockClient.Object);

            var result = tournamentController.CreateTournament(request) as OkObjectResult;
            var response = result.Value as Response<EmptyResponse>;

            // Assert
            Assert.NotNull(response);
            Assert.True(response.IsSuccessStatusCode);
        }

        [Fact]
        public void TestLaunchTournament()
        {
            // Arrange
            int playersPerPool = 32;
            int numOfStations = 4;
            var request = new LaunchTournamentRequest(playersPerPool, numOfStations);
            var expectedResponse = new Response<EmptyResponse>();

            var mockClient = new Mock<ITournamentClient>();
            mockClient.Setup(client => client.LaunchTournament(TEST_TOURNAMENT_ID, request))
                .Returns(expectedResponse.WithSuccess());

            // Act
            var tournamentController = new TournamentController(
                requestFieldExtractor,
                mockClient.Object);

            var result = tournamentController.LaunchTournament(TEST_TOURNAMENT_ID, request) as OkObjectResult;
            var response = result.Value as Response<EmptyResponse>;

            // Assert
            Assert.NotNull(response);
            Assert.True(response.IsSuccessStatusCode);
            Assert.Equal(expectedResponse.Payload, response.Payload);
        }

        [Fact]
        public void TestResetTournament()
        {
            // Arrange
            var expectedResponse = new Response<EmptyResponse>();

            var mockClient = new Mock<ITournamentClient>();
            mockClient.Setup(client => client.ResetTournament(CREDENTIALS, TEST_TOURNAMENT_ID))
                .Returns(expectedResponse.WithSuccess());

            // Act
            var tournamentController = new TournamentController(
                requestFieldExtractor,
                mockClient.Object);

            var result = tournamentController.ResetTournament(TEST_TOURNAMENT_ID) as OkObjectResult;
            var response = result.Value as Response<EmptyResponse>;

            // Assert
            Assert.NotNull(response);
            Assert.True(response.IsSuccessStatusCode);
            Assert.Equal(expectedResponse.Payload, response.Payload);
        }

        [Fact]
        public void TestSwapPlayers()
        {
            // Arrange
            string[] testPlayerPositions = new string[] { "1", "3" };
            var expectedResponse = new Response<EmptyResponse>();

            var mockClient = new Mock<ITournamentClient>();
            mockClient.Setup(client => client.SwapPlayers(CREDENTIALS, TEST_TOURNAMENT_ID, testPlayerPositions[0], testPlayerPositions[1]))
                .Returns(expectedResponse.WithSuccess());

            // Act
            var tournamentController = new TournamentController(
                requestFieldExtractor,
                mockClient.Object);

            var result = tournamentController.SwapPlayers(TEST_TOURNAMENT_ID, testPlayerPositions[0], testPlayerPositions[1]) as OkObjectResult;
            var response = result.Value as Response<EmptyResponse>;

            // Assert
            Assert.NotNull(response);
            Assert.True(response.IsSuccessStatusCode);
            Assert.Equal(expectedResponse.Payload, response.Payload);
        }

        [Fact]
        public void TestDeletePlayer()
        {
            // Arrange
            int testPlayerSeed = 0;
            var expectedResponse = new Response<EmptyResponse>();

            var mockClient = new Mock<ITournamentClient>();
            mockClient.Setup(client => client.DeletePlayer(CREDENTIALS, TEST_TOURNAMENT_ID, testPlayerSeed))
                .Returns(expectedResponse.WithSuccess());

            // Act
            var tournamentController = new TournamentController(
                requestFieldExtractor,
                mockClient.Object);

            var result = tournamentController.DeletePlayer(TEST_TOURNAMENT_ID, testPlayerSeed) as OkObjectResult;
            var response = result.Value as Response<EmptyResponse>;

            // Assert
            Assert.NotNull(response);
            Assert.True(response.IsSuccessStatusCode);
            Assert.Equal(expectedResponse.Payload, response.Payload);
        }
        #endregion
    }
}
