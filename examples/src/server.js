import http from 'http';

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server/lib/Server';

import route from './route';

const SERVER_PORT = 5115;
const WEBPACK_DEV_SERVER_PORT = 5116;

const template = (reactElement) => `
<!doctype html>
<html>
    <head>
        <title>Universal Routing Example</title>
    </head>
    <body>
        <div id="root">${ReactDOMServer.renderToString(reactElement)}</div>
        <script src="http://localhost:${WEBPACK_DEV_SERVER_PORT}/bundle.js">
        </script>
    </body>
</html>
`;

http.createServer((req, res) => {
    const urlFragment = req.url.substr(1);
    const reactElement = route(urlFragment);

    if (reactElement === null) {
        res.end();
    } else {
        console.log("Server Routed:", urlFragment);
        res.end(template(reactElement));
    }
}).listen(SERVER_PORT);

new WebpackDevServer(webpack({
    outputFilename: "/bundle.js",
    output: {
        path: "/"
    },
    entry: [
        './src/client'
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }]
    }
}), {
    publicPath: ""
}).listen(WEBPACK_DEV_SERVER_PORT);

console.log(`Listening. http://localhost:${SERVER_PORT}`);
