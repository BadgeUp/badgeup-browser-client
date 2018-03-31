:warning: This client is still a work-in-progress.

# BadgeUp Node.js Client
Official Node.js client for working with [BadgeUp](https://www.badgeup.io/). Targets compatibility with all LTS versions of Node.js. These versions can be found in `.travis.yml`.

[![Build Status](https://travis-ci.org/BadgeUp/badgeup-node-client.svg?branch=master)](https://travis-ci.org/BadgeUp/badgeup-node-client)

## Quickstart

```sh
npm install @badgeup/badgeup-node-client --save
```

## Initialization
The BadgeUp Node.js client is initialized with an options object.
```js
const { BadgeUp } = require('@badgeup/badgeup-node-client');
// or for TypeScript, import { BadgeUp } from '@badgeup/badgeup-node-client';

const badgeup = new BadgeUp({
    apiKey: // the API Key created for use with this application
});

// get a complete list of achievements
badgeup.achievements.getAll().then(function(achievements) {
    console.log(achievements);
}).catch(function(err) {
    console.log('Error fetching achievements: ' + err.message);
});
```

## Development

Run `npm run dev` to have TypeScript watch for changes and automatically compile during development. Running `npm test` will automatically trigger a compilation.
