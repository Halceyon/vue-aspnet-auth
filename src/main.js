import { aspnetAuth } from './aspnetAuth'

export function install(Vue, options) {
    options = Object.assign({}, {
      installComponents: true,
    }, options);
  
    Vue.use(DeferredReady);
  
    const defaultResizeBus = new Vue();
    Vue.prototype.$auth = aspnetAuth;
}