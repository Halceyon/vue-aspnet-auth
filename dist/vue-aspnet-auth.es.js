import aspnetAuth from 'aspnet-auth';

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

export { AspnetAuth };
//# sourceMappingURL=vue-aspnet-auth.es.js.map
