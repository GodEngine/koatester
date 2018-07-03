/**
 */

const Handlebars = require('handlebars')

Handlebars.registerHelper('equal',
  (a, b, opts) => a === b ? opts.fn(this) : opts.inverse(this)
)
