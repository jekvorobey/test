import { pluralize } from '@util';

const PRODUCT_OPTIONS = 'productOptions';

export const COMBINATIONS = 'combinations';
export const CHARACTERISTICS = 'characteristics';
export const SELECTED_COMBINATION = 'selectedCombination';

export const GET_NEXT_COMBINATION = 'GET_NEXT_COMBINATION';
export const IS_SELECTED = 'IS_SELECTED';
export const IS_DISABLED = 'IS_DISABLED';

export default {
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

    [SELECTED_COMBINATION]({ productPreview }, getters) {
        const combinations = getters[COMBINATIONS];
        return combinations.find((c) => c.code === productPreview.code);
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
};
