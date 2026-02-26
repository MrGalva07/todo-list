FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY backend/TodoList.API/*.csproj TodoList.API/
COPY backend/TodoList.Core/*.csproj TodoList.Core/
COPY backend/TodoList.Infrastructure/*.csproj TodoList.Infrastructure/


COPY backend/*.sln* .

RUN dotnet restore


COPY backend/ .

RUN dotnet publish TodoList.API -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
EXPOSE 80

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TodoList.API.dll"]