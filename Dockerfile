FROM node:10

LABEL maintainer="yukihiro <epirevolve@gmail.com>"

RUN mkdir /src_copy
RUN mkdir /src_origin
VOLUME ["/src_origin"]

RUN mkdir /statics \
&&  mkdir /server

ADD ./src /server

WORKDIR /server
RUN set -ex \
&&  npm install express ejs webpack webpack-cli webpack-stream gulp \
&&  npm install -g gulp gulp-cli

EXPOSE 3000

ENTRYPOINT [ "/bin/sh" ]
CMD [ "startup.sh" ]