import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'infoPage';
export const LANDING = 'landing';
export const LANDING_CODE = 'landingCode';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [LANDING]: {},
            [LANDING_CODE]: '',
        },
        actions,
        mutations,
        getters,
    };
}
