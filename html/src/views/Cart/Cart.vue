<template>
    <section class="section cart-view">
        <v-cart-header />

        <div class="container">
            <h1 class="cart-view__section-hl">Моя корзина</h1>
        </div>

        <section class="section cart-view__main">
            <div v-if="cartItemsCount > 0" class="container cart-view__main-container">
                <div class="cart-view__main-tabs">
                    <v-tabs :items="cartTypes" key-field="type" :activeTab.sync="activeTab">
                        <template v-slot:header="{ item: type }">
                            {{ $t(`cart.title.${type.type}`) }}
                            &nbsp;&nbsp;<span class="text-grey">{{ type.items.length }}</span>
                        </template>

                        <template v-slot:panel="{ item: type }">
                            <cart-product-panel :items="type.items" v-if="IS_PRODUCT(type)" />
                            <cart-masterclass-panel :items="type.items" v-else-if="IS_MASTER_CLASS(type)" />
                        </template>
                    </v-tabs>

                    <v-link class="cart-view__main-clear" tag="button" @click="openOnClearCart(activeTabItem.type)">
                        <v-svg name="cross-small" width="13" height="13" />
                        &nbsp;&nbsp;Очистить корзину
                    </v-link>
                </div>

                <v-sticky class="cart-view__main-sticky">
                    <template v-slot:sticky>
                        <div class="cart-view__main-panel">
                            <p class="text-grey cart-view__main-panel-info">
                                Внимание: продукты и мастер-классы оплачиваются отдельно
                            </p>

                            <p class="cart-view__main-panel-line">
                                <span>
                                    Сумма заказа:
                                    <span class="text-lowercase">
                                        {{ $t(`cart.summary.type.${activeTabItem.type}`) }}
                                    </span>
                                </span>
                                <price v-bind="activeTabItem.summary.sum" />
                            </p>

                            <p
                                class="cart-view__main-panel-line"
                                v-for="discount in activeTabItem.summary.discounts"
                                :key="discount.type"
                            >
                                {{ $t(`cart.summary.discount.${discount.type}`) }}
                                <span>-<price v-bind="discount.value" /></span>
                            </p>

                            <div class="cart-view__main-panel-total">
                                <p class="text-bold cart-view__main-panel-line">
                                    Итого <price v-bind="activeTabItem.summary.total" />
                                </p>

                                <p v-if="!referralPartner" class="text-grey text-sm cart-view__main-panel-line">
                                    Будет начислено
                                    <span>
                                        {{
                                            activeTabItem.summary.bonusGet > 0
                                                ? `+ ${prepareBonus(activeTabItem.summary.bonusGet)}`
                                                : prepareBonus(activeTabItem.summary.bonusGet)
                                        }}
                                        бонусов
                                    </span>
                                </p>
                            </div>

                            <template v-if="isProduct">
                                <div v-if="!promocode" class="cart-view__main-panel-promo">
                                    <v-input
                                        class="cart-view__main-panel-promo-input"
                                        placeholder="Ваш промокод"
                                        v-model="inputPromocode"
                                    />

                                    <v-button
                                        class="btn--outline cart-view__main-panel-promo-btn"
                                        @click="ADD_PROMOCODE(inputPromocode)"
                                        :disabled="!inputPromocode"
                                    >
                                        Применить
                                    </v-button>
                                </div>

                                <div v-else class="cart-view__main-panel-promo cart-view__main-panel-promo--success">
                                    <div class="cart-view__main-panel-promo-icon">
                                        <v-svg name="check-small" width="16" height="16" />
                                    </div>

                                    <div>
                                        Промокод&nbsp;{{ promocode }}&nbsp;применён
                                        <v-link
                                            tag="button"
                                            class="cart-view__main-panel-promo-link"
                                            @click="DELETE_PROMOCODE(promocode)"
                                        >
                                            Отменить
                                        </v-link>
                                    </div>
                                </div>
                            </template>

                            <v-button class="cart-view__main-panel-submit" v-if="!isLoad" @click="loadCheckout">
                                Оформить заказ
                            </v-button>
                            <div class="cart-view__main-panel-preloader" v-else>
                                <v-spinner height="30" width="30" show />
                            </div>
                        </div>
                    </template>
                </v-sticky>
            </div>

            <div class="container cart-view__main-container" v-else>
                <div class="cart-view__empty-cart">
                    <v-svg name="cart" width="20" height="24" />

                    <span class="cart-view__empty-cart-message">
                        Вы ещё ничего не добавили в вашу корзину, перейдите в каталог для покупок
                    </span>

                    <v-button class="btn--outline cart-view__empty-cart-btn" to="/catalog">
                        Перейти к покупкам
                    </v-button>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <retail-rocket-container
                    v-if="cartItemsCount > 0"
                    data-retailrocket-markup-block="5f21670e97a5282edc07d7cd"
                    :data-products="activeItemIds"
                />
                <retail-rocket-container v-else data-retailrocket-markup-block="5f21671697a5282edc07d7ce" />
            </div>
        </section>

        <section class="section cart-view__section cart-view__featured">
            <div class="container cart-view__featured-container">
                <h2 class="cart-view__section-hl cart-view__featured-hl">{{ $t('cart.title.like') }}</h2>
                <v-slider class="cart-view__featured-slider" name="cart-featured" :options="sliderOptions">
                    <catalog-product-card
                        class="swiper-slide cart-view__featured-card"
                        v-for="item in featuredProducts"
                        :key="item.id"
                        :offer-id="item.id"
                        :product-id="item.productId"
                        :type="item.type"
                        :name="item.name"
                        :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :badges="item.badges"
                        :rating="item.rating"
                        :show-buy-btn="item.stock.qty > 0"
                        @add-item="onAddCartItem(item.id, item.stock.storeId)"
                        @preview="onPreview(item.code)"
                        @toggle-favorite-item="onToggleFavorite(item)"
                    />
                </v-slider>
            </div>
        </section>

        <transition name="fade">
            <clear-cart-modal v-if="isModalOpen" />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VLink from '@controls/VLink/VLink.vue';
