# datapackage-normalize-js

datapackage-normalize-js is a lightweight library providing a normalization for datapackage.json.

[![Build Status](https://travis-ci.org/datahq/data.js.svg?branch=master)](https://travis-ci.org/datahq/datapackage-normalize-js)

## Installation

`npm install datapackage-normalize-js`

## Usage

Normalize entire datapackage.json:
```javascript
const dp = normalize(path)
// path is local path to datapackage.json
const dp = normalizeAll(dp)
// dp is datapackage.json
```
Normalize only particular properties:
```javascript
const dp = normalizeContributors(dp)
const dp = normalizeSources(dp)
// dp is datapackage.json
```
