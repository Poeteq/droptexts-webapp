using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using TournamentX.Core.Exceptions;
using TournamentX.Core.Models.Responses;

namespace TournamentX.Web.Filters
{
    public class HandleExceptionAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is ItemNotFoundException)
            {
                context.Result = new BadRequestObjectResult(new Response<ErrorResponse>(new ErrorResponse { }, context.Exception.Message, 0));
            }
            else if (context.Exception is InvalidRequestException)
            {
                context.Result = new BadRequestObjectResult(new Response<ErrorResponse>(new ErrorResponse { }, context.Exception.Message, 0));
            }
        }
    }
}
