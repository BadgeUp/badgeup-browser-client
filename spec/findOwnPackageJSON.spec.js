const expect = require('chai').expect;
const findOwnPackageJOSN = require('./../src/utils/findOwnPackageJSON.js');

describe('findOwnPackageJOSN()', function() {
    it('should be able to find this package.json file', function() {
        const package = findOwnPackageJOSN();

        expect(package).to.be.an('object');
        expect(package.version).to.be.a('string');
    });
});
