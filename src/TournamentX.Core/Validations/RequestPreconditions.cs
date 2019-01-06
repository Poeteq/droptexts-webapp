using System.Collections.Generic;
using TournamentX.Core.Exceptions;

namespace TournamentX.Core.Validation
{
    public class RequestPreconditions
    {
        public static void CheckNotEmpty<T>(List<T> list, string propertyName)
        {
            if (list == null || list.Count.Equals(0))
            {
                throw new InvalidRequestException(string.Format("{0} can not be empty", propertyName));
            }
        }

        public static void CheckNotNull(object obj, string propertyName)
        {
            if (obj == null)
            {
                throw new InvalidRequestException(string.Format("{0} can not be empty", propertyName));
            }
        }

        public static void CheckNotBlank(string property, string propertyName)
        {
            if (string.IsNullOrEmpty(property))
            {
                throw new InvalidRequestException(string.Format("{0} can not be empty", propertyName));
            }
        }

        public static void CheckDoesMatch(string obj1, string propertyName1, string obj2, string propertyName2)
        {
            if (!obj1.Equals(obj2))
            {
                throw new InvalidRequestException(string.Format("{0} must match {1}", propertyName1, propertyName2));
            }
        }
    }
}
