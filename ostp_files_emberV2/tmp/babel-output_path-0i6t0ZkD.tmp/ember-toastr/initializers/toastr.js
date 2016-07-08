define('ember-toastr/initializers/toastr', ['exports'], function (exports) {
  'use strict';

  exports.initialize = initialize;

  function initialize(application, options) {
    var injectAs = options.injectAs;
    window.toastr.options = options.toastrOptions;

    application.inject('route', injectAs, 'service:toast');
    application.inject('controller', injectAs, 'service:toast');
    application.inject('component', injectAs, 'service:toast');
  }
});