<template>
    <div class="cart-product-panel">
        <div v-if="deliveryInfo && deliveryInfo.length > 0" class="cart-product-panel__alert">
            <div class="cart-product-panel__alert-icon">
                <v-svg name="alert" width="24" height="24" />
            </div>

            <div class="cart-product-panel__alert-text">
                <div v-for="alert in deliveryInfo" :key="alert.id">{{ alert.name }} {{ alert.description }}</div>
            </div>
        </div>
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
                    :old-price="product.oldPrice"
                    :count="count"
                    :href="product.url"
                    @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                    @toggle-favorite-item="onToggleFavorite(product)"
                    @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
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
                    @deleteBundle="onDeleteBundle"
                />
            </li>
        </transition-group>
    </div>
</template>

<script>
import CartProductCard from '@components/CartProductCard/CartProductCard.vue';
import CartBundleProductCard from '@components/CartBundleProductCard/CartBundleProductCard.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { LOCALE } from '@store';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { DELIVERY_INFO } from '@store/modules/Cart/getters';
import { ADD_CART_ITEM, DELETE_CART_ITEM, DELETE_CART_BUNDLE } from '@store/modules/Cart/actions';

import { fileExtension } from '@enums';
import { cartItemTypes } from '@enums/product';
import { generatePictureSourcePath } from '@util/file';
import { generateProductUrl } from '@util/catalog';

import '@images/sprites/alert.svg';
import './CartProductPanel.css';

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'cart-product-panel',

    components: {
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
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapGetters(CART_MODULE, [DELIVERY_INFO]),

        products() {
            return this.items.map(i => ({ ...i, p: { ...i.p, url: this.generateItemProductUrl(i.p) } }));
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [ADD_CART_ITEM, DELETE_CART_ITEM, DELETE_CART_BUNDLE]),

        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },

        onAddCartItem(offerId, storeId, count) {
            this[ADD_CART_ITEM]({ offerId, storeId, count });
        },

        onDeleteCartItem(offerId, storeId) {
            this[DELETE_CART_ITEM]({ offerId, storeId });
        },

        onDeleteBundle(bundleId) {
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

