FROM node:12
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY ./dist/ /usr/src/app
CMD node ./index.js