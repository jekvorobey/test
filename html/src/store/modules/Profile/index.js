import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'profile';
export const PROMO_DATA = 'promoData';
export const BREADCRUMBS = 'breadcrumbs';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [BREADCRUMBS]: [],
        [PROMO_DATA]: null,
    },
    actions,
    mutations,
    getters,
};
