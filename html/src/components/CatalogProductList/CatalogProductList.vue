<template>
    <transition-group
        v-if="animation"
        tag="ul"
        class="catalog-product-list"
        :class="{ 'catalog-product-list--fullscreen': fullscreen }"
        name="catalog-item"
        @before-enter="onBeforeEnterItems"
        @enter="onEnterItems"
        @after-enter="onAfterEnterItems"
        @leave="onLeaveItems"
    >
        <component
            class="catalog-product-list__item"
            v-for="item in items"
            :key="item.id"
            :class="getClass(item.type)"
            :is="getComponent(item.type)"
            :item="item"
            @add-item="onAddToCart(item)"
            @preview="onPreview(item.code)"
            @toggle-favorite-item="onToggleFavorite(item.productId)"
        />
    </transition-group>
    <ul v-else class="catalog-product-list">
        <component
            class="catalog-product-list__item"
            v-for="item in items"
            :key="item.id"
            :class="getClass(item.type)"
            :is="getComponent(item.type)"
            :item="item"
            @add-item="onAddToCart(item)"
            @preview="onPreview(item.code)"
            @toggle-favorite-item="onToggleFavorite(item.productId)"
        />
    </ul>
</template>

<script>
import CatalogBannerListCard from './CatalogBannerListCard/CatalogBannerListCard.vue';
import CatalogProductListCard from './CatalogProductListCard/CatalogProductListCard.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
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

        animation: {
            type: Boolean,
            default: true,
        },

        fullscreen: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        CatalogBannerListCard,
        CatalogProductListCard,
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
            this[CHANGE_MODAL_STATE]({ name: modalName.general.QUICK_VIEW, open: true, state: { code } });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.ADD_TO_CART,
                open: true,
                state: { offerId: item.id, storeId: item.stock.storeId, type: item.type },
            });
        },
    },
};
</script>
