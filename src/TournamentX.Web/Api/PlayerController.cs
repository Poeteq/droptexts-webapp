using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using TournamentX.Core.Interfaces;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Services;
using TournamentX.Web.Filters;
using TournamentX.Web.Helpers;

namespace TournamentX.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        #region Private
        private IRequestFieldExtractor requestFieldExtractor;
        private PlayerService playerService;
        #endregion

        #region Constructor
        public PlayerController(
            IRequestFieldExtractor extractor,
            IPlayerClient playerClient)
        {
            requestFieldExtractor = extractor;
            playerService = new PlayerService(playerClient);
        }
        #endregion

        #region Actions
        [HttpPut]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<Response<EmptyResponse>> UpdatePlayer([FromBody, Required] PlayerRequest request)
        {
            var response = playerService.UpdatePlayer
            (
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                request
            );
            return Ok(response);
        }
        #endregion
    }
}
