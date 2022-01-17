/**
 * Сервис для RetailRocket
 */
export default class RetailRocketService {
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
