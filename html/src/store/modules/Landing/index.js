import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'landing';
export const RENDER_DATA = 'renderData';
export const SEO = 'seo';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            renderData: [],
            load: false,
            seo: {},
            banners: [],
            middleBanners: [],
            brands: [],
            categories: [],
            frequentCategories: [],
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
            catalogLatestSets: [],
        },
        actions,
        mutations,
        getters,
    };
}
