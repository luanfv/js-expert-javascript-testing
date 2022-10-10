const http = require('http');
const { join } = require('path');

const CarService = require('./src/service/carService');
const CarCategoryService = require('./src/service/carCategoryService');
const CustomerService = require('./src/service/customerService');

const carsDatabase = join(__dirname, './databases', 'cars.json');
const carCategoriesDatabase = join(__dirname, './databases', 'carCategories.json');
const customerDatabase = join(__dirname, './databases', 'customers.json');

const carService = new CarService({
    cars: carsDatabase,
});
const carCategoryService = new CarCategoryService({
    carCategory: carCategoriesDatabase,
});
const customerService = new CustomerService({
    customer: customerDatabase,
});

const routes = {
    '/categories:get': (request, response) => {
        response.writeHead(200);
        
        return response.end();
    },

    '/cars:get': (request, response) => {
        response.writeHead(200);
        
        return response.end();
    },

    '/order:post': async (request, response) => {
        for await (const data of request) {
            const { categoryId, customerId, numberOfDay } = JSON.parse(data);

            const missingParameters = [];

            if (!categoryId) {
                missingParameters.push('categoryId');
            }

            if (!customerId) {
                missingParameters.push('customerId');
            }

            if (!numberOfDay) {
                missingParameters.push('numberOfDay');
            }

            if (missingParameters.length > 0) {
                const message = `Missing parameters: ${missingParameters}`;
                response.writeHead(400);  

                return response.end(JSON.stringify({ message }));              
            }

            const carCategory = await carCategoryService.get(categoryId);

            if (!carCategory) {
                const message = 'Category not found';
                response.writeHead(404);
        
                return response.end(JSON.stringify({ message }));
            }

            const customer = await customerService.get(customerId);

            if (!customer) {
                const message = 'Customer not found';
                response.writeHead(404);
        
                return response.end(JSON.stringify({ message }));
            }

            const rent = await carService.rent(
                customer,
                carCategory,
                numberOfDay,
            );

            response.writeHead(201);

            return response.end(JSON.stringify(rent));
        }

        response.writeHead(404);

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
