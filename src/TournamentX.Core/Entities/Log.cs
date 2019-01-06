using System;
using TournamentX.Core.Enumerations;

namespace TournamentX.Core.Entities
{
   public class Log
    {
        public string LogId { get; set; }
        public int LogSequence { get; set; }
        public DateTime Date { get; set; }
        public string Message { get; set; }
        public int? Code { get; set; }
        public LogType Type { get; set; }
        public string TypeName { get; set; }
    }
}
