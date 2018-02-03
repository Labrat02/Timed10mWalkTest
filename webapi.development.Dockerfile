# Stage 1 - Build
FROM microsoft/dotnet:2-sdk
LABEL author="Collin Yeadon<collin@yeadongroup.com>"

# Copy dependant projects
COPY ./DataStore ./DataStore

# caches restore result by copying csproj file separately
WORKDIR /webapi
COPY ./webapi/*.csproj ./
RUN dotnet restore

# copies the rest of your code
COPY ./webapi .

ENV ASPNETCORE_URLS "http://+:5050"
ENV ASPNETCORE_ENVIRONMENT "Development"
EXPOSE 5050:5050

ENTRYPOINT ["dotnet", "run", "--configuration", "Debug"]