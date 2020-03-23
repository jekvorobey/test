import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'masterclass';
export const MASTERCLASS = 'masterClass';
export const MASTERCLASS_CODE = 'masterClassCode';

export const FEATURED_MASTERCLASSES = 'featuredMasterClasses';
export const INSTAGRAM_ITEMS = 'instagramItems';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [MASTERCLASS_CODE]: '',
            [MASTERCLASS]: {},
            [FEATURED_MASTERCLASSES]: { items: [], range: 0 },
            [INSTAGRAM_ITEMS]: [],
        },
        actions,
        mutations,
        getters,
    };
}
