<template>
    <div class="cart-product-panel">
        <attention-panel class="cart-product-panel__alert">
            Точная дата доставки будет рассчитана на следующем шаге оформления заказа
        </attention-panel>

        <template v-if="userProfessional">
            <transition-group
                class="cart-product-panel__list"
                tag="ul"
                name="cart-item"
                @before-enter="onBeforeEnterItems"
                @enter="onEnterItems"
                @after-enter="onAfterEnterItems"
                @leave="onLeaveItems"
            >
                <li
                    class="cart-product-panel__list-item"
                    v-for="({ p: product, count, type }, index) in products"
                    :key="product.id"
                >
                    <cart-product-card
                        v-if="type === cartItemTypes.PRODUCT"
                        :data-index="index"
                        :offer-id="product.id"
                        :product-id="product.productId"
                        :type="product.type"
                        :name="product.name"
                        :image="product.image"
                        :price="product.price"
                        :bonus="product.bonus"
                        :old-price="product.oldPrice"
                        :count="count"
                        :max-count="product.stock && product.stock.qty"
                        :href="product.url"
                        :is-active="product.active"
                        :user-can-buy="product.userCanBuy"
                        show-count
                        show-controls
                        @toggle-favorite-item="onToggleFavorite(product)"
                        @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                        @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                    />
                    <cart-bundle-product-card
                        v-else-if="type === cartItemTypes.BUNDLE_PRODUCT"
                        :bundle-id="product.id"
                        :name="product.name"
                        :price="product.price"
                        :bonus="product.bonus"
                        :old-price="product.oldPrice"
                        :items="product.items"
                        :count="count"
                        :is-active="product.active"
                        :user-can-buy="product.userCanBuy"
                        show-count
                        show-controls
                        @countChange="onAddCartBundleItem(product.id, $event.count)"
                        @deleteBundle="onDeleteCartBundleItem(product.id)"
                    />
                </li>
            </transition-group>

            <template v-if="filteredProducts.merchantDiploma.length > 0">
                <div class="cart-product-panel__list-header">
                    <div class="cart-product-panel__list-header-title">Товары для прошедших обучение</div>
                    <div class="cart-product-panel__list-header-hint">
                        Товары для прошедших обучение
                    </div>
                </div>

                <transition-group
                    v-if="filteredProducts.merchantDiploma.length > 0"
                    class="cart-product-panel__list"
                    tag="ul"
                    name="cart-item"
                    @before-enter="onBeforeEnterItems"
                    @enter="onEnterItems"
                    @after-enter="onAfterEnterItems"
                    @leave="onLeaveItems"
                >
                    <li
                        class="cart-product-panel__list-item"
                        v-for="({ p: product, count, type }, index) in filteredProducts.merchantDiploma"
                        :key="product.id"
                    >
                        <cart-product-card
                            v-if="type === cartItemTypes.PRODUCT"
                            :data-index="index"
                            :offer-id="product.id"
                            :product-id="product.productId"
                            :type="product.type"
                            :name="product.name"
                            :image="product.image"
                            :price="product.price"
                            :bonus="product.bonus"
                            :old-price="product.oldPrice"
                            :count="count"
                            :max-count="product.stock && product.stock.qty"
                            :href="product.url"
                            :is-active="product.active"
                            :user-can-buy="product.userCanBuy"
                            show-count
                            show-controls
                            @toggle-favorite-item="onToggleFavorite(product)"
                            @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                            @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                        />

                        <cart-bundle-product-card
                            v-else-if="type === cartItemTypes.BUNDLE_PRODUCT"
                            :bundle-id="product.id"
                            :name="product.name"
                            :price="product.price"
                            :bonus="product.bonus"
                            :old-price="product.oldPrice"
                            :items="product.items"
                            :count="count"
                            :is-active="product.active"
                            :user-can-buy="product.userCanBuy"
                            show-count
                            show-controls
                            @countChange="onAddCartBundleItem(product.id, $event.count)"
                            @deleteBundle="onDeleteCartBundleItem(product.id)"
                        />
                    </li>
                </transition-group>
            </template>
        </template>

        <template v-else>
            <transition-group
                v-if="filteredProducts.common.length > 0"
                class="cart-product-panel__list"
                tag="ul"
                name="cart-item"
                @before-enter="onBeforeEnterItems"
                @enter="onEnterItems"
                @after-enter="onAfterEnterItems"
                @leave="onLeaveItems"
            >
                <li
                    class="cart-product-panel__list-item"
                    v-for="({ p: product, count, type }, index) in filteredProducts.common"
                    :key="product.id"
                >
                    <cart-product-card
                        v-if="type === cartItemTypes.PRODUCT"
                        :data-index="index"
                        :offer-id="product.id"
                        :product-id="product.productId"
                        :type="product.type"
                        :name="product.name"
                        :image="product.image"
                        :price="product.price"
                        :bonus="product.bonus"
                        :old-price="product.oldPrice"
                        :count="count"
                        :max-count="product.stock && product.stock.qty"
                        :href="product.url"
                        :is-active="product.active"
                        :user-can-buy="product.userCanBuy"
                        show-count
                        show-controls
                        @toggle-favorite-item="onToggleFavorite(product)"
                        @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                        @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                    />

                    <cart-bundle-product-card
                        v-else-if="type === cartItemTypes.BUNDLE_PRODUCT"
                        :bundle-id="product.id"
                        :name="product.name"
                        :price="product.price"
                        :bonus="product.bonus"
                        :old-price="product.oldPrice"
                        :items="product.items"
                        :count="count"
                        :is-active="product.active"
                        :user-can-buy="product.userCanBuy"
                        show-count
                        show-controls
                        @countChange="onAddCartBundleItem(product.id, $event.count)"
                        @deleteBundle="onDeleteCartBundleItem(product.id)"
                    />
                </li>
            </transition-group>

            <template v-if="filteredProducts.professional.length > 0">
                <div class="cart-product-panel__list-header">
                    <div class="cart-product-panel__list-header-title">Продукты для профессионалов</div>
                    <div class="cart-product-panel__list-header-hint">
                        Покупка и цены станут доступны только после прохождения модерации
                    </div>
                </div>

                <transition-group
                    v-if="filteredProducts.professional.length > 0"
                    class="cart-product-panel__list"
                    tag="ul"
                    name="cart-item"
                    @before-enter="onBeforeEnterItems"
                    @enter="onEnterItems"
                    @after-enter="onAfterEnterItems"
                    @leave="onLeaveItems"
                >
                    <li
                        class="cart-product-panel__list-item"
                        v-for="({ p: product, count, type }, index) in filteredProducts.professional"
                        :key="product.id"
                    >
                        <cart-product-card
                            v-if="type === cartItemTypes.PRODUCT"
                            :data-index="index"
                            :offer-id="product.id"
                            :product-id="product.productId"
                            :type="product.type"
                            :name="product.name"
                            :image="product.image"
                            :price="product.price"
                            :bonus="product.bonus"
                            :old-price="product.oldPrice"
                            :count="count"
                            :max-count="product.stock && product.stock.qty"
                            :href="product.url"
                            :is-active="product.active"
                            :user-can-buy="product.userCanBuy"
                            show-count
                            show-controls
                            @toggle-favorite-item="onToggleFavorite(product)"
                            @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                            @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                        />

                        <cart-bundle-product-card
                            v-else-if="type === cartItemTypes.BUNDLE_PRODUCT"
                            :bundle-id="product.id"
                            :name="product.name"
                            :price="product.price"
                            :bonus="product.bonus"
                            :old-price="product.oldPrice"
                            :items="product.items"
                            :count="count"
                            :is-active="product.active"
                            :user-can-buy="product.userCanBuy"
                            show-count
                            show-controls
                            @countChange="onAddCartBundleItem(product.id, $event.count)"
                            @deleteBundle="onDeleteCartBundleItem(product.id)"
                        />
                    </li>
                </transition-group>
            </template>
        </template>
    </div>
