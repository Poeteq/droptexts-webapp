﻿using System;

namespace TournamentX.Core.Exceptions
{
    public class InvalidRequestException : Exception
    {
        public InvalidRequestException() {}
        public InvalidRequestException(string message) : base(message) {}
        public InvalidRequestException(string message, Exception inner) : base(message, inner) {}
    }

}
