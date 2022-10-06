const faker = require('faker');
const { join } = require('path');
const { writeFile } = require('fs/promises');

const Car = require('./../src/entities/car');
const CarCategory = require('./../src/entities/carCategory');
const Customer = require('./../src/entities/customer');

const seederBaseFolder = join(__dirname, '../', 'databases');

const ITEMS_AMOUNT = 2;

const carCategory = new CarCategory({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];

for (let index = 0; index < ITEMS_AMOUNT; index++) {
    const car = new Car({
        id: faker.datatype.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear(),
    });

    const customer = new Customer({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        age: faker.random.number({ min: 18, max: 50 }),
    });

    carCategory.carIds.push(car.id);
    customers.push(customer);
    cars.push(car);
}

const write = (fileName, data) => writeFile(join(seederBaseFolder, fileName), JSON.stringify(data));

(async () => {
    await write('cars.json', cars);
    await write('customers.json', customers);
    await write('carCategories.json', [carCategory]);

    console.log(cars);
    console.log(customers);
    console.log([carCategory]);
})();
