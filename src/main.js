import aspnetAuth from './aspnetAuth';
export const AspnetAuth = {
  install: function (Vue) {
    Vue.prototype.$auth = aspnetAuth;
    window.aspnetAuth = aspnetAuth;
  }
}
