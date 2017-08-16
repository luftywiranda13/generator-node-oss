<% if (esnext) { %>export default input => (input ? `👉 ${input} 👈` : 'No args passed!');<% } else { %>'use strict';

module.exports = input => (input ? `👉 ${input} 👈` : 'No args passed!');<% } %>
