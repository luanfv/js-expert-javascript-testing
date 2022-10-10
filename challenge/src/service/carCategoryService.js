const BaseRepository = require('./../repository/base/baseRepository');

class CarCategoryService {
    constructor({ carCategory }) {
        this.carCategoryRepository = new BaseRepository({ file: carCategory });
    }

    get(categoryId) {
        return this.carCategoryRepository.find(categoryId);
    }
}

module.exports = CarCategoryService;
