/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,

  included: function(app) {
    app.import('./vendor/aspect-ratio-image.css');
  }

};
