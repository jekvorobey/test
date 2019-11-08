<template>
    <section class="section cart-view">
        <div class="container">
            <h1 class="cart-view__section-hl">Моя корзина</h1>
        </div>
        <section class="section cart-view__main">
            <div class="container cart-view__main-container">
                <v-tabs class="cart-view__main-tabs" :items="tabItems" key-field="id">
                    <template v-slot:header="{ item }">
                        {{ item.title }}&nbsp;&nbsp;<span class="text-grey">{{ item.products.length }}</span>
                    </template>
                    <template v-slot:panel="{ item }">
                        <div class="cart-view__main-products" v-if="item.type === 'product'">
                            <div v-if="item.alerts && item.alerts.length > 0" class="cart-view__main-products-alert">
                                <v-svg name="alert" width="24" height="24" />
                                <div class="cart-view__main-products-alert-text">
                                    <div v-for="alert in item.alerts" :key="alert.id">
                                        {{ alert.title }}
                                    </div>
                                </div>
                            </div>
                            <ul class="cart-view__main-products-list">
                                <cart-product-card
                                    class="cart-view__main-products-list-item"
                                    v-for="product in item.products"
                                    :key="product.id"
                                    :product-id="product.id"
                                    :name="product.name"
                                    :image="product.image"
                                    :price="product.price"
                                    :old-price="product.oldPrice"
                                    href="/catalog"
                                />
                            </ul>
                        </div>
                    </template>
                </v-tabs>
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
                        :name="product.name"
                        :href="product.href"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :tags="product.tags"
                        :rating="product.rating"
                    />
                </v-slider>
            </div>
        </section>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VInput from '../../components/controls/VInput/VInput.vue';
import VTabs from '../../components/controls/VTabs/VTabs.vue';
import VSticky from '../../components/controls/VSticky/VSticky.vue';
import VSlider from '../../components/controls/VSlider/VSlider.vue';

import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';
import CartProductCard from '../../components/CartProductCard/CartProductCard.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as CART_MODULE, CART_ITEMS, FEATURED_PRODUCTS } from '../../store/modules/Cart';
import { FETCH_FEATURED_PRODUCTS } from '../../store/modules/Cart/actions';

import { breakpoints } from '../../assets/scripts/constants';
import '../../assets/images/sprites/alert.svg';
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
        VInput,
        VTabs,
        VSticky,
        VSlider,

        CartProductCard,
        CatalogProductCard,
    },

    computed: {
        ...mapState(CART_MODULE, [CART_ITEMS, FEATURED_PRODUCTS]),

        sliderOptions() {
            return sliderOptions;
        },

        tabItems() {
            return [
                {
                    id: 1,
                    title: 'Продукты',
                    type: 'product',
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
                    products: this[CART_ITEMS],
                },
                {
                    id: 2,
                    title: 'Мастер-классы',
                    type: 'masterclasse',
                    products: this[CART_ITEMS],
                },
            ];
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [FETCH_FEATURED_PRODUCTS]),
    },

    mounted() {
        this[FETCH_FEATURED_PRODUCTS]();
    },
};
</script>
