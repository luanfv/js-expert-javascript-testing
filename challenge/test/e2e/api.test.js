const { describe, it } = require('mocha');
const request = require('supertest');
const assert = require('assert');

describe('API Suite test', () => {
    describe('/categories', () => {
        it('should return categories and HTTP status 200', () => {

        });
    });

    describe('/cars', () => {
        it('should return all cars and HTTP status 200', () => {

        });
        
        describe('when pass params: categoryId', () => {
            it('should return invalid category message and HTTP status 404', () => {

            });

            it('should return cars of the category and HTTP status 200', () => {

            });
        });

        describe('when pass params: available', () => {
            it('should return available cars and HTTP Status 200', () => {

            });
        });
    });

    describe('/order', () => {
        it('should return missing parameters message and HTTP status 400', () => {

        });

        it('should return category unavailable cars message and HTTP status 400', () => {

        });

        it('should return invalid category message and HTTP status 404', () => {

        });

        it('should return randomly a car from the category chosen and HTTP status 201', () => {

        });

        describe('when want get a car specific', () => {
            it('should return unavailable car message and HTTP status 400', () => {
                
            });

            it('should return invalid car message and HTTP status 404', () => {
                
            });

            it('should return a car from the category chosen and HTTP status 201', () => {

            });
        });
    });
});