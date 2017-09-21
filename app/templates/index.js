<% if (esnext) { %>export default (input = 'No args passed!') => input;<% } else { %>'use strict';

module.exports = input => (input ? input : 'No args passed!');<% } %>
