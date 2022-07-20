<template>
    <div class="history-panel">
        <!--
        <div v-if="!isTabletLg" class="history-panel__list">
            <recently-viewed-product-card
                class="history-panel__list-item"
                v-for="item in items"
                :key="'history-panel-'+ item.id"
                :offer-id="item.id"
                :product-id="item.productId"
                :name="item.name"
                :href="item.url"
                :image="item.image"
            />
        </div>
        <v-slider v-else class="history-panel__slider" name="history" :options="sliderOptions">
        -->
        <v-slider class="history-panel__slider" name="history" :options="sliderOptions">
            <recently-viewed-product-card
                class="swiper-slide"
                v-for="item in items"
                :key="item.id"
                :offer-id="item.id"
                :product-id="item.productId"
                :name="item.name"
                :href="item.url"
                :image="item.image"
                :item="item"
                :in-cart="isInCart(cartItemTypes.PRODUCT, item.id)"
                @toggle-favorite-item="onToggleFavorite(item.productId)"
                @preview="onPreview(item.code)"
                @add-item="onAddToCart(item)"
            />
        </v-slider>
    </div>
</template>
<script>
import VSlider from '@controls/VSlider/VSlider.vue';
import RecentlyViewedProductCard from '@components/RecentlyViewedProductCard/RecentlyViewedProductCard.vue';

import {breakpoints, modalName} from '@enums';
import './HistoryPanel.css';
import {TOGGLE_FAVORITES_ITEM} from "@store/modules/Favorites/actions";
import {mapActions, mapGetters} from "vuex";
import {NAME as FAVORITES_MODULE} from "@store/modules/Favorites";

import {CHANGE_MODAL_STATE} from "@store/modules/Modal/actions";
import {NAME as MODAL_MODULE} from "@store/modules/Modal";
import {cartItemTypes} from "@enums/product";
import {NAME as CART_MODULE} from "@store/modules/Cart";
import {IS_IN_CART} from "@store/modules/Cart/getters";
import {ADD_CART_ITEM} from "@store/modules/Cart/actions";

const sliderOptions = {
    spaceBetween: 24,
    slidesPerView: 4,
    grabCursor: true,
    autoHeight: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    breakpoints: {
        [breakpoints.tabletLg - 1]: {
            slidesPerView: 3.5,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
        },

        [breakpoints.tablet - 1]: {
            slidesPerView: 2,
            spaceBetween: 12,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
        },
    },
};

export default {
    name: 'history-panel',

    components: {
        VSlider,
        RecentlyViewedProductCard,
    },

    data() {
        return {
            cartItemTypes,
        };
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
        ...mapGetters(CART_MODULE, {
            isInCart: IS_IN_CART,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        sliderOptions() {
            return sliderOptions;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),
        ...mapActions(CART_MODULE, {
            addToCart: ADD_CART_ITEM,
        }),

        onToggleFavorite(productId) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onPreview(code) {
            const { referralCode } = this;

            this[CHANGE_MODAL_STATE]({
                name: this.$mq.tablet ? modalName.general.QUICK_VARIANT_ADD_TO_CARD : modalName.general.QUICK_VIEW,
                open: true,
                state: { code, referralCode },
            });
        },

        async onAddToCart(item) {
            const { referralCode } = this;
            const { code, type, stock, id, variantGroups } = item;

            if (this.$mq.tablet && this.isInCart(cartItemTypes.PRODUCT, id) && !variantGroups) {
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.SNACK_NOTIFICATION,
                    open: true,
                    state: {
                        closeTimeout: 1500,
                        message: 'Товар уже в корзине',
                    },
                });
            } else {
                if (variantGroups) {
                    this.onPreview(code);
                } else {
                    if (this.$mq.tablet) {
                        try {
                            this.$progress.start();
                            await this.addToCart({
                                offerId: id,
                                storeId: stock && stock.storeId,
                                type,
                                referralCode,
                            });
                            this.$progress.finish();

                            this[CHANGE_MODAL_STATE]({
                                name: modalName.general.SNACK_NOTIFICATION,
                                open: true,
                                state: {
                                    closeTimeout: 1500,
                                    message: 'Товар добавлен в корзину',
                                },
                            });
                        } catch (error) {
                            this.$progress.fail();
                            console.error(error);
                        }
                    } else {
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
                    }
                }
            }
        },
    },
};
</script>
