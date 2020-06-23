<template>
    <section class="section cart-view">
        <v-cart-header />
        <div class="container">
            <h1 class="cart-view__section-hl">Моя корзина</h1>
        </div>
        <section class="section cart-view__main">
            <div v-if="cartItemsCount > 0" class="container cart-view__main-container">
                <div class="cart-view__main-tabs">
                    <v-tabs :items="cartTypes" key-field="id" :activeTab.sync="activeTab">
                        <template v-slot:header="{ item: type }">
                            {{ $t(`cart.title.${type.type}`) }}
                            &nbsp;&nbsp;<span class="text-grey">{{ type.items.length }}</span>
                        </template>
                        <template v-slot:panel="{ item: type }">
                            <div class="cart-view__main-products" v-if="IS_PRODUCT(type)">
                                <div
                                    v-if="deliveryInfo && deliveryInfo.length > 0"
                                    class="cart-view__main-products-alert"
                                >
                                    <div class="cart-view__main-products-alert-icon">
                                        <v-svg name="alert" width="24" height="24" />
                                    </div>

                                    <div class="cart-view__main-products-alert-text">
                                        <div v-for="alert in deliveryInfo" :key="alert.id">
                                            {{ alert.name }} {{ alert.description }}
                                        </div>
                                    </div>
                                </div>
                                <transition-group
                                    class="cart-view__main-products-list cart-view__products-list"
                                    tag="ul"
                                    name="cart-item"
                                    @before-enter="onBeforeEnterItems"
                                    @enter="onEnterItems"
                                    @after-enter="onAfterEnterItems"
                                    @leave="onLeaveItems"
                                >
                                    <li
                                        class="cart-view__products-list-item"
                                        v-for="({ p: product, count }, index) in type.items"
                                        :key="product.id"
                                    >
                                        <cart-product-card
                                            v-if="product.type === 'product'"
                                            class="cart-view__main-products-list-item"
                                            :data-index="index"
                                            :offer-id="product.id"
                                            :product-id="product.productId"
                                            :type="product.type"
                                            :name="product.name"
                                            :image="product.image"
                                            :price="product.price"
                                            :old-price="product.oldPrice"
                                            :count="count"
                                            :href="generateItemProductUrl(product)"
                                            @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                                            @toggle-favorite-item="onToggleFavorite(product)"
                                            @countChange="
                                                onAddCartItem(product.id, product.stock.storeId, $event.count)
                                            "
                                        />
                                        <cart-bundle-product-card
                                            v-else-if="(product.type = 'bundle_product')"
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
                            <div class="cart-view__main-masterclass" v-else-if="IS_MASTER_CLASS(type)">
                                <transition-group
                                    class="cart-view__main-products-list"
                                    tag="ul"
                                    name="cart-item"
                                    @before-enter="onBeforeEnterItems"
                                    @enter="onEnterItems"
                                    @after-enter="onAfterEnterItems"
                                    @leave="onLeaveItems"
                                >
                                    <cart-master-class-card
                                        class="cart-view__main-products-list-item"
                                        v-for="({ mc: product, count }, index) in type.items"
                                        :data-index="index"
                                        :key="product.id"
                                        :product-id="product.id"
                                        :type="product.type"
                                        :name="product.name"
                                        :image="product.image"
                                        :price="product.price"
                                        :old-price="product.oldPrice"
                                        :date="product.date"
                                        :author="product.author"
                                        :count="count"
                                        @deleteItem="onDeleteCartItem(product.id, product.stock.storeId)"
                                        @countChange="onAddCartItem(product.id, product.stock.storeId, $event.count)"
                                        href="/catalog"
                                    />
                                </transition-group>
                            </div>
                        </template>
                    </v-tabs>
                    <v-link class="cart-view__main-clear" tag="button" @click="onClearCart">
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
                                Сумма заказа: {{ $t(`cart.summary.type.${activeTabItem.type}`) }}
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
                            <div v-if="!promocode" class="cart-view__main-panel-promo">
                                <v-input
                                    class="cart-view__main-panel-promo-input"
                                    placeholder="Введите промокод"
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
                            <v-button class="cart-view__main-panel-submit" :to="`/checkout/${activeTabItem.type}`">
                                Оформить заказ
                            </v-button>
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
                    <a class="cart-view__empty-cart-btn btn btn--outline" href="/catalog">Перейти к покупкам</a>
                </div>
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
                        :tags="item.tags"
                        :rating="item.rating"
                        :show-buy-btn="item.stock.qty > 0"
                        @add-item="onAddCartItem(item.id, item.stock.storeId)"
                        @preview="onPreview(item.code)"
                        @toggle-favorite-item="onToggleFavorite(item)"
                    />
                </v-slider>
            </div>
        </section>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VLink from '@controls/VLink/VLink.vue';
