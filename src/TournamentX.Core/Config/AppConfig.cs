namespace TournamentX.Core.Config
{
    public interface IAppConfig
    {
        string CoreApiBaseAddress { get; set; }
        string AppId { get; set; }
        string SiteId { get; set; }
    }
    public class AppConfig : IAppConfig
    {
        public string CoreApiBaseAddress { get; set; }
        public string AppId { get; set; }
        public string SiteId { get; set; }
    }
}
