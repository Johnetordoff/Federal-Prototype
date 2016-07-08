define('ostp-files-ember-v2/initializers/toastr', ['exports', 'ember-toastr/initializers/toastr', 'ostp-files-ember-v2/config/environment'], function (exports, _emberToastrInitializersToastr, _ostpFilesEmberV2ConfigEnvironment) {

  var toastrOptions = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '4000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
  };
  var config = _ostpFilesEmberV2ConfigEnvironment['default']['ember-toastr'] || {
    injectAs: 'toast',
    toastrOptions: toastrOptions
  };

  exports['default'] = {
    name: 'ember-toastr',
    initialize: function initialize() {
      // support 1.x and 2.x
      var application = arguments[1] || arguments[0];

      if (!config.toastrOptions) {
        config.toastrOptions = toastrOptions;
      }

      if (!config.injectAs) {
        config.injectAs = 'toast';
      }

      (0, _emberToastrInitializersToastr.initialize)(application, config);
    }
  };
});