const PREFERENCES_DATA = 'preferencesData';
const CUSTOMER = 'customer';

export const GET_CUSTOMER_BY_TYPE = 'GET_CUSTOMER_BY_TYPE';

export default {
    [GET_CUSTOMER_BY_TYPE]: (state) => (type) => {
        return state[PREFERENCES_DATA][type][CUSTOMER] || {};
    },
};
