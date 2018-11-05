/*
 * Primary Files for the API
 *  *
 */

// Dependencies
const http = require('http');
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder

// The server should respond to all requests with a string
const server = http.createServer((req, res) => {

    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    console.log(parsedUrl);
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the headers as an object
    const headers = req.headers;

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Get the payload, if any
    const decoder = new stringDecoder('utf-8');
    var buffer = '';
    req.on('data', (data) => { buffer += decoder.write(data) })
    req.on('end', (data) => {
        buffer += decoder.end();

        // Send the response
        res.end("Hello World\n");

        // Log the request path
        console.log("Request received with this payload: ", buffer)

    })


})


// Start the server, and have it listen on port 3003
server.listen(3003, function () {
    console.log("The server is listening on port 3003 now")
})