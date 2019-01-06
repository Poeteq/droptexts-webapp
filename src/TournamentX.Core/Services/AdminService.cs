using TournamentX.Core.Interface;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;
using TournamentX.Core.Models;

namespace TournamentX.Core.Services
{
    public class AdminService
    {
        IAdminClient adminClient;
        public AdminService(IAdminClient adminClient)
        {
            this.adminClient = adminClient;
        }

        public Response<TxSessionCredentials> Login(AdminLoginRequest request)
        {
            return adminClient.Login(request);
        }
    }
}
