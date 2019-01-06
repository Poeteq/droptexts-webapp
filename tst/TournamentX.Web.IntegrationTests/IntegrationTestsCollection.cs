﻿using Xunit;

namespace TournamentX.Web.IntegrationTests
{
    [CollectionDefinition("Integration tests collection")]
    public class IntegrationTestsCollection : ICollectionFixture<TestHostFixture>
    {
        // This class has no code, and is never created. Its purpose is simply
        // to be the place to apply [CollectionDefinition] and all the
        // ICollectionFixture<> interfaces.
    }
}
