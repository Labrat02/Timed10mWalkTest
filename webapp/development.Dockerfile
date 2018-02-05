# Stage 1 - Build
FROM microsoft/dotnet:2-sdk
LABEL author="Collin Yeadon<collin@yeadongroup.com>"
WORKDIR /app

# caches restore result by copying csproj file separately
COPY *.csproj .
RUN dotnet restore

# copies the rest of your code
COPY . .

# set up node
RUN apt-get update && apt-get install -y gnupg \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y gnupg nodejs

COPY package.json .
RUN npm i  \
    && node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js --env.prod \
    && node node_modules/webpack/bin/webpack.js --env.prod \
    && dotnet build --configuration Debug

ENV ASPNETCORE_URLS "http://+:5000"
ENV ASPNETCORE_ENVIRONMENT "Development"
EXPOSE 5000:5000

ENTRYPOINT ["dotnet", "run", "--configuration", "Debug"]