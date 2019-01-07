using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;

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
        private IHostingEnvironment _hostingEnvironment;
        #endregion

        #region Constructor
        public MessageController(IMessageProvider messageProvider, IHostingEnvironment hostingEnvironment)
        {
            this.messageService = new MessageService(messageProvider);
            _hostingEnvironment = hostingEnvironment;
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

        [HttpPost("contacts/send")]
        public IActionResult SendToContacts([FromBody, Required] SendToContactsRequest request)
        {
            try
            {
                var lines = new List<string>();
                string folderName = "Upload";
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                string fullPath = Path.Combine(newPath, request.FileName);

                using (FileStream fs = new FileStream(fullPath, FileMode.Open, FileAccess.Read))
                {
                    using (StreamReader sr = new StreamReader(fs))
                    {
                        int i = 0;
                        while (!sr.EndOfStream)
                        {
                            var lineText = sr.ReadLine();
                            if (i > 0 && lineText != "phoneNumber")
                                lines.Add(lineText);
                            i++;
                        }
                    }
                }

                return Ok(messageService.BulkSend(lines, request.Message));
            }
            catch
            {
                return Ok("failed");
            }
        }

        #endregion
    }
}
