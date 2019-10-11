import vue from 'vue';

if (process.env.VUE_ENV === 'client') {
    // eslint-disable-next-line
    const install = (Vue, options) => {
        Vue.prototype.$velocity = require('velocity-animate');
    };
    vue.use(install);
}
