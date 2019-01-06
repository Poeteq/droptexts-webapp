using Microsoft.AspNetCore.Mvc;
using TournamentX.Web.Filters;
using TournamentX.Web.Helpers;
using TournamentX.Core.Models;

namespace TournamentX.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region Private
        private IRequestFieldExtractor requestFieldExtractor;
        #endregion

        #region Constructor
        public UserController(IRequestFieldExtractor extractor = null)
        {
            requestFieldExtractor = extractor;
        }
        #endregion

        #region Actions
        [HttpGet("whoAmI")]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(TxSessionCredentials))]
        public IActionResult GetUser()
        {
            return Ok(requestFieldExtractor.ExtractTomUserSessionCredentials());
        }
     
        [HttpGet("logout")]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(object))]
        public IActionResult Logout()
        {
            requestFieldExtractor.ClearTomUserSessionCredentials();
            return Ok(requestFieldExtractor.ExtractTomUserSessionCredentials());
        }
        #endregion
    }
}
