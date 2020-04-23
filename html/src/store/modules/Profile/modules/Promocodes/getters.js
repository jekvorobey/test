import { digit2DateSettings } from '@settings';

export const PROMOCODES = 'promocodes';

export default {
    [PROMOCODES]({ items, categories, brands, offers }, getters, rootState) {
        const { locale } = rootState;

        return items.map((i) => {
            const startDate = i.start_date && new Date(i.start_date);
            const endDate = i.end_date && new Date(i.end_date);

            return {
                code: i.code,
                discount: i.discountInfo && i.discountInfo.value,
                startDate: startDate && startDate.toLocaleDateString(locale, digit2DateSettings),
                endDate: endDate && endDate.toLocaleDateString(locale, digit2DateSettings),
            };
        });
    },
};
