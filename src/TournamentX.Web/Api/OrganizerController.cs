using Microsoft.AspNetCore.Mvc;

using TournamentX.Web.Helpers;
using TournamentX.Web.Filters;
using TournamentX.Core.Interface;
using TournamentX.Core.Services;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Validation;
using TournamentX.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace TournamentX.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizerController : ControllerBase
    {
        #region Private
        private IRequestFieldExtractor requestFieldExtractor;
        private OrganizerService orgService;
        #endregion

        #region Constructor
        public OrganizerController(
            IRequestFieldExtractor extractor = null,
            IOrganizerClient orgClient = null)
        {
            requestFieldExtractor = extractor;
            orgService = new OrganizerService(orgClient);
        }
        #endregion

        #region Actions
        [HttpPost("login")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<TxSessionCredentials>))]
        public IActionResult TempLogin([FromBody, Required]TemporaryLoginRequest request)
        {
            Response<TxSessionCredentials> response = orgService.TemporaryLogin(request);
            RequestPreconditions.CheckNotNull(response.Payload, "Payload");
            response.Payload.Validate();
            response.Payload.SetAdmin(false);
            requestFieldExtractor.StoreTomUserSessionCredentials(response.Payload);
            return Ok(response);
        }

        [HttpPost("accessToken")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<GetAccessTokenResponse>))]
        public IActionResult GrantAccessToken([FromBody, Required] GenerateTemporaryOrganizerRequest request)
        {
            Response<GetAccessTokenResponse> response = orgService.GetAccessToken(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                request);
            return Ok(response);
        }
        #endregion
    }
}
