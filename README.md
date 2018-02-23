
# vue-aspnet-auth
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/vue-aspnet-auth/blob/master/LICENSE) [![Build Status](https://travis-ci.org/Halceyon/vue-aspnet-auth.svg?branch=master)](https://travis-ci.org/Halceyon/vue-aspnet-auth) [![codecov](https://codecov.io/gh/Halceyon/aspnet-auth/branch/master/graph/badge.svg)](https://codecov.io/gh/Halceyon/aspnet-auth) [![npm](https://img.shields.io/npm/v/vue-aspnet-auth.svg)](https://www.npmjs.com/package/vue-aspnet-auth) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A [Vue](https://vuejs.org) plugin wrapper for [aspnet-auth](https://github.com/halceyon/aspnet-auth).

# Getting Started

## Install

From CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vue-aspnet-auth"></script>
```

From [npm](https://npmjs.org)

```sh
npm install vue-aspnet-auth --save
```

## Usage
Import and initialize the plugin.
```javascript
import { AspnetAuth } from 'vue-aspnet-auth';

Vue.use(AspnetAuth);
```
Basic login example:
```javascript
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$auth.login(this.username, this.password, (data) => {
        if (data.result) {
          this.$store.commit('auth', this.$auth.authentication);
          this.$root.$emit('app.loggedin');
        } else {
          this.error = data.message;
        }
      });
    },
  },
  created() {
	// initialize url
    this.$auth.url = `http://localhost:1234`;
  },
};
```
### License

Copyright © 2018 Code HQ (Pty) Ltd. This source code is licensed under the MIT license found in
the [LICENSE](https://github.com/halceyon/vue-aspnet-auth/blob/master/LICENSE) file.


---
Made with ♥ by Craig Pretorius
