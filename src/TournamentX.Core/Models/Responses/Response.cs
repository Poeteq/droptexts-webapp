using TournamentX.Core.Validation;

namespace TournamentX.Core.Models.Responses
{
    public class Response<T> where T : new()
    {
        public int ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
        T _payload;
        public T Payload
        {
            get
            {
                return _payload;
            }
            set
            {
                this._payload = value;
            }
        }

        public Response() { }
        public Response(string message, int statusCode)
        {
            this.ResponseMessage = message;
            this.ResponseCode = statusCode;
        }

        public Response(T payload, string message, int statusCode)
        {
            this.SetPayload(payload);
            this.ResponseMessage = message;
            this.ResponseCode = statusCode;
        }

        public void SetPayload(T payload)
        {
            RequestPreconditions.CheckNotNull(payload, "payload");
            this.Payload = payload;
        }

    }
}
