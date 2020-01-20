<template>
    <section class="section order-details-view">
        <div class="container container--tablet-lg">
            <v-link class="order-details-view__back-link" :to="backUrl">
                <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад ко всем
                заказам
            </v-link>
            <h2 class="order-details-view__hl">{{ $t('profile.format.order', { id: orderId }) }}</h2>

            <div class="order-details-view__details">
                <div class="order-details-view__details-info">
                    <info-row class="order-details-view__details-row" name="Сумма" value="15 780 ₽" />
                    <info-row class="order-details-view__details-row" name="Статус заказа" value="Ожидается оплата" />
                    <info-row class="order-details-view__details-row" name="Дата заказа" value="18 августа 2019" />
                    <info-row class="order-details-view__details-row" name="Дата доставки" value="20 августа 2019" />
                    <info-row
                        class="order-details-view__details-row"
                        name="Адрес доставки"
                        value="Москва, г. Зеленоград, Центральный проспект, к. 305"
                    />
                </div>
                <div class="order-details-view__details-controls">
                    <v-button class="order-details-view__details-controls-btn">Оплатить заказ</v-button>
                    <v-button class="btn--outline order-details-view__details-controls-btn">Повторить заказ</v-button>
                    <v-link class="order-details-view__details-controls-link">Оформить возврат</v-link>
                </div>
            </div>
        </div>

        <info-panel class="order-details-view__panel" header="Корзина">
            <div class="container container--tablet-lg">
                <ul class="order-details-view__panel-list">
                    <package-product-card
                        class="order-details-view__panel-item"
                        v-for="item in cartItems"
                        :key="item.id"
                        :name="item.name"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :count="item.count"
                    />
                </ul>
            </div>
        </info-panel>

        <info-panel
            class="order-details-view__panel"
            v-for="delivery in deliveries"
            :key="delivery.id"
            :header="`Доставка №${delivery.id}`"
        >
            <div class="container container--tablet-lg">
                <info-row class="order-details-view__panel-row" name="Дата доставки" :value="delivery.date" />
                <info-row class="order-details-view__panel-row" name="Адрес доставки" :value="delivery.address" />
                <ul class="order-details-view__panel-list">
                    <package-product-card
                        class="order-details-view__panel-item"
                        v-for="item in delivery.items"
                        :key="item.id"
                        :name="item.name"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :count="item.count"
                    />
                </ul>
            </div>
        </info-panel>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VInput from '../../../components/controls/VInput/VInput.vue';

import InfoRow from '../../../components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';

import PackageProductCard from '../../../components/PackageProductCard/PackageProductCard.vue';

import { mapActions, mapState } from 'vuex';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';
import { UPDATE_BREADCRUMB } from '../../../store/modules/Profile/actions';

import mockProduct1 from '../../../assets/images/mock/orderPackageProduct1.png';
import mockProduct2 from '../../../assets/images/mock/orderPackageProduct2.png';
import mockProduct3 from '../../../assets/images/mock/orderPackageProduct3.png';
import mockProduct4 from '../../../assets/images/mock/orderPackageProduct4.png';
import '../../../assets/images/sprites/arrow-small.svg';
import './OrderDetails.css';

export default {
    name: 'order-details',

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,

        InfoPanel,
        InfoRow,

        PackageProductCard,
    },

    data() {
        return {
            cartItems: [
                {
                    id: 1,
                    name: "Губная помада L'Oreal Paris Color Riche by J'Lo's, 103, розовый",
                    description: 'Цвет: 27, Bruised Plum',
                    count: 1,
                    image: mockProduct1,

                    price: {
                        value: 3900,
                        currency: 'RUB',
                    },

                    oldPrice: {
                        value: 4600,
                        currency: 'RUB',
                    },
                },
                {
                    id: 2,
                    name: 'Matrix Спрей для укладки волос Total results Wonder boost, 250 мл',
                    description: null,
                    count: 2,
                    image: mockProduct2,

                    price: {
                        value: 1168,
                        currency: 'RUB',
                    },
                },
                {
                    id: 3,
                    name: 'Wella Professionals Koleston Perfect Me+ Deep Browns Краска для волос, 60 мл',
                    description: null,
                    count: 1,
                    image: mockProduct3,

                    price: {
                        value: 1899,
                        currency: 'RUB',
                    },
                },
                {
                    id: 4,
                    name: 'Matrix кондиционер Total Results Moisture Me Rich, 300 мл',
                    description: null,
                    count: 1,
                    image: mockProduct4,

                    price: {
                        value: 599,
                        currency: 'RUB',
                    },
                },
            ],
            deliveries: [
                {
                    id: '124589524-1',
                    date: '20 августа 2019',
                    address: 'Москва, г. Зеленоград, Центральный проспект, к. 305',
                    items: [
                        {
                            id: 1,
                            name: "Губная помада L'Oreal Paris Color Riche by J'Lo's, 103, розовый",
                            description: 'Цвет: 27, Bruised Plum',
                            count: 1,
                            image: mockProduct1,

                            price: {
                                value: 3900,
                                currency: 'RUB',
                            },

                            oldPrice: {
                                value: 4600,
                                currency: 'RUB',
                            },
                        },
                        {
                            id: 2,
                            name: 'Matrix Спрей для укладки волос Total results Wonder boost, 250 мл',
                            description: null,
                            count: 2,
                            image: mockProduct2,

                            price: {
                                value: 1168,
                                currency: 'RUB',
                            },
                        },
                    ],
                },
                {
                    id: '124589524-2',
                    date: '22 августа 2019',
                    address: 'Москва, г. Зеленоград, Центральный проспект, к. 305',
                    items: [
                        {
                            id: 3,
                            name: 'Wella Professionals Koleston Perfect Me+ Deep Browns Краска для волос, 60 мл',
                            description: null,
                            count: 1,
                            image: mockProduct3,

                            price: {
                                value: 1899,
                                currency: 'RUB',
                            },
                        },
                        {
                            id: 4,
                            name: 'Matrix кондиционер Total Results Moisture Me Rich, 300 мл',
                            description: null,
                            count: 1,
                            image: mockProduct4,

                            price: {
                                value: 599,
                                currency: 'RUB',
                            },
                        },
                    ],
                },
            ],
        };
    },

    computed: {
        ...mapState('route', {
            orderId: state => state.params && state.params.orderId,
        }),

        backUrl() {
            return { name: 'Orders' };
        },
    },

    methods: {
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
    },

    beforeRouteEnter(to, from, next) {
        const { name, params } = to;
        next(vm => {
            vm[UPDATE_BREADCRUMB]([
                { name: vm.$t('profile.routes.Orders'), to: { name: 'Orders' } },
                { name: vm.$t('profile.format.order', { id: params.orderId }), to: { name, params } },
            ]);
        });
    },

    beforeRouteUpdate(to, from, next) {
        const { name, params } = to;

        this[UPDATE_BREADCRUMB]([
            { name: vm.$t('profile.routes.Orders'), to: { name: 'Orders' } },
            { name: vm.$t('profile.format.order', { id: params.orderId }), to: { name, params } },
        ]);
        next();
    },

    beforeRouteLeave(to, from, next) {
        this[UPDATE_BREADCRUMB]([]);
        next();
    },
};
</script>
