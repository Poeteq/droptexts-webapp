using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

using TournamentX.Core.Interface;
using TournamentX.Core.Services;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Web.Filters;
using TournamentX.Web.Helpers;

namespace TournamentX.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        #region Private
        private IRequestFieldExtractor requestFieldExtractor;
        private TournamentService tournamentService;
        #endregion

        #region Constructor
        public TournamentController(
            IRequestFieldExtractor extractor,
            ITournamentClient tournamentClient)
        {
            requestFieldExtractor = extractor;
            tournamentService = new TournamentService(tournamentClient);
        }
        #endregion

        #region Actions
        [HttpGet("all")]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<GetTournamentsResponse>))]
        public IActionResult GetTournaments()
        {
            Response<GetTournamentsResponse> response = tournamentService.GetTournaments(requestFieldExtractor.ExtractTomUserSessionCredentials());
            return Ok(response);
        }

        [HttpPost("create")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public IActionResult CreateTournament([FromBody, Required]CreateTournamentRequest request)
        {
            var response = tournamentService.CreateTournament(request);
            return Ok(response);
        }
        [HttpPost("{tournamentId}/Start")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public IActionResult LaunchTournament([Required]string tournamentId, [FromBody]LaunchTournamentRequest request)
        {
            var response = tournamentService.LaunchTournament(tournamentId, request);
            return Ok(response);
        }

        [HttpGet("{tournamentId}/Reset")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public IActionResult ResetTournament([Required]string tournamentId)
        {
            var response = tournamentService.ResetTournament(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                tournamentId);
            return Ok(response);
        }

        //[HttpGet("{tournamentId}/Logs")]
        //[ValidateModel]
        //[HandleException]
        //[ProducesResponseType(200, Type = typeof(Response<GetLogsResponse>))]
        //public IActionResult GetLogs(string tournamentId)
        //{
        //    var response = tournamentService.GetLogs(tournamentId);
        //    return Ok(response);
        //}

        [HttpGet("{tournamentId}/swap")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public IActionResult SwapPlayers(
            [Required] string tournamentId,
            [FromQuery, Required] string index1,
            [FromQuery, Required] string index2)
        {
            var response = tournamentService.SwapPlayers(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                tournamentId,
                index1,
                index2);
            return Ok(response);
        }

        [HttpPost("{tournamentId}/player")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public IActionResult AddPlayer([Required]string tournamentId, [FromBody, Required] PlayerRequest request)
        {
            var response = tournamentService.AddPlayer(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                tournamentId,
                request);
            return Ok(response);
        }

        [HttpDelete("{tournamentId}/player")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public IActionResult DeletePlayer([Required]string tournamentId, [FromQuery, Required] int seed)
        {
            var response = tournamentService.DeletePlayer(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                tournamentId,
                seed
            );
            return Ok(response);
        }
        #endregion
    }
}
