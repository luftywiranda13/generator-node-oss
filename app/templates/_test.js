<% if (esnext) { %>import <%= camelProject %> from '../';<% } else { %>'use strict';

const <%= camelProject %> = require('./');<% } %>

test('output', () => {
  expect(<%= camelProject %>('🐰')).toEqual('👉 🐰 👈');
  expect(<%= camelProject %>()).toEqual('No args passed!');
});
