using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using TournamentX.Core.Interface;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Services;
using TournamentX.Core.Validation;
using TournamentX.Web.Filters;
using TournamentX.Web.Helpers;

namespace TournamentX.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        #region Private
        private IRequestFieldExtractor requestFieldExtractor;
        private AdminService adminService;
        #endregion

        #region Constructor
        public AdminController(
            IRequestFieldExtractor extractor,
            IAdminClient adminClient)
        {
            requestFieldExtractor = extractor;
            adminService = new AdminService(adminClient);
        }
        #endregion

        #region Actions
        [HttpPost("login")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(TxSessionCredentials))]
        public IActionResult AdminLogin([FromBody, Required] AdminLoginRequest request)
        {
            Response<TxSessionCredentials> response = adminService.Login(request);
            RequestPreconditions.CheckNotNull(response.Payload, "Payload");
            response.Payload.Validate();
            response.Payload.SetAdmin(true);
            requestFieldExtractor.StoreTomUserSessionCredentials(response.Payload);
            return Ok(response);
        }
        #endregion
    }
}
