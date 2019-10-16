import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    name: 'landing',
    namespaced: true,
    state: {
        load: false,
        banners: [],
        brands: [],
        categories: [],
        newProducts: {
            banner: {},
            items: [],
        },
        bestsellerProducts: {
            banner: {},
            items: [],
        },
        featuredProducts: {
            banner: {},
            items: [],
        },
        instagramItems: [],
    },
    actions,
    mutations,
    getters,
};