</template>

<script>
import CartProductCard from '@components/CartProductCard/CartProductCard.vue';
import CartBundleProductCard from '@components/CartBundleProductCard/CartBundleProductCard.vue';

import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { LOCALE } from '@store';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { DELIVERY_INFO } from '@store/modules/Cart/getters';
import { ADD_CART_ITEM, DELETE_CART_ITEM, DELETE_CART_BUNDLE, ADD_CART_BUNDLE } from '@store/modules/Cart/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { cartItemTypes } from '@enums/product';
import { generateProductUrl } from '@util/catalog';
import './CartProductPanel.css';

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'cart-product-panel',

    components: {
        AttentionPanel,

        CartProductCard,
        CartBundleProductCard,
    },

    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },

        userProfessional: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapGetters(CART_MODULE, [DELIVERY_INFO]),

        products() {
            return this.items.map((item) => {
                const price = item.p.price
                    ? Object.assign(item.p.price, { isPriceHidden: item.p.isPriceHidden })
                    : { isPriceHidden: item.p.isPriceHidden };

                const oldPrice = item.p.oldPrice
                    ? Object.assign(item.p.oldPrice, { isPriceHidden: item.p.isPriceHidden })
                    : null;

                return {
                    ...item,
                    p: { ...item.p, url: this.generateItemProductUrl(item.p), price, oldPrice },
                };
            });
        },

        filteredProducts() {
            let products = {
                common: [],
                professional: [],
                merchantDiploma: [],
            };
            for (const product of this.products) {
                if (product.type === cartItemTypes.BUNDLE_PRODUCT) {
                    products.common.push(product);
                } else {
                    if (product.p.isNeedMerchantDiploma === true) {
                        products.merchantDiploma.push(product);
                    } else if (product.p.isOnlyForProfessional === true) {
                        products.professional.push(product);
                    } else {
                        products.common.push(product);
                    }
                }
            }

            return products;
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [ADD_CART_ITEM, ADD_CART_BUNDLE, DELETE_CART_ITEM, DELETE_CART_BUNDLE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onAddCartItem(offerId, storeId, count) {
            this[ADD_CART_ITEM]({ offerId, storeId, count });
        },

        onDeleteCartItem(offerId, storeId) {
            this[DELETE_CART_ITEM]({ offerId, storeId });
        },

        onAddCartBundleItem(bundleId, count) {
            this[ADD_CART_BUNDLE]({ bundleId, count });
        },

        onDeleteCartBundleItem(bundleId) {
            this[DELETE_CART_BUNDLE](bundleId);
        },

        onBeforeEnterItems(el) {
            el.dataset.index = counter;
            counter += 1;
            el.style.opacity = 0;
        },

        itemAnimation(el, delay) {
            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            el.style.opacity = 1;
                            resolve();
                        });
                    }, delay);
                } catch (error) {
                    reject(error);
                }
            });
        },

        async onEnterItems(el, done) {
            const delay = el.dataset.index * itemAnimationDelayDelta;
            await this.itemAnimation(el, delay);
            done();
        },

        onAfterEnterItems(el) {
            delete el.dataset.index;
            counter = 0;
        },

        onLeaveItems(el, done) {
            requestAnimationFrame(() => {
                el.style.opacity = 0;
                done();
            });
        },
    },

    created() {
        this.cartItemTypes = cartItemTypes;
    },
};
</script>
