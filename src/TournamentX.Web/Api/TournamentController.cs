using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System.ComponentModel.DataAnnotations;
using TournamentX.Core.Interface;
using TournamentX.Core.Service;
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
        public IRequestFieldExtractor requestFieldExtractor;
        private TournamentService tournamentService;
        public TournamentController(IDistributedCache cache, ITournamentClient tournamentClient, IRequestFieldExtractor requestFieldExtractor)
        {
            this.requestFieldExtractor = requestFieldExtractor;
            tournamentService = new TournamentService(tournamentClient);
        }

        [HttpGet("all")]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<GetTournamentsResponse>))]
        public ActionResult<Response<GetTournamentsResponse>> GetTournaments()
        {
            var response = tournamentService.GetTournaments(requestFieldExtractor.ExtractTomUserSessionCredentials());
            return Ok(response);
        }

        [HttpPost("create")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<Response<EmptyResponse>> CreateTournament([FromBody, Required]CreateTournamentRequest request)
        {
            var response = tournamentService.CreateTournament(request);
            return Ok(response);
        }
        [HttpPost("{tournamentId}/Start")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<Response<EmptyResponse>> LaunchTournament([Required]string tournamentId, [FromBody]LaunchTournamentRequest request)
        {
            var response = tournamentService.LaunchTournament(tournamentId, request);
            return Ok(response);
        }

        [HttpGet("{tournamentId}/Reset")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<Response<EmptyResponse>> ResetTournament([Required]string tournamentId)
        {
            var response = tournamentService.ResetTournament(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                tournamentId
                );
            return Ok(response);
        }

        [HttpPost("{bracketId}/match")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<Response<EmptyResponse>> UpdateMatch([Required]string bracketId, [Required]UpdateMatchRequest request)
        {
            var response = tournamentService.UpdateMatch(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                bracketId,
                request
            );
            return Ok(response);
        }

        [HttpGet("{tournamentId}/Logs")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<GetLogsResponse>))]
        public ActionResult<Response<GetLogsResponse>> GetLogs(string tournamentId)
        {
            var response = tournamentService.GetLogs(tournamentId);
            return Ok(response);
        }

        [HttpGet("{tournamentId}/swap")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<EmptyResponse> SwapPlayers([Required]string tournamentId, [FromQuery, Required] string index1, [FromQuery, Required]string index2)
        {
            var response = tournamentService.SwapPlayers(
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                tournamentId,
                index1,
                index2
            );
            return Ok(response);
        }

        [HttpPost("{tournamentId}/player")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<Response<EmptyResponse>> AddPlayer([Required]string tournamentId, [FromBody, Required] PlayerRequest request)
        {
            var response = tournamentService.AddPlayer
            (
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                tournamentId,
                request
            );
            return Ok(response);
        }

        [HttpPut("player")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<Response<EmptyResponse>> UpdatePlayer([FromBody, Required] PlayerRequest request)
        {
            var response = tournamentService.UpdatePlayer
            (
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                request
            );
            return Ok(response);
        }

        [HttpDelete("{tournamentId}/player")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<Response<EmptyResponse>> DeletePlayer([Required]string tournamentId, [FromQuery, Required] int seed)
        {
            var response = tournamentService.DeletePlayer
            (
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                tournamentId,
                seed
            );
            return Ok(response);
        }

        [HttpPost("bracket/{bracketId}/match/{matchId}")]
        [ValidateModel]
        [HandleException]
        [ProducesResponseType(200, Type = typeof(Response<EmptyResponse>))]
        public ActionResult<Response<EmptyResponse>> SendNotification([Required]string bracketId,[Required]string matchId, [FromBody, Required] SendNotificationRequest request)
        {
            var response = tournamentService.SendNotification
            (
                requestFieldExtractor.ExtractTomUserSessionCredentials(),
                bracketId,
                matchId,
                request
            );
            return Ok(response);
        }

    }
}
