/**
 * vue-aspnet-auth (https://github.com/Halceyon/vue-aspnet-auth)
 *
 * Copyright © 2018 Code HQ (Pty) Ltd. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Vue from 'vue';
import { AspnetAuth } from '../src/index';
import sinon from 'sinon';
import { expect } from 'chai';
import cookies from 'browser-cookies';

describe('vue-aspnet-auth', () => {

  before(() => {
    sinon.stub(cookies, 'get').returns(null);
    Vue.use(AspnetAuth, {
      url: 'http://localhost'
    });
  });
  after(() => {
    cookies.get.restore();
  });

  it('should receive the url as an option', () => {
    expect(Vue.prototype.$auth.options.url).to.eq('http://localhost');
  });

  it('attached itself to vue as $auth', () => {
    expect(Vue.prototype.$auth).to.be.an('object');
  });
  it('has a login method', () => {
    expect(Vue.prototype.$auth.login).to.be.a('function');
  });
  it('has a logout method', () => {
    expect(Vue.prototype.$auth.logout).to.be.a('function');
  });
  it('has a loginExternal method', () => {
    expect(Vue.prototype.$auth.loginExternal).to.be.a('function');
  });
  it('has a register method', () => {
    expect(Vue.prototype.$auth.register).to.be.a('function');
  });
  it('has a forgot method', () => {
    expect(Vue.prototype.$auth.forgot).to.be.a('function');
  });
});
