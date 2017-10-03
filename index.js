/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-auto-image',

  included: function(app) {
    app.import('./vendor/aspect-ratio-image.css');
  }

};
