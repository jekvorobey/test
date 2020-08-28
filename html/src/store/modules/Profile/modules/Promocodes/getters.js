import { digit2DateSettings } from '@settings';

function prepareOffer(offer, categories, brands) {
    return {
        ...offer,
        category: categories[offer.category_id],
        brand: brands[offer.brand_id],
    };
}

export const PROMOCODES = 'promocodes';

export default {
    [PROMOCODES]({ items, categories = {}, brands = {}, offers = {} }, getters, rootState) {
        const { locale } = rootState;

        return items.map((i) => {
            const startDate = i.start_date && new Date(i.start_date);
            const endDate = i.end_date && new Date(i.end_date);

            const itemOffers =
                i.discountInfo && i.discountInfo.offers.map((o) => prepareOffer(offers[o], categories, brands));

            const offersMap = {};
            if (itemOffers)
                // eslint-disable-next-line no-restricted-syntax
                for (const offer of itemOffers) {
                    const key = `${offer.category.name} ${offer.brand.name}`;
                    if (!offersMap[key]) offersMap[key] = { id: key, isOpen: false, items: [] };
                    offersMap[key].items.push(offer);
                }

            return {
                type: i.type,
                code: i.code,
                discount: i.discountInfo && i.discountInfo.value,
                startDate: startDate && startDate.toLocaleDateString(locale, digit2DateSettings),
                endDate: endDate && endDate.toLocaleDateString(locale, digit2DateSettings),
                discountType: i.discountInfo && i.discountInfo.type,
                brands: i.discountInfo && {
                    isOpen: false,
                    items: i.discountInfo.brands.map((b) => brands[b]),
                },
                categories: i.discountInfo && {
                    isOpen: false,
                    items: i.discountInfo.categories.map((c) => categories[c]),
                },
                offers: offersMap,
            };
        });
    },
};
