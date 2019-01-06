using TournamentX.Core.Entities;
using TournamentX.Core.Models;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Interface
{
    public interface IAdminClient
    {
        Response<TxSessionCredentials> Login(AdminLoginRequest request);
    }
}
