import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'geolocation';
export const SELECTED_CITY = 'selectedCity';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [SELECTED_CITY]: {
            fias_id: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
            name: 'г Москва',
        },
    },
    actions,
    mutations,
    getters,
};
