const BaseRepository = require('./../repository/base/baseRepository');

class CustomerService {
    constructor({ customer }) {
        this.customerRepository = new BaseRepository({ file: customer });
    }

    get(customerId) {
        return this.customerRepository.find(customerId);
    }
}

module.exports = CustomerService;
