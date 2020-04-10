import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'favorites';
export const FAVORITES_DATA = 'favoritesData';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [FAVORITES_DATA]: {},
        },
        actions,
        mutations,
        getters,
    };
}
