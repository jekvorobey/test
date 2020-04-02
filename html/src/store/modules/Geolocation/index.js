import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'geolocation';
export const SELECTED_CITY = 'selectedCity';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [SELECTED_CITY]: {
                name: 'г Москва',
                fias_id: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
                geo_lat: '55.7540471',
                geo_lon: '37.620405',
            },
        },
        actions,
        mutations,
        getters,
    };
}
