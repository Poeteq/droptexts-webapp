using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using Xunit;

using TournamentX.Core.Exceptions;
using TournamentX.Core.Interface;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Web.Api;

namespace TournamentX.Web.Tests.Api
{
    public class AdminControllerTest : BaseControllerTest
    {
        [Fact]
        public void TestAdminLogin()
        {
            // Arrange
            var request = new AdminLoginRequest("bar");
            var expectedResponse = new Response<TxSessionCredentials>(CREDENTIALS);

            var mockClient = new Mock<IAdminClient>();
            mockClient.Setup(client => client.Login(request))
                .Returns(expectedResponse.WithSuccess());

            // Act
            var adminController = new AdminController(
                requestFieldExtractor,
                mockClient.Object);

            var result = adminController.AdminLogin(request) as OkObjectResult;
            var response = result.Value as Response<TxSessionCredentials>;

            // Assert
            Assert.NotNull(response);
            Assert.True(response.IsSuccessStatusCode);
            Assert.True(response.Payload.IsAdmin);
            Assert.Equal(expectedResponse.Payload, response.Payload);
        }

        [Fact]
        public void TestAdminLogin_WrongPostBody()
        {
            // Arrange
            var request = new AdminLoginRequest();
            var expectedResponse = new Response<TxSessionCredentials>();

            var mockClient = new Mock<IAdminClient>();
            mockClient.Setup(client => client.Login(request))
                .Returns(expectedResponse);

            // Act
            var adminController = new AdminController(
                requestFieldExtractor,
                mockClient.Object);
            Action act = () => adminController.AdminLogin(request);

            // Assert
            Assert.Throws<InvalidRequestException>(act);
        }
    }
}
