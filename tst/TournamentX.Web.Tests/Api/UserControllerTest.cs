using Microsoft.AspNetCore.Mvc;
using Xunit;

using TournamentX.Core.Models;
using TournamentX.Web.Api;

namespace TournamentX.Web.Tests.Api
{
    public class UserControllerTest : BaseControllerTest
    {
        #region Tests
        [Fact]
        public void TestGetUser_LoggedOut()
        {
            // Arrange
            requestFieldExtractor.ClearTomUserSessionCredentials();

            // Act
            var userController = new UserController(requestFieldExtractor);
            var result = userController.GetUser() as OkObjectResult;
            var credentials = result.Value as TxSessionCredentials;

            // Assert
            Assert.Null(credentials);
        }

        [Fact]
        public void TestGetUser_LoggedIn()
        {
            // Act
            var userController = new UserController(requestFieldExtractor);

            var result = userController.GetUser() as OkObjectResult;
            var credentials = result.Value as TxSessionCredentials;

            // Assert
            Assert.NotNull(credentials);
            Assert.Equal(CREDENTIALS, credentials);
        }

        [Fact]
        public void TestLogout()
        {
            // Act
            var userController = new UserController(requestFieldExtractor);

            var result = userController.Logout() as OkObjectResult;
            var credentials = result.Value as TxSessionCredentials;

            // Assert
            Assert.Null(credentials);
        }
        #endregion
    }
}