import VInput from '@controls/VInput/VInput.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import VSlider from '@controls/VSlider/VSlider.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import Price from '@components/Price/Price.vue';
import VCartHeader from '@components/VCartHeader/VCartHeader.vue';

import CartProductPanel from '@components/cart/CartProductPanel/CartProductPanel.vue';
import CartMasterclassPanel from '@components/cart/CartMasterclassPanel/CartMasterclassPanel.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import CartBundleProductCard from '@components/CartBundleProductCard/CartBundleProductCard.vue';
import ClearCartModal from '@components/ClearCartModal/ClearCartModal.vue';
import VTabs from '@controls/VTabs/VTabs.vue';

import RetailRocketContainer from '@components/RetailRocketContainer/RetailRocketContainer.vue';

import { $store, $logger, $progress } from '@services';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as CART_MODULE, FEATURED_PRODUCTS, CART_DATA } from '@store/modules/Cart';
import {
    FETCH_FEATURED_PRODUCTS,
    DELETE_ALL_ITEMS,
    ADD_PROMOCODE,
    DELETE_PROMOCODE,
    FETCH_CART_DATA,
    SET_LOAD,
    ADD_CART_ITEM,
} from '@store/modules/Cart/actions';
import {
    PRODUCTS,
    MASTER_CLASSES,
    IS_PRODUCT,
    IS_MASTER_CLASS,
    CART_ITEMS_COUNT,
    CART_TYPES,
    PROMO_CODE,
} from '@store/modules/Cart/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as AUTH_MODULE, HAS_SESSION, REFERRAL_PARTNER, USER } from '@store/modules/Auth';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { cancelRoute } from '@settings';
import { breakpoints, modalName } from '@enums';
import { preparePrice } from '@util';
import { generateProductUrl } from '@util/catalog';
import { registerModuleIfNotExists } from '@util/store';

import '@images/sprites/cart.svg';
import './Cart.css';

const sliderOptions = {
    spaceBetween: 24,
    slidesPerView: 4,
    grabCursor: true,

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
            slidesPerView: 2.5,
            spaceBetween: 24,
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
    name: 'cart',

    components: {
        VSvg,
        VButton,
        VLink,
        VInput,
        VTabs,
        VSticky,
        VSlider,
        VSpinner,
        VCartHeader,

        Price,

        CatalogProductCard,
        ClearCartModal,

        CartProductPanel,
        CartMasterclassPanel,

        RetailRocketContainer,
    },

    data() {
        return {
            activeTab: 0,
            inputPromocode: null,
            isLoad: false,
        };
    },

    computed: {
        ...mapState(CART_MODULE, [FEATURED_PRODUCTS, CART_DATA]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, CART_TYPES, IS_PRODUCT, IS_MASTER_CLASS, PROMO_CODE]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: state => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),
        ...mapState(MODAL_MODULE, {
            isModalOpen: state =>
                state[MODALS][modalName.cart.CLEAR_CART] && state[MODALS][modalName.cart.CLEAR_CART].open,
        }),

        isProduct() {
            const { activeTabItem } = this;
            return this[IS_PRODUCT](activeTabItem);
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        sliderOptions() {
            return sliderOptions;
        },

        activeTabItem() {
            return this.cartTypes[this.activeTab];
        },

        activeItemIds() {
            const { activeTabItem = {} } = this;
            const { items = [] } = activeTabItem;
            return items.map(i => i.p.id).join(',');
        },
    },

    watch: {
        [HAS_SESSION](value) {
            if (!value) this.$router.replace(cancelRoute.path);
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),
        ...mapActions(CART_MODULE, [
            FETCH_CART_DATA,
            FETCH_FEATURED_PRODUCTS,
            DELETE_ALL_ITEMS,
            ADD_PROMOCODE,
            DELETE_PROMOCODE,
            ADD_CART_ITEM,
        ]),

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onAddCartItem(offerId, storeId) {
            this[ADD_CART_ITEM]({ offerId, storeId });
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: modalName.general.QUICK_VIEW, open: true, state: { code } });
        },

        openOnClearCart(type) {
            this[CHANGE_MODAL_STATE]({ name: modalName.cart.CLEAR_CART, open: true, state: { type } });
        },

        prepareBonus(value) {
            return preparePrice(value);
        },

        loadCheckout() {
            try {
                this.isLoad = true;
                this.$router.push(`/checkout/${this.activeTabItem.type}`);
            } catch (error) {
                this.isLoad = false;
                console.error('Ошибка в loadCheckout');
            }
        },
    },

    async serverPrefetch() {
        try {
            await this[FETCH_CART_DATA](this.$isServer);
        } catch (error) {}
    },

    beforeRouteEnter(to, from, next) {
        const { load } = $store.state[CART_MODULE];

        if (load) {
            $store.dispatch(`${CART_MODULE}/${SET_LOAD}`, false);
            return next();
        }

        $progress.start();
        $store
            .dispatch(`${CART_MODULE}/${FETCH_CART_DATA}`)
            .then(() => next(vm => $progress.finish()))
            .catch(() => next(vm => $progress.fail()));
    },

    mounted() {
        this[FETCH_FEATURED_PRODUCTS]();
    },
};
</script>
