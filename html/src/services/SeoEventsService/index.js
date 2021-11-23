import { GtmImpressions, GtmClick, GtmAdd, GtmRemove, GtmDetail, GtmCheckout, GtmPurchase } from './Events';
class ProductsItem {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.price = ProductsItem.getPrice(params.price);
        this.brand = params.brandName;
        this.category = ProductsItem.getCategory(params.categoryCodes);
    }

    static getPrice(price) {
        return price ? price.value : undefined;
    }

    static getCategory(categoryCodes) {
        if (Array.isArray(categoryCodes)) return categoryCodes[categoryCodes.length - 1];
        return categoryCodes.code;
    }
}

class ProductsBuilder {
    constructor() {}

    createForLandingImpressions(params) {
        try {
            const impressions = [];
            params.forEach((param, index) => {
                const productsItem = new ProductsItem(param);
                productsItem.list = 'Homepage';
                productsItem.position = index + 1;
                impressions.push(productsItem);
            });
            return impressions;
        } catch (e) {
            console.warn(new EventWarning());
        }
    }

    createForCatalogImpressions(params) {
        try {
            const impressions = [];
            params.forEach((param, index) => {
                const productsItem = new ProductsItem(param);
                productsItem.list = 'Category';
                productsItem.position = index + 1;
                impressions.push(productsItem);
            });
            return impressions;
        } catch (e) {
            console.warn(new EventWarning());
        }
    }

    createForCatalogCardClick(params) {
        try {
            this.productsItem = new ProductsItem(params);
            this.productsItem.position = params.position;
            return [this.productsItem];
        } catch (e) {
            console.warn(new EventWarning());
        }
    }

    createForCart(params) {
        try {
            const products = [];
            params.forEach((param) => {
                const productsItem = new ProductsItem(param);
                productsItem.quantity = param.quantity;
                products.push(productsItem);
            });
            return products;
        } catch (e) {
            console.warn(new EventWarning());
        }
    }

    createForProductDetail(params) {
        try {
            this.productsItem = new ProductsItem(params);
            this.productsItem.name = params.title;
            this.productsItem.brand = params.brand.name;
            this.productsItem.category = params.categoryCodes[params.categoryCodes.length - 1].code;
            return [this.productsItem];
        } catch (e) {
            console.warn(new EventWarning());
        }
    }

    createForCheckout(params) {
        try {
            const products = [];
            for (const param of params) {
                const productsItem = new ProductsItem(param.p);
                productsItem.quantity = param.count;
                products.push(productsItem);
            }
            return products;
        } catch (e) {
            console.warn(new EventWarning());
        }
    }

    createForPurchase(params) {
        try {
            const { order: orderDetails, deliveries } = params;
            const products = [];
            for (const delivery of deliveries) {
                delivery.products.forEach((product) => {
                    const productsItem = {};
                    productsItem.id = product.offer_id;
                    productsItem.name = product.name;
                    productsItem.price = product.price ? product.price.value : undefined;
                    productsItem.brand = product.brandName;
                    productsItem.category = product.category_code;
                    productsItem.quantity = +product.qty;
                    products.push(productsItem);
                });
            }

            const {
                id,
                price: { value: revenue },
                delivery_price: { value: shipping },
            } = orderDetails;
            const actionField = { id, revenue, shipping };

            return { products, actionField };
        } catch (e) {
            console.warn(new EventWarning());
        }
    }
}

class EventWarning extends Error {
    constructor(message) {
        super(message);
        this.name = 'EventError';
    }
}

function updateDataLayer(event) {
    if (process.env.VUE_ENV !== 'client') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
}

const seoEvents = {
    impressions(impressions) {
        if (!impressions) return;
        updateDataLayer(new GtmImpressions(impressions));
    },

    click(products, actionField) {
        if (!products) return;
        updateDataLayer(new GtmClick('click', products, actionField));
    },

    add(products) {
        if (!products) return;
        updateDataLayer(new GtmAdd('add', products));
    },

    remove(products) {
        if (!products) return;
        updateDataLayer(new GtmRemove('remove', products));
    },

    detail(products, actionField) {
        if (!products) return;
        updateDataLayer(new GtmDetail('detail', products, actionField));
    },

    checkout(products, actionField) {
        if (!products) return;
        updateDataLayer(new GtmCheckout('checkout', products, actionField));
    },

    purchase(products, actionField) {
        if (!products) return;
        updateDataLayer(new GtmPurchase('purchase', products, actionField));
    },
};

export { seoEvents, ProductsBuilder };
