const url = require("url");
const {StringDecoder} = require("string_decoder");
const buffer = require("buffer");
const routes = require("../routes");
const {notFoundHandler} = require("../handlers/routeHandlers/notFoundHandler");

const handler = {}

handler.handleReqRes = (req, res) => {
    const parsedURL = url.parse(req.url,true);
    const path = parsedURL.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedURL.query;
    const headersObject = req.headers;

    const requestProperty = {
        parsedURL,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject
    }

    const decoder = new StringDecoder('utf-8');
    let actualData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;



    req.on('data', (buffer) => {
        actualData += decoder.write(buffer);
    });
    req.on('end', () => {
        actualData += decoder.end()

        chosenHandler(requestProperty, (statusCode, payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {}
            const payloadString = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);
        });

        res.end(actualData);
    })
}

module.exports = handler;