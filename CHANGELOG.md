# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- N/A

### Changed
- getDynamicCriteriaImages() now returns the data object

## [0.4.1] - 2017-02-13
### Added
- `applications.getAll()`
- `criteria.getDynamicCriteriaImages()`
- `apiKeys.getIterator()`
- `apiKeys.update()` per [badgeup-browser-client #2](https://github.com/BadgeUp/badgeup-browser-client/issues/2)

### Changed
- N/A

## [0.4.0] - 2017-02-04
### Added
- Analytics endpoint for subjects

### Changed
- Renamed `getList()` to `getAll()`
- Renamed `getAll()` to `getIterator()`
- Renamed `getSubjectMetricsList()` to `getAllSubjectMetrics()`
- Renamed `getAllSubjectMetrics()` to `getSubjectMetricsIterator()`
- Cleaner event querying for get/delete (#2)
