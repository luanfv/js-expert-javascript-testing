const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
    
        await rejects(result, rejection);
    }

    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
    
        await rejects(result, rejection);
    }


    {
        const filePath = './mocks/threeItems-valid.csv';    
        const result = await File.csvToJson(filePath);
        const expected = [
            {
                "id": 123,
                "name": "Erick Wendel",
                "profession": "Javascript Instructor",
                "birthDay": 1997
            },
            {
                "id": 321,
                "name": "Luan",
                "profession": "Javascript Developer",
                "birthDay": 2000
            },
            {
                "id": 111,
                "name": "Fulaninho",
                "profession": "PHP Developer",
                "birthDay": 1992
            }
        ];

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})()