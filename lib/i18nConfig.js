const { cookie } = require('express-validator');
const i18n = require('i18n');
const path = require('path');

i18n.configure({
  directory: path.join(__dirname,'./locales'),
  locales: ['en', 'es'],
  queryParameter: 'lang',
  autoReload: true,
  objectNotation: true,
  syncFiles: true,
  register: global,
  cookie: 'NodeApi_locale'
});

i18n.setLocale('en')

module.exports = i18n;