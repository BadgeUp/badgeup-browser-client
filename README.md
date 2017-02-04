:warning: This client is still a work-in-progress.

# BadgeUp Node.js Client
Official browser client for working with [BadgeUp](https://www.badgeup.io/). This module uses the [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) api, so you may need to [polyfill](https://github.com/github/fetch) it for older browsers. This is a downstream repository of the [badgeup-node-client](https://github.com/BadgeUp/badgeup-node-client).

[![Build Status](https://travis-ci.org/BadgeUp/badgeup-node-client.svg?branch=master)](https://travis-ci.org/BadgeUp/badgeup-node-client)

## Quickstart

```sh
npm install @badgeup/badgeup-node-client --save
```

## Initialization
The BadgeUp browser client is initialized with an options object.
```js
const BadgeUp = require('@badgeup/badgeup-browser-client');
const badgeup = new BadgeUp({
    applicationId: '<your applicationId from the dashboard>',
    apiKey: // the API Key created for use with this application (preferred)
    // token: // the token issued when you use the dashboard (use apiKey if possible)
});

// get a complete list of achievements
badgeup.achievements.getAll().then(function(achievements) {
    console.log(achievements);
}).catch(function(err) {
    console.log('Error fetching achievements: ' + err.message);
});
```

## API

This client is promise-based. This client provides the following APIs:

### Applications

#### `get(applicationId)` - Retrieve an application by ID
Returns a promise that resolves with the application.

```js
badgeup.applications.get('ke9ox992');
```

#### `getIterator()` - Iterate through all applications
Returns an iterator that returns promises that resolves with each application. See also `getAll()`.

```js
const applications = badgeup.applications.getIterator();
for (let app of applications) {
    console.log(await app);
}
```

#### `getAll()` - Get an array of all applications
Returns a promise that resolves with an array containing all applications. See also `getIterator()`.

```js
const applications = await badgeup.applications.getAll();
```

#### `create(application)` - Create a new application
Returns a promise that resolves with a new application.

```js
badgeup.applications.create({
    name: 'Honor Fuzz',
    description: 'A new-age fuzzy fighting game'
});
```

#### `remove(applicationId)` - Deletes an application by ID
Returns a promise that resolves with the deleted application.
```js
badgeup.applications.remove('ke9ox992');
```

#### `update(applicationId, changesObj)` - Updates an application by ID
Returns a promise that resolves when the application has been updated.
```js
badgeup.applications.modify('ke9ox992', { name: 'Honor Fuzz 2' });
```

### Events

### Metrics

### Achievements

### Criteria

### Earned Achievements

### Progress

### Api Keys

### Awards

### Billable Events
