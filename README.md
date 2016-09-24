# BadgeUp Node.js Client

## Quickstart

## Initialization
The BadgeUp Node.js client is initialized with an options object.
```js
const BadgeUp = require('@badgeup/badgeup-node-client');
const badgeup = new BadgeUp({
    applicationId: '<your applicationId from the dashboard>',
    apiKey: // the API Key created for use with this application (preferred)
    // token: // the token issued when you use the dashboard (use apiKey if possible)
});

// get a complete list of achievements
badgeup.achievements.getAll().then(function(achievements) {
    console.log(achievements);
}).console.error(function(err) {
    console.log('Error fetching achievements: ' + err.message);
});;
```
