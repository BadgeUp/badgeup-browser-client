# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added

### Changed

## [3.0.0] - 2019-01-22
### Changed
- Minimum Node.js version is now 8
- Use 4xx API error message in thrown HTTP errors

## [2.0.6] - 2018-12-30
### Changed
- Adding preloaded achievement icons

## [2.0.5] - 2018-11-25
### Changed
- Adding orderBy created option to earned achievement query builder

## [2.0.3] - 2018-10-28
### Changed
- Fix request options type definition
- Allow including progress resources

## [2.0.2] - 2018-10-28
### Changed
- Drop `qs` dependency

## [2.0.1] - 2018-10-25
### Changed
- Use individual lodash modules
- Progress type fixes

## [2.0.0] - 2018-09-08
### Added
- Added Earned Award support
- Added Webhook management support

### Changed
- Renamed `events.createV2Preview()` to `events.create()`
- Use BadgeUp API v2
- Dependency updates

## [1.0.3] - 2018-06-03
### Changed
- Progress type definition fix

## [1.0.2] - 2018-06-02
### Changed
- Dependency updates

## [1.0.1] - 2018-04-14
### Changed
- Type updates/fixes
- Retry HTTP requests

### Changed
## [1.0.0] - 2018-03-31
### Changed
- TypeScript implementation. Minor breaking changes.
- Dropped support for Node.js v4

## [0.8.5] - 2017-12-09
### Changed
- Better jsdocs
- Query parameter support

## [0.8.1] - 2017-09-04
### Changed
- Upgradge `got`
- Internal query builder changes

## [0.8.0] - 2017-05-30
### Added
- `achievementIcons.getAll()`
- `achievementIcons.remove()`

### Changed
- Removed most event functions, leaving create
- Added `since` and `until` filters for earned achievements

## [0.7.0] - 2017-04-23

### Changed
- Users no longer need to provide applicationId
- Fixed API key formatting issues

*Prior versions are outdated, changelog pruned.*
