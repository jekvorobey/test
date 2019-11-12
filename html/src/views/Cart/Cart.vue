<template>
    <section class="section cart-view">
        <div class="container">
            <h1 class="cart-view__section-hl">Моя корзина</h1>
        </div>
        <section class="section cart-view__main">
            <div v-if="cartItemsCount > 0" class="container cart-view__main-container">
                <div class="cart-view__main-tabs">
                    <v-tabs :items="tabItems" key-field="id">
                        <template v-slot:header="{ item }">
                            {{ item.title }}&nbsp;&nbsp;<span class="text-grey">{{ item.products.length }}</span>
                        </template>
                        <template v-slot:panel="{ item }">
                            <div class="cart-view__main-products" v-if="IS_PRODUCT(item)">
                                <div
                                    v-if="item.alerts && item.alerts.length > 0"
                                    class="cart-view__main-products-alert"
                                >
                                    <v-svg name="alert" width="24" height="24" />
                                    <div class="cart-view__main-products-alert-text">
                                        <div v-for="alert in item.alerts" :key="alert.id">
                                            {{ alert.title }}
                                        </div>
                                    </div>
                                </div>
                                <transition-group
                                    class="cart-view__main-products-list"
                                    tag="ul"
                                    name="cart-item"
                                    @before-enter="onBeforeEnterItems"
                                    @enter="onEnterItems"
                                    @after-enter="onAfterEnterItems"
                                    @leave="onLeaveItems"
                                >
                                    <cart-product-card
                                        class="cart-view__main-products-list-item"
                                        v-for="({ item: product, count }, index) in item.products"
                                        :data-index="index"
                                        :key="product.id"
                                        :product-id="product.id"
                                        :type="product.type"
                                        :name="product.name"
                                        :image="product.image"
                                        :price="product.price"
                                        :old-price="product.oldPrice"
                                        :count="count"
                                        href="/catalog"
                                        @deleteItem="DELETE_CART_ITEM({ item: product })"
                                        @countChange="ADD_CART_ITEM({ item: product, count: $event.count })"
                                    />
                                </transition-group>
                            </div>
                            <div class="cart-view__main-masterclass" v-else-if="IS_MASTER_CLASS(item)">
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
                                        v-for="({ item: product, count }, index) in item.products"
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
                                        @deleteItem="DELETE_CART_ITEM({ item: product })"
                                        @countChange="ADD_CART_ITEM({ item: product, count: $event.count })"
                                        href="/catalog"
                                    />
                                </transition-group>
                            </div>
                        </template>
                    </v-tabs>
                    <v-link class="cart-view__main-clear" tag="button" @click="DELETE_CART_ITEM()">
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
                            <p class="cart-view__main-panel-line">Сумма заказа: продукты <span>6 704 ₽</span></p>
                            <p class="cart-view__main-panel-line">Скидка по промокоду <span>0 ₽</span></p>

                            <div class="cart-view__main-panel-total">
                                <p class="text-bold cart-view__main-panel-line">Итого <span>6 704 ₽</span></p>
                                <p class="text-grey text-sm cart-view__main-panel-line">
                                    Будет начислено <span>+1 488 бонусов</span>
                                </p>
                            </div>

                            <div class="cart-view__main-panel-promo">
                                <v-input class="cart-view__main-panel-promo-input" placeholder="Введите промокод" />
                                <v-button class="btn--outline cart-view__main-panel-promo-btn">
                                    Применить
                                </v-button>
                            </div>
                            <v-button class="cart-view__main-panel-submit" to="/checkout">
                                Оформить заказ
                            </v-button>
                        </div>
                    </template>
                </v-sticky>
            </div>
        </section>

        <section class="section cart-view__section cart-view__featured">
            <div class="container cart-view__featured-container">
                <h2 class="cart-view__section-hl cart-view__featured-hl">{{ $t('product.title.like') }}</h2>
                <v-slider class="cart-view__featured-slider" name="cart-featured" :options="sliderOptions">
                    <catalog-product-card
                        class="swiper-slide cart-view__featured-card"
                        v-for="product in featuredProducts"
                        :key="product.id"
                        :product-id="product.id"
                        :type="product.type"
                        :name="product.name"
                        :href="product.href"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :tags="product.tags"
                        :rating="product.rating"
                        @addItem="ADD_CART_ITEM({ item: product })"
                    />
                </v-slider>
            </div>
        </section>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VLink from '../../components/controls/VLink/VLink.vue';
import VInput from '../../components/controls/VInput/VInput.vue';

import VSticky from '../../components/controls/VSticky/VSticky.vue';
import VSlider from '../../components/controls/VSlider/VSlider.vue';

import CartMasterClassCard from '../../components/CartMasterClassCard/CartMasterClassCard.vue';
import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';
import CartProductCard from '../../components/CartProductCard/CartProductCard.vue';
import VTabs from '../../components/controls/VTabs/VTabs.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as CART_MODULE, FEATURED_PRODUCTS } from '../../store/modules/Cart';
import { FETCH_FEATURED_PRODUCTS, DELETE_CART_ITEM, ADD_CART_ITEM } from '../../store/modules/Cart/actions';
import {
    PRODUCTS,
    MASTER_CLASSES,
    IS_PRODUCT,
    IS_MASTER_CLASS,
    CART_ITEMS_COUNT,
} from '../../store/modules/Cart/getters';

import { breakpoints, cartItemTypes } from '../../assets/scripts/constants';
import '../../assets/images/sprites/alert.svg';
import './Cart.css';

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

        CartProductCard,
        CartMasterClassCard,
        CatalogProductCard,
    },

    computed: {
        ...mapState(CART_MODULE, [FEATURED_PRODUCTS]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCTS, MASTER_CLASSES, IS_PRODUCT, IS_MASTER_CLASS]),

        sliderOptions() {
            return sliderOptions;
        },

        tabItems() {
            const products = this[PRODUCTS];
            const masterClasses = this[MASTER_CLASSES];
            const tabs = [];

            if (products.length > 0)
                tabs.push({
                    id: 1,
                    title: 'Продукты',
                    type: cartItemTypes.PRODUCT,
                    alerts: [
                        {
                            id: 1,
                            title: 'Ближайшая доставка курьером 24 июня, понедельник',
                        },
                        {
                            id: 2,
                            title: 'Ближайший самовывоз из пункта выдачи с 26 июня, среда',
                        },
                    ],
                    disabled: products.length === 0,
                    products: products,
                });

            if (masterClasses.length > 0)
                tabs.push({
                    id: 2,
                    title: 'Мастер-классы',
                    type: cartItemTypes.MASTERCLASS,
                    disabled: masterClasses.length === 0,
                    products: masterClasses,
                });

            return tabs;
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [FETCH_FEATURED_PRODUCTS, DELETE_CART_ITEM, ADD_CART_ITEM]),

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

    mounted() {
        this[FETCH_FEATURED_PRODUCTS]();
    },
};
</script>
