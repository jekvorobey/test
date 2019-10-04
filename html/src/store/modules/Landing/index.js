import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    name: 'landing',
    namespaced: true,
    state: {
        banners: { mainBanners: [], middleBanners: [] },
        brands: [],
        categories: [],
        newProducts: [],
        bestsellerProducts: [],
        featuredProducts: [],
        instagramItems: [],
    },
    actions,
    mutations,
    getters,
};
