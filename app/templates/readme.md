# <%= projectName %>

[![npm](https://img.shields.io/npm/v/<%= projectName %>.svg)](https://www.npmjs.com/package/<%= projectName %>)
[![Travis branch](https://img.shields.io/travis/<%= githubUsername %>/<%= projectName %>/master.svg)](https://travis-ci.org/<%= githubUsername %>/<%= projectName %>)<% if (coverage) { %>
[![Codecov branch](https://img.shields.io/codecov/c/github/<%= githubUsername %>/<%= projectName %>/master.svg)](https://codecov.io/gh/<%= githubUsername %>/<%= projectName %>)<% } %>
[![npm](https://img.shields.io/npm/dm/<%= projectName %>.svg)](https://npm-stat.com/charts.html?package=<%= projectName %>&from=2016-04-01)

<%= description %>

## Why?

// TODO

## Installation

```sh
npm install --save <%= projectName %>
```

## Usage

```js
<% if (esnext) { %>import <%= camelProject %> from '<%= projectName %>'; %><% } else { %>const <%= camelProject %> = require('<%= projectName %>');<% } %>

<%= camelProject %>('some text'); //=> some text
```

## Related

// TODO

## License

MIT &copy; [<%= name %>](<%= website %>)
