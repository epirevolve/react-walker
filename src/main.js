const process = require('process');
const express = require("express");
const ejs = require("ejs");

const webpack = require('webpack');
const webpackStream = require("webpack-stream");

const app = express();
app.use('/statics', express.static('/statics'));

process.chdir('/src');
console.log(`current directory: ${process.cwd()}`);

app.get("/show", async function (req, res, next) {
    const config = require('/src/webpack.config.js');
    await webpackStream(config, webpack);

    const src = decodeURI(req.param('src'));
    var hello = '<div id="root"></div>\n\
    <script src="/statics/js/vendor/common.bundle.min.js"></script>\n\
    <script src="/statics/js/<%- src %>.bundle.min.js"></script>';
    res.send(ejs.render(hello, {"src": src}));
});

const server = app.listen(3000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});