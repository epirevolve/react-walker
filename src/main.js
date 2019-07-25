const process = require('process');

const express = require("express");
const ejs = require("ejs");

const app = express();
app.use('/statics', express.static('/statics'));

process.chdir('/src');
console.log(`current directory: ${process.cwd()}`);

app.get("/show", async function (req, res, next) {
    const src = decodeURI(req.query.src);
    console.log(`get request: ${src}`);
    var hello = '<div id="root"></div>\n\
    <script src="/statics/js/vendor/common.bundle.min.js"></script>\n\
    <script src="/statics/js/<%- src %>.bundle.min.js"></script>';
    res.send(ejs.render(hello, {"src": src}));
});

const server = app.listen(3000, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
});