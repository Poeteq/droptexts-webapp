using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TournamentX.Core.Interfaces;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Services
{
    public class MessageService
    {
        IMessageProvider messageProvider;
        public MessageService(IMessageProvider messageProvider)
        {
            this.messageProvider = messageProvider;
        }

        public Response<ErrorResponse> Send(string to, string body)
        {
            return messageProvider.SendSMS(to, body);
        }

        public Response<ErrorResponse> BulkSend(List<string> recipients, string body)
        {
            var response = new Response<ErrorResponse>("0 messages couldn't be sent.", -1);
            response.SetPayload(new ErrorResponse());
            var errors = new List<string> { };
            try
            {
                var sentResponse = null as Response<ErrorResponse>;
                foreach (var recipient in recipients)
                {
                    sentResponse = messageProvider.SendSMS(recipient, body);
                    if (sentResponse.ResponseCode != 1)
                    {
                        errors.Add(sentResponse.ResponseMessage);
                        response.Payload.Errors = errors;
                    }
                }

                if (errors.Count == 0)
                {
                    response.ResponseCode = 1;
                    response.ResponseMessage = "All messages successfully sent.";
                }
                else
                {
                    response.ResponseMessage = "Some messages could not be sent.";
                }

                return response;
            }
            catch
            {
                if (errors.Count > 0)
                {
                    response.ResponseMessage = "Some messages could not be sent.";
                }
                return response;
            }

        }
    }
}
