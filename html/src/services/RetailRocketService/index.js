import { getProducts } from '@api';
import { catalogItemTypes } from '@enums/product';

/**
 * Сервис для RetailRocket
 */
class RetailRocketService {
    get apiEventQueue() {
        if (!window.rrApiOnReady) window.rrApiOnReady = [];
        return window.rrApiOnReady;
    }

    addProductView(productIds) {
        this.apiEventQueue.push(() => {
            try {
                window.rrApi.groupView([...productIds]);
            } catch (e) {}
        });
    }

    addCategoryView(categoryId) {
        this.apiEventQueue.push(() => {
            try {
                window.rrApi.categoryView(categoryId);
            } catch (e) {}
        });
    }

    addProductToBasket(productId) {
        try {
            window.rrApi.addToBasket(productId);
        } catch (e) {}
    }

    addTransaction(transactionId, items) {
        this.apiEventQueue.push(() => {
            try {
                window.rrApi.order({
                    transaction: `${transactionId}`,
                    items: [...items],
                });
            } catch (e) {}
        });
    }

    setEmail(email, info) {
        this.apiEventQueue.push(() => {
            try {
                window.rrApi.setEmail(email, info);
            } catch (e) {}
        });
    }
}

class RetailRocketHelper {
    constructor() {}

    /**
     * @param product
     * @param productOptions
     * @returns {Promise<*[]|*>}
     */
    static async collectIdsForProductView(product, productOptions) {
        if (productOptions && Array.isArray(productOptions.combinations) && productOptions.combinations.length > 1) {
            const { items } = await getProducts({
                filter: {
                    ids: productOptions.combinations.map((combination) => {
                        return combination.id;
                    }),
                },
            });

            if (Array.isArray(items) && items.length > 0) {
                const offerIds = items
                    .filter((product) => {
                        return product.type === catalogItemTypes.PRODUCT;
                    })
                    .map((product) => {
                        return product.id;
                    });

                if (offerIds.length > 0) {
                    return offerIds;
                }
            }
        } else if (product && typeof product.id !== 'undefined') {
            return [product.id];
        }

        return [];
    }
}

export default RetailRocketService;
export { RetailRocketService, RetailRocketHelper };
