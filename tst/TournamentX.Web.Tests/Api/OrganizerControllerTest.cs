using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

using TournamentX.Core.Interface;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Web.Api;

namespace TournamentX.Web.Tests.Api
{
    public class OrganizerControllerTest : BaseControllerTest
    {
        private static readonly string TEST_TOURNAMENT_ID = "foo";
        private static readonly string TEST_NAME = "Tom";
        private static readonly string TEST_EMAIL = "tom@tournamentx.com";
        private static readonly string TEST_TOKEN = "bar";

        [Fact]
        public void TestTempLogin()
        {
            // Arrange
            var request = new TemporaryLoginRequest(TEST_TOKEN, TEST_EMAIL);
            var expectedResponse = new Response<TxSessionCredentials>(CREDENTIALS);

            var mockClient = new Mock<IOrganizerClient>();
            mockClient.Setup(client => client.TemporaryLogin(request))
                .Returns(expectedResponse.WithSuccess());

            // Act
            var organizerController = new OrganizerController(
                requestFieldExtractor,
                mockClient.Object);

            var result = organizerController.TempLogin(request) as OkObjectResult;
            var response = result.Value as Response<TxSessionCredentials>;

            // Assert
            Assert.NotNull(response);
            Assert.True(response.IsSuccessStatusCode);
            Assert.False(response.Payload.IsAdmin);
            Assert.Equal(expectedResponse.Payload, response.Payload);
        }

        [Fact]
        public void TestGrantAccessToken()
        {
            // Arrange
            var request = new GenerateTemporaryOrganizerRequest(TEST_TOURNAMENT_ID, TEST_NAME, TEST_EMAIL);
            var expectedPayload = new GetAccessTokenResponse();
            expectedPayload.Token = TEST_TOKEN;
            var expectedResponse = new Response<GetAccessTokenResponse>(expectedPayload);

            var mockClient = new Mock<IOrganizerClient>();
            mockClient.Setup(client => client.GenerateTemporaryOrganizer(CREDENTIALS, request))
                .Returns(expectedResponse.WithSuccess());

            // Act
            var organizerController = new OrganizerController(
                requestFieldExtractor,
                mockClient.Object);

            var result = organizerController.GrantAccessToken(request) as OkObjectResult;
            var response = result.Value as Response<GetAccessTokenResponse>;

            // Assert
            Assert.NotNull(response);
            Assert.True(response.IsSuccessStatusCode);
            Assert.Equal(expectedResponse.Payload, response.Payload);
        }

        //[Fact]
        //public void TestGrantAccessToken_WrongPostBody()
        //{
        //    // Arrange
        //    var request = new GenerateTemporaryOrganizerRequest();
        //    var expectedPayload = new GetAccessTokenResponse();
        //    expectedPayload.Token = TEST_TOKEN;
        //    var expectedResponse = new Response<GetAccessTokenResponse>(expectedPayload);

        //    var mockClient = new Mock<IOrganizerClient>();
        //    mockClient.Setup(client => client.GenerateTemporaryOrganizer(CREDENTIALS, request))
        //        .Returns(expectedResponse.WithSuccess());

        //    // Act
        //    var organizerController = new OrganizerController(
        //        requestFieldExtractor,
        //        mockClient.Object);

        //    Action act = () => organizerController.GrantAccessToken(request);

        //    // Assert
        //    Assert.Throws<InvalidRequestException>(act);
        //}
    }
}
