const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { join } = require('path');
const assert = require('assert');
const { expect } = require('chai');
const sinon = require('sinon');

const CarService = require('./../../src/service/carService');

const carsDatebase = join(__dirname, './../../databases', 'cars.json');

const mocks = {
    validCar: require('./../mocks/valid-car.json'),
    validCarCategory: require('./../mocks/valid-carCategory.json'),
    validCustomer: require('./../mocks/valid-customer.json'),
};

describe('CarService Suite Test', () => {
    let carService = {};

    before(() => {
        carService = new CarService({
            cars: carsDatebase,
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should retrieve a random position from an array', () => {
        const data = [0, 1, 2, 3, 4];
        const result = carService.getRandomPositionFromArray(data);

        expect(result).to.be.lte(data.length).and.be.gte(0);
    });

    it('should choose the first id from carIds in carCategory', () => {
        const carCategory = mocks.validCarCategory;
        const carIdIndex = 0;

        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name,
        ).returns(carIdIndex);

        const result = carService.chooseRandomCar(carCategory);
        const expected = carCategory.carIds[carIdIndex];

        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
        expect(result).to.be.equal(expected);
    });

    it('give a carCategory it should return an available car', async () => {
        const car = mocks.validCar;
        const carCategory = Object.create(mocks.validCarCategory);

        carCategory.carIds = [car.id];

        sandbox.stub(
            carService.carRepository,
            carService.carRepository.find.name,
        ).resolves(car);

        sandbox.spy(
            carService,
            carService.chooseRandomCar.name,
        );

        const result = await carService.getAvailableCar(carCategory);
        const expected = car;

        expect(carService.chooseRandomCar.calledOnce).to.be.ok;
        expect(carService.carRepository.find.calledOnce).to.be.ok;
        expect(result).to.be.deep.equal(expected);
    });
});
