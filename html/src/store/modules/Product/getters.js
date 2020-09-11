import { DEFAULT_REVIEWS_PAGE_SIZE } from '@constants';
import { pluralize } from '@util';

const PRODUCT_OPTIONS = 'productOptions';

export const COMBINATIONS = 'combinations';
export const CHARACTERISTICS = 'characteristics';
export const SELECTED_COMBINATION = 'selectedCombination';

export const GET_NEXT_COMBINATION = 'GET_NEXT_COMBINATION';
export const IS_SELECTED = 'IS_SELECTED';
export const IS_DISABLED = 'IS_DISABLED';

export const REVIEWS_PAGES_COUNT = 'REVIEWS_PAGES_COUNT';

export const FILTERED_PICKUP_POINTS = 'filteredPickupPoints';

const PICKUP_POINTS = 'pickupPoints';
const SELECTED_PICKUP_POINT_TYPE = 'selectedPickupPointType';

export default {
    [FILTERED_PICKUP_POINTS](state) {
        const pickupPoints = state[PICKUP_POINTS] || [];
        const selectedPickupPointType = state[SELECTED_PICKUP_POINT_TYPE];

        return pickupPoints.filter((p) => !selectedPickupPointType || p.methodID === selectedPickupPointType.id);
    },

    [CHARACTERISTICS](state, getters) {
        const characteristics = (state[PRODUCT_OPTIONS] && state[PRODUCT_OPTIONS][CHARACTERISTICS]) || [];
        return characteristics.map((c) => {
            const options = c.options.map((p) => ({
                ...p,
                isSelected: getters[IS_SELECTED](c.code, p.value),
                isDisabled: getters[IS_DISABLED](c.code, p.value),
            }));

            const selectedOption = options.find((o) => !!o.isSelected);
            const note = `${options.length} ${pluralize(options.length, ['Вариант', 'Варианта', 'Вариантов'])}`;

            return {
                ...c,
                note,
                selectedOption,
                options,
            };
        });
    },

    [COMBINATIONS](state) {
        return (state[PRODUCT_OPTIONS] && state[PRODUCT_OPTIONS][COMBINATIONS]) || [];
    },

    [SELECTED_COMBINATION]({ product }, getters) {
        const combinations = getters[COMBINATIONS];
        return combinations.find((c) => c.code === product.code);
    },

    [GET_NEXT_COMBINATION]: (state, getters) => (code, value) => {
        const selectedCombination = getters[SELECTED_COMBINATION] || {};
        const combinations = state[PRODUCT_OPTIONS][COMBINATIONS] || [];

        return combinations.find((c) => {
            let accepted = true;
            // eslint-disable-next-line no-restricted-syntax
            for (const optName in selectedCombination.props) {
                if (optName !== code && selectedCombination.props[optName] !== c.props[optName]) {
                    accepted = false;
                    break;
                }
            }
            return accepted && c.props[code] === value;
        });
    },

    [IS_SELECTED]: (state, getters) => (code, value) => {
        const selectedCombination = getters[SELECTED_COMBINATION];
        return selectedCombination && selectedCombination.props[code] === value;
    },

    [IS_DISABLED]: (state, getters) => (code, value) => {
        const getCombination = getters[GET_NEXT_COMBINATION];
        return !getCombination(code, value);
    },

    [REVIEWS_PAGES_COUNT]: (state) => {
        return Math.ceil(state.reviewsData.reviewsCount / DEFAULT_REVIEWS_PAGE_SIZE);
    },
};
