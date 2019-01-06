using TournamentX.Core.Validation;

namespace TournamentX.Core.Models.Responses
{
    public class Response<T> where T : new()
    {
        public int ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
        public bool IsSuccessStatusCode
        {
            get
            {
                return ResponseCode == 1;
            }
        }
        public T Payload
        {
            get
            {
                return _payload;
            }
            set
            {
                _payload = value;
            }
        }

        T _payload;

        #region
        public Response() { }
        public Response(string message, int statusCode)
        {
            ResponseMessage = message;
            ResponseCode = statusCode;
        }

        public Response(T payload)
        {
            SetPayload(payload);
        }

        public Response(T payload, string message, int statusCode)
        {
            SetPayload(payload);
            ResponseMessage = message;
            ResponseCode = statusCode;
        }
        #endregion

        #region
        public void SetPayload(T payload)
        {
            RequestPreconditions.CheckNotNull(payload, "payload");
            Payload = payload;
        }

        public Response<T> WithSuccess()
        {
            ResponseCode = 1;
            ResponseMessage = "Success!";
            return this;
        }

        public Response<T> WithPayload(T payload)
        {
            SetPayload(payload);
            return this;
        }

        #endregion
    }
}
