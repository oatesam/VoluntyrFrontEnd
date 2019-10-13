## Build Stage
FROM node:12.2.0 as build-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY voluntyrFrontend/package.json package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add app
COPY voluntyrFrontend/ /app

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration

## Production Stage
FROM nginx:1.15

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY deploy/nginx.conf.template /etc/nginx/conf.d/default.conf.template

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
