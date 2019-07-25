FROM react-walker-base:latest

LABEL maintainer="yukihiro <epirevolve@gmail.com>"

ARG src_path

ADD ./${src_path} /src_copy
WORKDIR /src_copy
RUN npm install

WORKDIR /server