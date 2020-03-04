<template>
    <section class="section">
        <div class="container products-section" :class="{ 'products-section--inverse': inverse }">
            <h2 class="products-section__hl">{{ titleText }}</h2>

            <div class="products-section__grid">
                <div class="products-section__cards">
                    <catalog-product-card
                        class="products-section__card"
                        v-for="product in items"
                        :key="product.id"
                        :product-id="product.id"
                        :name="product.name"
                        :type="product.type"
                        :href="`/catalog/${product.categoryCodes[product.categoryCodes.length - 1]}/${product.code}`"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :tags="product.tags"
                        :rating="product.rating"
                        :show-buy-btn="product.stock.qty > 0"
                        @addItem="onAddToCart(product)"
                        @preview="onPreview(product.code)"
                    />
                    <v-button class="btn--outline products-section__link" :to="btnLink">
                        {{ btnText }}
                    </v-button>
                </div>

                <catalog-banner-card
                    class="products-section__banner"
                    :banner-id="banner.id"
                    :btn-text="banner.btnText"
                    :title="banner.title"
                    :upper-text="banner.upperText"
                    :image="banner.image"
                />
            </div>
        </div>
    </section>
</template>
<script>
import VButton from '../../controls/VButton/VButton.vue';
import CatalogProductCard from '../../CatalogProductCard/CatalogProductCard.vue';
import CatalogBannerCard from '../../CatalogBannerCard/CatalogBannerCard.vue';

import { mapActions } from 'vuex';
import { NAME as CART_MODULE } from '../../../store/modules/Cart';
import { ADD_CART_ITEM } from '../../../store/modules/Cart/actions';

import { NAME as MODAL_MODULE } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import './ProductsSection.css';

export default {
    name: 'products-section',
    components: {
        VButton,
        CatalogProductCard,
        CatalogBannerCard,
    },

    props: {
        titleText: {
            type: String,
            default: 'Title',
        },

        btnText: {
            type: String,
            default: 'Посмотреть все',
        },

        btnLink: {
            type: String,
            default: '/',
        },

        inverse: {
            type: Boolean,
            default: false,
        },

        items: {
            type: Array,
            default() {
                return [];
            },
        },

        banner: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: 'quick-view-modal', open: true, state: { code } });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: 'add-to-cart-modal',
                open: true,
                state: { offerId: item.id, storeId: item.stock.storeId, type: item.type },
            });
        },
    },
};
</script>
