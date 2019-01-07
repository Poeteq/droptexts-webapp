FROM microsoft/dotnet:2.1-sdk AS build-env
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Copy csproj and restore as distinct layers
COPY *.sln ./
COPY src/TournamentX.Core/*.csproj ./src/TournamentX.Core/
COPY src/TournamentX.Infrastructure/*.csproj ./src/TournamentX.Infrastructure/
COPY src/TournamentX.Web/*.csproj ./src/TournamentX.Web/
COPY tst/TournamentX.Web.Tests/*.csproj ./tst/TournamentX.Web.Tests/
COPY tst/TournamentX.Web.IntegrationTests/*.csproj ./tst/TournamentX.Web.IntegrationTests/
RUN dotnet restore ./TournamentX.sln

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o /app/out

# Build runtime image
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out ./
ENTRYPOINT ["dotnet", "TournamentX.Web.dll"]