class GtmBase {
    static currencyCode = 'RUB';
    static event = 'gtm-ee-event';
    static category = 'Enhanced Ecommerce';

    constructor() {
        this.event = GtmBase.event;
        this['gtm-ee-event-category'] = GtmBase.category;
    }
}

/**
 * @typedef {Object<string, number>[]} Impressions
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} brand
 * @property {string} category
 * @property {string} list
 * @property {number} position
 */

/**
 * @param {Impressions} impressions
 */

class GtmImpressions extends GtmBase {
    constructor(impressions) {
        super();
        this.ecommerce = {
            currencyCode: GtmImpressions.currencyCode,
            impressions: impressions,
        };
        this['gtm-ee-event-action'] = 'Product Impressions';
        this['gtm-ee-event-non-interaction'] = 'True';
    }
}

class GtmEvent extends GtmBase {
    constructor(eventName, products) {
        super();
        this.ecommerce = {
            [eventName]: {
                products: products,
            },
        };
    }

    addActionField(event, field) {
        this.ecommerce[event].actionField = { list: field };
    }

    addCurrencyCode(event) {
        this.ecommerce[event].currencyCode = GtmEvent.currencyCode;
    }
}

/**
 * @typedef {Object<string, number>[]} Products
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} brand
 * @property {string} category
 */

/**
 * @typedef {Products} ClickProducts
 * @property {number} position
 */

/**
 * @param {String} eventName
 * @param {ClickProducts} products
 * @param {String} actionField
 */

class GtmClick extends GtmEvent {
    static action = 'Product Click';
    static interaction = 'False';

    constructor(eventName, products, actionField) {
        super(eventName, products);
        this.addActionField(eventName, actionField);
        this['gtm-ee-event-action'] = GtmClick.action;
        this['gtm-ee-event-non-interaction'] = GtmClick.interaction;
    }
}

/**
 * @typedef {Products} AddProducts
 * @property {number} quantity
 */

/**
 * @param {String} eventName
 * @param {AddProducts} products
 */

class GtmAdd extends GtmEvent {
    static action = 'Product Add Cart';
    static interaction = 'False';

    constructor(eventName, products) {
        super(eventName, products);
        this.addCurrencyCode(eventName);
        this['gtm-ee-event-action'] = GtmAdd.action;
        this['gtm-ee-event-non-interaction'] = GtmAdd.interaction;
    }
}

/**
 * @typedef {Products} RemoveProducts
 * @property {number} quantity
 */

/**
 * @param {String} eventName
 * @param {RemoveProducts} products
 */

class GtmRemove extends GtmEvent {
    static action = 'Product Remove Cart';
    static interaction = 'False';

    constructor(eventName, products) {
        super(eventName, products);
        this.addCurrencyCode(eventName);
        this['gtm-ee-event-action'] = GtmRemove.action;
        this['gtm-ee-event-non-interaction'] = GtmRemove.interaction;
    }
}

/**
 * @typedef {Products} DetailProducts
 */

/**
 * @param {String} eventName
 * @param {DetailProducts} products
 * @param {String} actionField
 */

class GtmDetail extends GtmEvent {
    static action = 'Product Details';
    static interaction = 'True';

    constructor(eventName, products, actionField) {
        super(eventName, products);
        this.addActionField(eventName, actionField);
        this['gtm-ee-event-action'] = GtmDetail.action;
        this['gtm-ee-event-non-interaction'] = GtmDetail.interaction;
    }
}

/**
 * @typedef {Products} CheckoutProducts
 * @property {number} quantity
 */

/**
 * @param {String} eventName
 * @param {CheckoutProducts} products
 * @param {Number} actionField
 */

class GtmCheckout extends GtmEvent {
    static action = 'Checkout Step';
    static interaction = 'False';

    constructor(eventName, products, actionField) {
        super(eventName, products);
        this.ecommerce.currencyCode = GtmCheckout.currencyCode;
        this.ecommerce[eventName].actionField = { step: actionField };
        this['gtm-ee-event-action'] = `${GtmCheckout.action} ${actionField}`;
        this['gtm-ee-event-non-interaction'] = GtmCheckout.interaction;
    }
}

/**
 * @typedef {Products} PurchaseProducts
 * @property {number} quantity
 */

/**
 * @typedef {Object<number>} PurchaseActionField
 * @property {number} id
 * @property {number} revenue
 * @property {number} shipping
 */

/**
 * @param {String} eventName
 * @param {PurchaseProducts} products
 * @param {PurchaseActionField} actionField
 */

class GtmPurchase extends GtmEvent {
    static action = 'Purchase';
    static interaction = 'False';

    constructor(eventName, products, actionField) {
        super(eventName, products);
        this.ecommerce.currencyCode = GtmPurchase.currencyCode;
        this.ecommerce[eventName].actionField = actionField;
        this['gtm-ee-event-action'] = GtmPurchase.action;
        this['gtm-ee-event-non-interaction'] = GtmPurchase.interaction;
    }
}

export { GtmImpressions, GtmClick, GtmAdd, GtmRemove, GtmDetail, GtmCheckout, GtmPurchase };
