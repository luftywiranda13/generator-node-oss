<% if (esnext) { %>export default function <%= camelProject %>(input) {
  return input ? `👉 ${input} 👈` : 'No args passed!';
}<% } else { %>'use strict';

module.exports = input => (input ? `👉 ${input} 👈` : 'No args passed!');<% } %>
