import Vue from 'vue';

if (process.env.VUE_ENV === 'client') {
    const VueObserveVisibility = require('vue-observe-visibility');
    Vue.use(VueObserveVisibility);
}
