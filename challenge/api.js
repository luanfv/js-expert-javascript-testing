const http = require('http');

const routes = {
    '/cars:get': (request, response) => {
        response.writeHead(200);
        
        return response.end();
    },

    '/cars:post': async (request, response) => {
        console.log(request);

        return response.end();
    },

    default: (_, response) => {
        response.writeHead(404);
        
        return response.end();
    },
}

const handler = function (request, response) {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLowerCase()}`;
    const chosen = routes[routeKey] || routes.default;

    response.writeHead(200, {
        'Contet-Type': 'text/html',
    });

    return chosen(request, response);
}

const app =  http
    .createServer(handler)
    .listen(3000, () => console.log('app running at', 3000));

module.exports = app;
