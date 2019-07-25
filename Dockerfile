FROM node:10

LABEL maintainer="yukihiro <epirevolve@gmail.com>"

RUN mkdir /src
VOLUME ["/src"]

RUN mkdir /statics
VOLUME ["/statics"]

RUN mkdir /server
ADD ./src /server

WORKDIR /server
RUN set -ex \
    && npm install express ejs webpack webpack-cli webpack-stream gulp \
    && npm install -g gulp gulp-cli