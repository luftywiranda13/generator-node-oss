# <%= projectName %>

[![Package Version](https://img.shields.io/npm/v/<%= projectName %>.svg)](https://www.npmjs.com/package/<%= projectName %>)
[![Build Status: Linux](https://img.shields.io/travis/<%= githubUsername %>/<%= projectName %>/master.svg)](https://travis-ci.org/<%= githubUsername %>/<%= projectName %>)<% if (coverage) { %>
[![Coverage Status](https://img.shields.io/codecov/c/github/<%= githubUsername %>/<%= projectName %>/master.svg)](https://codecov.io/gh/<%= githubUsername %>/<%= projectName %>)<% } %>
[![Downloads Status](https://img.shields.io/npm/dm/<%= projectName %>.svg)](https://npm-stat.com/charts.html?package=<%= projectName %>&from=2016-04-01)

<%= description %>

## Why?

// TODO

## Installation

```sh
npm install --save <%= projectName %>
```

## Usage

```js
const <%= camelProject %> = require('<%= projectName %>');

<%= camelProject %>('some text');
//=> some text
```

## Related

// TODO

## License

MIT &copy; [<%= name %>](<%= website %>)
