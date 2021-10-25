<template>
    <div
        class="catalog-product-list"
        :class="{ 'catalog-product-list--fullscreen': fullscreen }"
        v-bind="itemPropSettings.itemList"
    >
        <meta v-if="itemProp" v-bind="itemPropSettings.numberOfItems" />
        <transition-group
            class="catalog-product-list__list"
            v-if="animation"
            tag="ul"
            name="catalog-item"
            @before-enter="onBeforeEnterItems"
            @enter="onEnterItems"
            @after-enter="onAfterEnterItems"
            @leave="onLeaveItems"
        >
            <component
                class="catalog-product-list__item"
                v-for="(item, index) in items"
                :key="item.id"
                :class="getClass(item.type)"
                :is="getComponent(item.type)"
                :item="item"
                :referral-code="referralCode"
                :position="index + 1"
                :mobileOrder="calcMobileOrder(item)"
                item-prop
                @add-item="onAddToCart(item)"
                @preview="onPreview(item.code)"
                @toggle-favorite-item="onToggleFavorite(item.productId)"
            />
        </transition-group>
        <ul class="catalog-product-list__list" v-else>
            <component
                class="catalog-product-list__item"
                v-for="item in items"
                :key="item.id"
                :class="getClass(item.type)"
                :is="getComponent(item.type)"
                :item="item"
                :referral-code="referralCode"
                :mobileOrder="calcMobileOrder(item)"
                @add-item="onAddToCart(item)"
                @preview="onPreview(item.code)"
                @toggle-favorite-item="onToggleFavorite(item.productId)"
            />
        </ul>
    </div>
</template>

<script>
import CatalogBannerListCard from './CatalogBannerListCard/CatalogBannerListCard.vue';
import CatalogProductListCard from './CatalogProductListCard/CatalogProductListCard.vue';

import { mapActions } from 'vuex';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { modalName } from '@enums';
import { catalogItemTypes } from '@enums/product';
import './CatalogProductList.css';

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'catalog-product-list',

    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },

        referralCode: {
            type: String,
        },

        animation: {
            type: Boolean,
            default: true,
        },

        fullscreen: {
            type: Boolean,
            default: false,
        },

        itemProp: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        CatalogBannerListCard,
        CatalogProductListCard,
    },

    computed: {
        itemPropSettings() {
            const { itemProp, items = [] } = this;

            return itemProp
                ? {
                      itemList: {
                          itemscope: true,
                          itemtype: 'https://schema.org/ItemList',
                      },
                      numberOfItems: {
                          itemprop: 'numberOfItems',
                          content: items && items.length,
                      },
                  }
                : {
                      itemList: {},
                      numberOfItems: {},
                  };
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        getComponent(type) {
            switch (type) {
                case catalogItemTypes.PRODUCT:
                    return CatalogProductListCard.name;
                case catalogItemTypes.BANNER:
                    return CatalogBannerListCard.name;
                default:
                    'div';
            }
        },

        getClass(type) {
            return { 'catalog-product-list__item--banner': type === catalogItemTypes.BANNER };
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

        onToggleFavorite(productId) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onPreview(code) {
            const { referralCode } = this;

            this[CHANGE_MODAL_STATE]({
                name: modalName.general.QUICK_VIEW,
                open: true,
                state: { code, referralCode },
            });
        },

        onAddToCart(item) {
            const { referralCode } = this;
            const { code, type, stock, id, variantGroups } = item;

            if (variantGroups) this.onPreview(code);
            else
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.ADD_TO_CART,
                    open: true,
                    state: {
                        offerId: id,
                        storeId: stock && stock.storeId,
                        type,
                        referralCode,
                    },
                });
        },

        calcMobileOrder(item) {
            const { items = [] } = this;
            if (item.id === items[1].id && item.type === catalogItemTypes.BANNER) {
                return 2;
            }
            if (item.id === items[0].id || (item.id === items[2].id && items[1].type === catalogItemTypes.BANNER)) {
                return 1;
            }
            return 3;
        },
    },
};
</script>
