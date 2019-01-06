using System;

namespace TournamentX.Core.Exceptions
{
    public class CustomExceptionService
    {
        public void ThrowItemNotFoundException()
        {
            throw new ItemNotFoundException("This is a custom exception.");
        }
    }

    public class ItemNotFoundException : Exception
    {
        public ItemNotFoundException(string message) : base(message) { }
        public ItemNotFoundException(string message, Exception ex) : base(message, ex) { }
    }
}
