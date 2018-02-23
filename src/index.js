/**
 * vue-aspnet-auth (https://github.com/Halceyon/vue-aspnet-auth)
 *
 * Copyright © 2018 Code HQ (Pty) Ltd. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import AspnetAuth from 'aspnet-auth';
export const AspnetAuth = {
  install(Vue) {
    Vue.prototype.$auth = AspnetAuth;
  }
}
