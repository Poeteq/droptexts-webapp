using Microsoft.AspNetCore.Mvc;
using TournamentX.Core.Interface;
using TournamentX.Core.Entities;
using TournamentX.Core.Service;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Web.Filters;
using TournamentX.Web.Helpers;
using TournamentX.Core.Validation;
using System.ComponentModel.DataAnnotations;

namespace TournamentX.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IRequestFieldExtractor requestFieldExtractor;
        private AdminService adminService;
        private OrganizerService orgService;

        public UserController(
            IAdminClient adminClient,
            IOrganizerClient orgClient,
            ITournamentClient tournamentClient,
            IRequestFieldExtractor extractor)
        {
            this.adminService = new AdminService(adminClient);
            this.orgService = new OrganizerService(orgClient, tournamentClient);
            this.requestFieldExtractor = extractor;
        }

        [HttpGet("whoAmI")]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(UserIdentity))]
        public ActionResult<UserIdentity> GetUser()
        {
            return Ok(requestFieldExtractor.ExtractTomUserSessionCredentials());
        }

        [HttpPost("admin/login")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(UserIdentity))]
        public ActionResult<UserIdentity> AdminLogin([FromBody, Required] AdminLoginRequest request)
        {
            Response<UserIdentity> response = adminService.Login(request);
            RequestPreconditions.CheckNotNull(response.Payload, "Payload");
            response.Payload.Validate();
            response.Payload.SetUser();
            requestFieldExtractor.StoreTomUserSessionCredentials(response.Payload);
            return Ok(response);
        }

        [HttpPost("tempOrganizer/login")]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(UserIdentity))]
        public ActionResult<UserIdentity> TempLogin([FromBody]TemporaryLoginRequest request)
        {
            Response<UserIdentity> response = orgService.TemporaryLogin(request);
            RequestPreconditions.CheckNotNull(response.Payload, "Payload");
            response.Payload.Validate();
            requestFieldExtractor.StoreTomUserSessionCredentials(response.Payload);
            return Ok(response);
        }

        [HttpGet("tournaments")]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<GetTournamentsResponse>))]
        public ActionResult<Response<GetTournamentsResponse>> GetTournaments()
        {
            var response = orgService.GetTournaments(requestFieldExtractor.ExtractTomUserSessionCredentials());
            return Ok(response);
        }

        [HttpGet("logout")]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(object))]
        public ActionResult<UserIdentity> Logout()
        {
            requestFieldExtractor.ClearTomUserSessionCredentials();
            return Ok();
        }
    }
}
