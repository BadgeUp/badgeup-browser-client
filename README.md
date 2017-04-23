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
const BadgeUp = require('@badgeup/badgeup-node-client');
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

## API

This client is promise-based. This client provides the following APIs:

### Achievements

#### `get(achievementId)` - Retrieve an achievement by ID
Returns a promise that resolves with the achievement.

```js
badgeup.achievements.get('ke9ox992');
```

#### `getIterator()` - Iterate through all achievements
Returns an iterator that returns promises that resolves with each achievement. See also `getAll()`.

```js
const achievements = badgeup.achievements.getIterator();
for (let app of achievements) {
    console.log(await app);
}
```

#### `getAll()` - Get an array of all achievements
Returns a promise that resolves with an array containing all achievements. See also `getIterator()`.

```js
const achievements = await badgeup.achievements.getAll();
```

#### `create(achievement)` - Create a new achievement
Returns a promise that resolves with a new achievement.

```js
badgeup.achievements.create({
    name: 'Head Chef',
    description: 'Cook 100 different dishes',
    evalTree: {},
    awards: []
});
```

#### `update(achievementId, patches)` - Updates an achievement by ID
Returns a promise that resolves when the achievement has been updated.
```js
badgeup.achievements.update('1eao490c', [{ op: 'replace', path: '/name', value: 'Super Chef' }]);
```

#### `remove(achievementId)` - Deletes an achievement by ID
Returns a promise that resolves with the deleted achievement.
```js
badgeup.achievements.remove('1eao490c');
```

#### `getAchievementCriteria(achievementId)` - Retrieves an achievement's attached criteria
Returns a promise that resolves with an array of an achievement's attached criteria.
```js
badgeup.achievements.remove('1eao490c');
```

#### `getAchievementAwards(achievementId)` - Retrieves an achievement's attached awards
Returns a promise that resolves with an array of an achievement's attached awards.
```js
badgeup.achievements.remove('1eao490c');
```


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
    name: 'Super Chef',
    description: 'Master Cooking, Second to None'
});
```

#### `update(applicationId, patches)` - Updates an application by ID
Returns a promise that resolves when the application has been updated.
```js
badgeup.applications.update('ke9ox992', [{ op: replace, path: '/name', value: 'Super Chef 2' }]);
```

#### `remove(applicationId)` - Deletes an application by ID
Returns a promise that resolves with the deleted application.
```js
badgeup.applications.remove('ke9ox992');
```

### Events

### Metrics

### Criteria

### Earned Achievements

### Progress

### Api Keys

### Awards

### Billable Events
