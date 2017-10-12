# datapackage-normalize-js

datapackage-normalize-js is a lightweight library that upgrades Data Package metadata to v1 of the Data Package specs from previous versions. For more information see this blog post: https://datahub.io/blog/upgrade-to-data-package-specs-v1

[![Build Status](https://travis-ci.org/datahq/data.js.svg?branch=master)](https://travis-ci.org/datahq/datapackage-normalize-js)

## Installation

Prerequisites: node >= v6

This is a simple script that you can download directly from here:

https://raw.githubusercontent.com/datahq/datapackage-normalize-js/master/normalize.js

e.g. using `wget`:

```
wget https://raw.githubusercontent.com/datahq/datapackage-normalize-js/master/normalize.js
```

## Usage

Normalize datapackage.json:

```javascript
// path (optional) is the path to datapackage.json (if not provided looks in current directory)
normalize.js [path]

// prints out updated datapackage.json 
```
