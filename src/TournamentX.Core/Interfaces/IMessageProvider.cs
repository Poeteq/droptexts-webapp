using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Interfaces
{
   public interface IMessageProvider
    {
        Response<ErrorResponse> SendSMS(string to, string body);
    }
}
