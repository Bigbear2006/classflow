FROM node:25.9-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .
RUN ["npm", "run", "build"]

ENTRYPOINT ["node", "./.output/server/index.mjs"]