# react walker

This is a container to easy confirm a react result.

This container includes webpack, gulp and express.

## how to use

1. build Dockerfile
    go this react-walker directory.
    > docker image build -f Dockerfile -t react-walker:latest .

2. run container with mounting your src directory to /src_origin.
    > docker container run -it --rm -p 3000:3000 -v {your_directory_path}:/src_origin --name walker react-walker:latest sh startup.sh
    your_directory_path is an absolute path.
    this directory should includes webpack.config.js and package.json.

3. exec auto change detection and compile
    open new terminal.
    > docker container exec -it walker gulp watch