import VInput from '@controls/VInput/VInput.vue';

import VSlider from '@controls/VSlider/VSlider.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import Price from '@components/Price/Price.vue';
import VCartHeader from '@components/VCartHeader/VCartHeader.vue';

import CartMasterClassCard from '@components/CartMasterClassCard/CartMasterClassCard.vue';
import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import CartProductCard from '@components/CartProductCard/CartProductCard.vue';
import CartBundleProductCard from '@components/CartBundleProductCard/CartBundleProductCard.vue';
import VTabs from '@controls/VTabs/VTabs.vue';

import { $store, $logger, $progress } from '@services';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as CART_MODULE, FEATURED_PRODUCTS, CART_DATA } from '@store/modules/Cart';
import {
    FETCH_FEATURED_PRODUCTS,
    DELETE_CART_ITEM,
    ADD_CART_ITEM,
    DELETE_ALL_ITEMS,
    ADD_PROMOCODE,
    DELETE_PROMOCODE,
    FETCH_CART_DATA,
    SET_LOAD,
    DELETE_CART_BUNDLE,
} from '@store/modules/Cart/actions';
import {
    PRODUCTS,
    MASTER_CLASSES,
    IS_PRODUCT,
    IS_MASTER_CLASS,
    CART_ITEMS_COUNT,
    CART_TYPES,
    PROMO_CODE,
    DELIVERY_INFO,
} from '@store/modules/Cart/getters';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as AUTH_MODULE, HAS_SESSION, REFERRAL_PARTNER, USER } from '@store/modules/Auth';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { cancelRoute } from '@settings';
import { breakpoints, modalName } from '@enums';
import { cartItemTypes } from '@enums/product';
import { preparePrice } from '@util';
import { generateProductUrl } from '@util/catalog';
import { registerModuleIfNotExists } from '@util/store';

import '@images/sprites/cart.svg';
import '@images/sprites/alert.svg';
import './Cart.css';

const itemTypes = Object.values(cartItemTypes);
const itemAnimationDelayDelta = 100;
let counter = 0;

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
        VCartHeader,

        Price,

        CartProductCard,
        CartMasterClassCard,
        CatalogProductCard,
        CartBundleProductCard,
    },

    data() {
        return {
            activeTab: 0,
            inputPromocode: null,
        };
    },

    computed: {
        ...mapState(CART_MODULE, [FEATURED_PRODUCTS, CART_DATA]),
        ...mapGetters(CART_MODULE, [
            CART_ITEMS_COUNT,
            CART_TYPES,
            IS_PRODUCT,
            IS_MASTER_CLASS,
            PROMO_CODE,
            DELIVERY_INFO,
        ]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: state => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        sliderOptions() {
            return sliderOptions;
        },

        activeTabItem() {
            return this.cartTypes[this.activeTab];
        },
    },

    watch: {
        [HAS_SESSION](value) {
            if (!value) this.$router.replace(cancelRoute.path);
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CART_MODULE, [
            FETCH_CART_DATA,
            FETCH_FEATURED_PRODUCTS,
            DELETE_CART_ITEM,
            ADD_CART_ITEM,
            DELETE_ALL_ITEMS,
            ADD_PROMOCODE,
            DELETE_PROMOCODE,
            DELETE_CART_BUNDLE,
        ]),
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

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: modalName.general.QUICK_VIEW, open: true, state: { code } });
        },

        onClearCart() {
            this[DELETE_ALL_ITEMS]();
        },

        onAddCartItem(offerId, storeId, count) {
            this[ADD_CART_ITEM]({ offerId, storeId, count });
        },

        onDeleteCartItem(offerId, storeId) {
            this[DELETE_CART_ITEM]({ offerId, storeId });
        },

        prepareBonus(value) {
            return preparePrice(value);
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

        onDeleteBundle(bundleId) {
            this[DELETE_CART_BUNDLE](bundleId);
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
