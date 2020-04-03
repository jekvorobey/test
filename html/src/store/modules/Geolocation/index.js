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
            [SELECTED_CITY]: null,
        },
        actions,
        mutations,
        getters,
    };
}
