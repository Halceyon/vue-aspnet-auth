import aspnetAuth from './aspnetAuth';
export const AspnetAuth = {
  install(Vue) {
    Vue.prototype.$auth = aspnetAuth;
    window.aspnetAuth = aspnetAuth;
  }
}
