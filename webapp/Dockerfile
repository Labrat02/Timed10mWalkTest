# Stage 1 - Build
FROM microsoft/aspnetcore-build AS builder
LABEL author="Collin Yeadon<collin@yeadongroup.com>"
WORKDIR /source

 # caches restore result by copying csproj file separately
COPY *.csproj .
RUN dotnet restore

# copies the rest of your code
COPY . .
RUN dotnet publish --output /app/ --configuration Release

# Stage 2 - Publish
FROM microsoft/aspnetcore

#ENV NODE_VERSION 6.10.3
# set up node
RUN apt-get update && apt-get install -y gnupg \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y gnupg nodejs

WORKDIR /app
COPY --from=builder /app .
ENTRYPOINT ["dotnet", "webapp.dll"]