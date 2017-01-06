'use strict';

const expect = require('chai').expect;
const findOwnPackageJOSN = require('./../src/utils/findOwnPackageJSON.js');

describe('findOwnPackageJOSN()', function() {
    it('should be able to find this package.json file', function() {
        const pkg = findOwnPackageJOSN();

        expect(pkg).to.be.an('object');
        expect(pkg.version).to.be.a('string');
    });
});
