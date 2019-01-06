using FluentAssertions;
using System.Net;
using System.Threading.Tasks;
using Xunit;

using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Infrastructure;

namespace TournamentX.Web.IntegrationTests.Api
{
    [Collection("Integration tests collection")]
    public class AdminControllerTest : BaseControllerTest
    {
        #region Private
        public static readonly TxSessionCredentials CREDENTIALS = new TxSessionCredentials("foo", "bar");
        #endregion

        #region Constructor
        public AdminControllerTest(TestHostFixture testHostFixture) : base(testHostFixture) { }
        #endregion

        #region Integration Tests
        [Fact]
        public async Task TestAdminLogin_WrongPostBodyCredentials()
        {
            // Arrange
            var request = new AdminLoginRequest("bar");

            // Act
            var client = _testHostFixture.Client;
            var response = await client.PostAsync("/api/admin/login", RequestSerializer.Content(request));

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task TestAdminLogin()
        {
            // Arrange
            var request = new AdminLoginRequest("ToTheMoon2018");

            // Act
            var client = _testHostFixture.Client;
            var response = await client.PostAsync("/api/admin/login", RequestSerializer.Content(request));

            // Assert
            response
            .StatusCode
            .Should()
            .Be(HttpStatusCode.OK);
        }
        #endregion
    }
}
