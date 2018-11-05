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

        // Choose the handler this request should go to. If one is not found, use the notFound handler.
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

        // Construct data object to send to the handler
        const payloadData = {
            'trimmedPath':trimmedPath,
            'queryStringObject':queryStringObject,
            method,
            headers,
            'payload':buffer
        }

        // Route the request to the handler specified in the router
        chosenHandler(payloadData, (statusCode = 200, payload = {})=>{
            // Convert the payload to string
            const payloadString = JSON.stringify(payload)

            // Return the response
            res.setHeader('Content-Type','application/json')
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log("We are returning this response: ", statusCode, payloadString);
        })


    })
})


// Start the server, and have it listen on port 3003
server.listen(3003, function () {
    console.log("The server is listening on port 3003 now")
})

// Define the handlers
const handlers = {};

// Sample handler
handlers.sample = (data, callback) => {
    // Callback a http status code, and a payload object 
    callback(406, {"name":"Sample handler"})
}

// Not found handler
handlers.notFound = (data, callback) => {
    callback(404)
}

// Define a request router
const router = {
    "sample":handlers.sample
}