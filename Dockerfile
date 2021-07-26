FROM node:16-alpine

# defaults to production, overrided in compose file
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# not needed in production
RUN npm i -g @nestjs/cli

WORKDIR /var/www/node-api/game-library-api

# putting the node_modules outside the app directory
COPY package.json package-lock.json* ./

RUN npm install --dev --no-optional && npm cache clean --force

COPY . .

EXPOSE 3000

CMD npm run start:debug
