# Stage 1 - Build
FROM microsoft/aspnetcore-build AS builder
LABEL author="Collin Yeadon<collin@yeadongroup.com>"
WORKDIR /source

# caches restore result by copying csproj file separately
COPY ./webapi/*.csproj ./webapi/

#copy DataStore/Model and other dependant projects
COPY ./DataStore ./DataStore

WORKDIR /source/webapi
RUN dotnet restore
COPY ./webapi .
RUN dotnet publish --output /app/ --configuration Release

# Stage 2 - Publish
FROM microsoft/aspnetcore
WORKDIR /app
COPY --from=builder /app .
ENTRYPOINT ["dotnet", "webapi.dll"]