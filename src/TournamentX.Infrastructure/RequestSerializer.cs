using System.Net.Http;
using System.Text;

namespace TournamentX.Infrastructure
{
    public class RequestSerializer
    {
        public static StringContent Content(object content)
        {

            return new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(
                content), Encoding.UTF8, "application/json");
        }
    }
}