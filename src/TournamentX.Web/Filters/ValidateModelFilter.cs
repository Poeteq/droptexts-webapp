using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

using TournamentX.Core.Models.Responses;

namespace TournamentX.Web.Filters
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var response = new Response<ErrorResponse>("Invalid request model state.", 0);
                response.SetPayload(BuildErrorResponse(context.ModelState));

                context.Result = new BadRequestObjectResult(response);
            }

            base.OnActionExecuting(context);
        }

        private ErrorResponse BuildErrorResponse(ModelStateDictionary modelState)
        {
            return new ErrorResponse { Errors = modelState.Keys.SelectMany(key => modelState[key].Errors.Select(x => x.ErrorMessage)) };
        } 

    }
}
