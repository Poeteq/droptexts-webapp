using TournamentX.Core.Interface;
using TournamentX.Core.Entities;
using TournamentX.Core.Models.Requests;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Core.Service
{
    public class AdminService
    {
        IAdminClient adminClient;
        public AdminService(IAdminClient adminClient)
        {
            this.adminClient = adminClient;
        }

        public Response<UserIdentity> Login(AdminLoginRequest request)
        {
            return adminClient.Login(request);
        }

        //public Response<UserIdentity> ValidateUser(string email, string token)
        //{
        //    TemporaryLoginRequest request = BuildValidateUserRequest(email, token);
        //    return adminClient.ValidateUser(request);
        //}

        //private TemporaryLoginRequest BuildValidateUserRequest(string email, string token)
        //{
        //    return new TemporaryLoginRequest
        //    {
        //        Email = email,
        //        AccessToken = token
        //    };
        //}

    }
}
