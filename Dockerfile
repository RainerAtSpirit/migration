#
# ---- Base ----
FROM node:8.9.4-alpine AS base
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]

#
# ---- Dependencies ----
#
FROM base as build_dependencies
WORKDIR /usr/src/app
COPY ["./.npmrc", "./.yarnrc", "./"]
# install full dependencies
RUN ls -la
RUN yarn install --silent
RUN rm -f ./.npmrc
RUN ls -la

#
# ---- Lint, Test and Build ----
# run linters, setup and tests
FROM build_dependencies AS build
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . . 
# RUN  npm run lint && npm run test && npm run build
RUN npm run build
RUN ls -la _bundles

#
# ---- Release ----
FROM wfe:1.9.2 AS release
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN ls -laR ./dist
# copy app sources
COPY --from=build /usr/src/app/_bundles ./public
RUN mv ./public/index.html ./public/start.html
RUN ls -la ./public
RUN ls -laR ./public
# expose port and define CMD
EXPOSE 3000
CMD ["node", "dist/server.js" ]
