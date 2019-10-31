import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    name: 'landing',
    namespaced: true,
    state: {
        renderData: [],
        load: false,
        banners: [],
        middleBanners: [],
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
