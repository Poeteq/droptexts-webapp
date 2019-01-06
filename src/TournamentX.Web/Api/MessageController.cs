using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using TournamentX.Core.Interfaces;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Services;

namespace TournamentX.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        #region Private
        private MessageService messageService;
        #endregion

        #region Constructor
        public MessageController(IMessageProvider messageProvider)
        {
            this.messageService = new MessageService(messageProvider);
        }
        #endregion

        #region Actions
        [HttpPost("send")]
        [ProducesResponseType(200, Type = typeof(Response<ErrorResponse>))]
        public IActionResult Send([FromBody, Required] SendRequest request)
        {
            var response = this.messageService.Send
            (
                request.To,
                request.Body
            );
            return Ok(response);
        }


        [HttpPost("bulk/send")]
        [ProducesResponseType(200, Type = typeof(Response<ErrorResponse>))]
        public IActionResult BulkSend([FromBody, Required] BulkSendRequest request)
        {
            var response = this.messageService.BulkSend
            (
                request.Recipients,
                request.Body
            );
            return Ok(response);
        }

        #endregion
    }
}
