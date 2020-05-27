/**
 * Сервис для RetailRocket
 */
export default class RetailRocketService {
    get apiEventQueue() {
        return (window['rrApiOnReady'] = window['rrApiOnReady'] || []);
    }

    addProductView(productIds) {
        this.apiEventQueue.push(() => {
            try {
                rrApi.groupView([...productIds]);
            } catch (e) {}
        });
    }

    addCategoryView(categoryId) {
        this.apiEventQueue.push(() => {
            try {
                rrApi.categoryView(categoryId);
            } catch (e) {}
        });
    }

    addProductToBasket(productId) {
        try {
            rrApi.addToBasket(productId);
        } catch (e) {}
    }

    addTransaction(transactionId, items) {
        this.apiEventQueue.push(() => {
            try {
                rrApi.order({
                    transaction: `${transactionId}`,
                    items: [...items],
                });
            } catch (e) {}
        });
    }
}
