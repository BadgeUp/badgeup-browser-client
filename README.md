# BadgeUp Node.js Client
Official Node.js client for working with [BadgeUp](https://www.badgeup.io/), a user engagement and gamification service.

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
const achievements = await badgeup.achievements.getAll();
console.log(achievements);
```

## Development

Run `npm run dev` to have TypeScript watch for changes and automatically compile during development. Running `npm test` will automatically trigger a compilation.

## Support

If you find an problem with this module, please file an issue. This module targets compatibility with all LTS versions of Node.js. These versions can be found in `.travis.yml`.
