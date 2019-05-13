(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('aspnet-auth')) :
  typeof define === 'function' && define.amd ? define(['exports', 'aspnet-auth'], factory) :
  (factory((global['vue-aspnet-auth'] = {}),global.aspnetAuth));
}(this, (function (exports,aspnetAuth) { 'use strict';

  aspnetAuth = aspnetAuth && aspnetAuth.hasOwnProperty('default') ? aspnetAuth['default'] : aspnetAuth;

  /**
   * vue-aspnet-auth (https://github.com/Halceyon/vue-aspnet-auth)
   *
   * Copyright © 2018 Code HQ (Pty) Ltd. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var AspnetAuth = {
    install: function install(Vue, options) {
      Vue.prototype.$auth = new aspnetAuth(options);
    }
  };

  exports.AspnetAuth = AspnetAuth;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue-aspnet-auth.umd.js.map
