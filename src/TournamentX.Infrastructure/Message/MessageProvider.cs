using Twilio;
using Twilio.Rest.Api.V2010.Account;
using TournamentX.Core.Interfaces;
using TournamentX.Core.Config;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Infrastructure.Message
{
    public class MessageProvider : IMessageProvider
    {
        public MessageProvider()
        {
            TwilioClient.Init(TwilioConfig.AccountSid, TwilioConfig.AuthToken);
        }

        public Response<ErrorResponse> SendSMS(string to, string body)
        {
            var response = new Response<ErrorResponse>("Failed to reach Twilio.", -1);

            try
            {
                var message = MessageResource.Create(
                    body: body,
                    from: new Twilio.Types.PhoneNumber(TwilioConfig.PhoneNumber),
                    to: new Twilio.Types.PhoneNumber(to)
                );

                response.SetPayload(new ErrorResponse());
                response.ResponseMessage = message.ErrorMessage == null ? "SMS messages successfully sent." : message.ErrorMessage;
                response.ResponseCode = message.ErrorCode == null ? 1 : (int) message.ErrorCode;
                return response;
            }
            catch
            {
                return response;
            }

        }
    }
}
