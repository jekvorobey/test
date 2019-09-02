import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    name: 'item_list',
    namespaced: true,
    state: {
        activeType: null,
        itemsPerPage: 20,
        items: {
            /* [id: number]: Item */
        },
        users: {
            /* [id: string]: User */
        },
        lists: {
            top: [
                /* number */
            ],
            new: [],
            show: [],
            ask: [],
            job: [],
        },
    },
    actions,
    mutations,
    getters,
};
