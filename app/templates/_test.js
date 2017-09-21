<% if (esnext) { %>import <%= camelProject %> from './';<% } else { %>'use strict';

const <%= camelProject %> = require('./');<% } %>

test('output', () => {
  expect(<%= camelProject %>('🐰')).toBe('🐰');
  expect(<%= camelProject %>()).toBe('No args passed!');
});
