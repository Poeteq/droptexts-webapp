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
    public class BracketController : ControllerBase
    {
        #region Private
        private IRequestFieldExtractor requestFieldExtractor;
        private BracketService bracketService;
        #endregion

        #region Constructor
        public BracketController(
            IRequestFieldExtractor extractor,
            IBracketClient bracketClient)
        {
            requestFieldExtractor = extractor;
            bracketService = new BracketService(bracketClient);
        }
        #endregion

        #region Actions
        [HttpPost("{bracketId}/match")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public IActionResult UpdateMatch([Required]string bracketId, [Required]UpdateMatchRequest request)
        {
            var response = bracketService.UpdateMatch(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                bracketId,
                request);
            return Ok(response);
        }

        [HttpPost("{bracketId}/match/{matchId}/notify")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public IActionResult SendNotification(
            [Required]string bracketId,
            [Required]string matchId,
            [FromBody, Required] SendNotificationRequest request)
        {
            var response = bracketService.SendNotification(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                bracketId,
                matchId,
                request);
            return Ok(response);
        }
        #endregion  
    }
}
