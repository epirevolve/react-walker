const express = require("express");
const ejs = require("ejs");
const app = express();
const webpack = require('webpack');
const webpackStream = require("webpack-stream");

app.get("/show", function (req, res, next) {
    const config = require('/src/webpack.config.js');
    webpackStream(config, webpack);

    const src = decodeURI(req.param('src'));
    var hello = '<div id="root"></div>\n\
    <script src="/src/static/js/vendor/common.bundle.min.js"></script>\n\
    <script src="/src/static/js/<%- src %>"></script>';
    res.send(ejs.render(hello, {"src": src}));
});

const server = app.listen(3000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});