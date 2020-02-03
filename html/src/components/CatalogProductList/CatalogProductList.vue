<template>
    <transition-group
        v-if="animation"
        tag="ul"
        class="catalog-product-list"
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
            @addItem="onAddToCart($event)"
            @preview="onPreview(item.code)"
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
            @addItem="onAddToCart($event)"
            @preview="onPreview(item.code)"
        />
    </ul>
</template>

<script>
import CatalogBannerListCard from './CatalogBannerListCard/CatalogBannerListCard.vue';
import CatalogProductListCard from './CatalogProductListCard/CatalogProductListCard.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as CATALOG_MODULE, ITEMS } from '../../store/modules/Catalog';

import { NAME as QUICK_VIEW_MODAL_NAME } from '../../components/QuickViewModal/QuickViewModal.vue';
import { NAME as ADD_TO_CART_MODAL_NAME } from '../../components/AddToCartModal/AddToCartModal.vue';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import { catalogItemTypes } from '../../assets/scripts/constants';
import './CatalogProductList.css';

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'catalog-product-list',

    props: {
        animation: {
            type: Boolean,
            default: true,
        },
    },

    components: {
        CatalogBannerListCard,
        CatalogProductListCard,
    },

    computed: {
        ...mapState(CATALOG_MODULE, [ITEMS]),
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

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

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: QUICK_VIEW_MODAL_NAME, open: true, state: { code } });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: ADD_TO_CART_MODAL_NAME,
                open: true,
                state: { offerId: item.id, type: item.type },
            });
        },
    },
};
</script>