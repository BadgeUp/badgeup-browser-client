import { expect } from 'chai';
import { BadgeUp } from '../src';
const bup = new BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});

describe('progress', function() {
    it('should get all progress', async function() {
        function _payload(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                // last page of date
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: null
                    },
                    data: (new Array(10)).fill(null)
                });
            } else {
                // first page of data
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: '/v2/apps/1337/progress?after=PAGE_TWO&subject=kram&include=achievement&include=criterion'
                    },
                    data: (new Array(10)).fill(null)
                });
            }
        }

        function _validate(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                expect(options.url).to.equal('/v2/apps/1337/progress?after=PAGE_TWO&subject=kram&include=achievement&include=criterion');
            } else {
                expect(options.url).to.equal('/v2/apps/1337/progress?subject=kram&include=achievement&include=criterion');
            }
            expect(options.headers).to.be.an('object');
        }

        const progress = await bup.progress.query().subject('kram').include('achievement').include('criterion').getAll({ _payload, _validate });

        // total number of progress
        expect(progress.length).to.equal(20);

    });
});
