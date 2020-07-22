<template>
    <section class="section order-details-view">
        <div class="container container--tablet-lg">
            <v-link class="order-details-view__back-link" :to="backUrl">
                <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад ко всем
                заказам
            </v-link>
            <h2 class="order-details-view__hl">{{ $t('profile.format.order', { id: order.number }) }}</h2>

            <div class="order-details-view__details">
                <div class="order-details-view__details-info">
                    <info-row class="order-details-view__details-row" name="Сумма">
                        <price class="text-medium" v-bind="order.price" />
                    </info-row>

                    <info-row v-if="order.delivery_price" class="order-details-view__details-row" name="Доставка">
                        <price class="text-medium" v-bind="order.delivery_price" />
                    </info-row>

                    <info-row
                        class="order-details-view__details-row"
                        :class="orderStatusClass"
                        name="Статус заказа"
                        :value="orderStatus"
                    />

                    <info-row
                        v-if="deliveryMethod"
                        class="order-details-view__details-row"
                        name="Способ доставки"
                        :value="deliveryMethod"
                    />

                    <info-row
                        class="order-details-view__details-row"
                        name="Дата заказа"
                        :value="formatDate(order.created_at)"
                    />

                    <info-row
                        v-if="deliveryDate"
                        class="order-details-view__details-row"
                        name="Дата доставки"
                        :value="deliveryDate"
                    />

                    <template v-if="deliveryPoint && deliveryMethodId === deliveryMethods.PICKUP">
                        <br />
                        <info-row
                            class="order-details-view__details-row"
                            name="Наименование ПВЗ"
                            :value="deliveryPoint.name"
                        />
                        <info-row class="order-details-view__details-row" name="Телефон" :value="deliveryPoint.phone" />
                        <info-row
                            v-if="deliveryPoint.schedule"
                            class="order-details-view__details-row"
                            name="Время работы"
                        >
                            <div v-for="(schedule, index) in deliveryPoint.schedule" :key="schedule.id">
                                {{ schedule.title }}
                                {{ schedule.time
                                }}<template v-if="index !== deliveryPoint.schedule.length - 1">,&nbsp;</template>
                            </div>
                        </info-row>
                    </template>

                    <info-row
                        v-if="deliveryAddress"
                        class="order-details-view__details-row"
                        name="Адрес доставки"
                        :value="deliveryAddress"
                    />
                </div>
                <div class="order-details-view__details-controls">
                    <template v-if="canPay">
                        <v-button
                            class="order-details-view__details-controls-btn"
                            v-for="payment in order.payments"
                            :key="payment.id"
                            @click="onContinuePayment(order.id, payment.id)"
                            :disabled="isDisabled"
                        >
                            Оплатить заказ
                        </v-button>
                    </template>

                    <v-button
                        class="btn--outline order-details-view__details-controls-btn"
                        @click.stop="onRepeatOrder(order.id)"
                        :disabled="isDisabled"
                        >Повторить заказ</v-button
                    >
                    <!-- <v-link class="order-details-view__details-controls-link">Оформить возврат</v-link> -->
                </div>
            </div>
        </div>

        <!-- <info-panel class="order-details-view__panel" header="Корзина">
            <div class="container container--tablet-lg order-details-view__container">
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
        </info-panel> -->

        <info-panel
            class="order-details-view__panel"
            v-for="delivery in deliveries"
            :key="delivery.number"
            :header="`Доставка №${delivery.number}`"
        >
            <div class="container container--tablet-lg">
                <template v-if="deliveries.length > 1">
                    <info-row
                        class="order-details-view__panel-row"
                        name="Способ доставки"
                        :value="formatDeliveryMethod(delivery.delivery_method)"
                    />
                    <info-row
                        class="order-details-view__panel-row"
                        name="Дата доставки"
                        :value="formatDate(delivery.delivery_at)"
                    />
                    <info-row
                        class="order-details-view__panel-row"
                        name="Статус доставки"
                        :class="getDeliveryStatusClass(delivery.status)"
                        :value="formatDeliveryStatus(delivery.status)"
                    />

                    <template v-if="delivery.point && delivery.delivery_method === deliveryMethods.PICKUP">
                        <br />
                        <info-row
                            class="order-details-view__panel-row"
                            name="Наименование ПВЗ"
                            :value="delivery.point.name"
                        />
                        <info-row class="order-details-view__panel-row" name="Телефон" :value="delivery.point.phone" />
                        <info-row
                            v-if="delivery.point.schedule"
                            class="order-details-view__panel-row"
                            name="Время работы"
                        >
                            <div v-for="(schedule, index) in delivery.point.schedule" :key="schedule.id">
                                {{ schedule.title }}
                                {{ schedule.time
                                }}<template v-if="index !== delivery.point.schedule.length - 1">,&nbsp;</template>
                            </div>
                        </info-row>
                    </template>

                    <info-row
                        class="order-details-view__panel-row"
                        name="Адрес доставки"
                        :value="formatAddress(delivery)"
                    />
                </template>

                <info-row
                    v-if="!!delivery.package_count"
                    class="order-details-view__panel-row"
                    name="Количество коробок"
                    :value="formatPackageCount(delivery.package_count)"
                />

                <ul class="order-details-view__panel-list">
                    <package-product-card
                        class="order-details-view__panel-item"
                        v-for="product in delivery.products"
                        :key="product.id"
                        :name="product.name"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.cost"
                        :count="product.qty"
                    />
                </ul>
            </div>
        </info-panel>

        <!-- <info-panel class="order-details-view__panel" header="Билеты">
            <div class="container container--tablet-lg">
                <ul class="order-details-view__panel-list">
                    <order-masterclass-card
                        class="order-details-view__panel-item"
                        v-for="{ p: mc, count } in masterClasses"
                        type="masterclass"
                        :key="mc.id"
                        :name="mc.name"
                        :image="mc.image"
                        :price="mc.price"
                        :old-price="mc.oldPrice"
                        :date="mc.dateTime"
                        :author="mc.author"
                        :count="count"
                        :href="mc.url"
                        :is-small="isTablet"
                    >
                        <source :data-srcset="mc.desktopImg.webp" type="image/webp" />
                        <source :data-srcset="mc.desktopImg.orig" />
                        <img class="blur-up lazyload v-picture__img" :data-src="mc.defaultImg" alt="" />
                    </order-masterclass-card>
                </ul>
            </div>
        </info-panel> -->
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';

import Price from '@components/Price/Price.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';

import PackageProductCard from '@components/PackageProductCard/PackageProductCard.vue';
import OrderMasterclassCard from '@components/profile/OrderMasterclassCard/OrderMasterclassCard.vue';

import { $store, $progress, $logger } from '@services';
import { mapActions, mapState } from 'vuex';

import { LOCALE } from '@store';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { UPDATE_BREADCRUMB } from '@store/modules/Profile/actions';

import { NAME as ORDERS_MODULE, ORDER_DETAILS, ORDER, DELIVERIES } from '@store/modules/Profile/modules/Orders';
import {
    FETCH_ORDER_DETAILS,
    SET_LOAD_PATH,
    GET_ORDER_PAYMENT_LINK,
    REPEAT_ORDER,
} from '@store/modules/Profile/modules/Orders/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { FETCH_CART_DATA } from '@store/modules/Cart/actions';

import { toAddressString } from '@util/address';
import { getOrderStatusColorClass, getDeliveryStatusColorClass } from '@util/order';
import { orderPaymentStatus, orderStatus, deliveryStatus } from '@enums/order';
import { orderDateLocaleOptions } from '@settings/profile';
import { receiveMethods } from '@enums/checkout';
import '@images/sprites/arrow-small.svg';
import './OrderDetails.css';

const ORDERS_MODULE_PATH = `${PROFILE_MODULE}/${ORDERS_MODULE}`;

function updateBreadcrumbs(vm, name, params, number) {
    vm[UPDATE_BREADCRUMB]([
        { name: vm.$t('profile.routes.Orders'), to: { name: 'Orders' } },
        { name: vm.$t('profile.format.order', { id: number }), to: { name, params } },
    ]);
}

export default {
    name: 'order-details',

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,

        Price,
        InfoPanel,
        InfoRow,

        PackageProductCard,
        OrderMasterclassCard,
    },

    data() {
        return {
            isDisabled: false,
            masterClasses: [
                {
                    id: 1781,
                    type: 'masterclass',
                    count: 1,
                    p: {
                        id: 1632,
                        name: 'Лакшери воркшоп про шампуни',
                        ticketTypeName: 'VIP',
                        speakers: [
                            {
                                id: 20,
                                firstName: 'Болеслав',
                                middleName: 'Андреевич',
                                lastName: 'Ковалёв',
                                phone: '+78783722504',
                                email: 'evgenij.soloveva@semenova.ru',
                                profession: 'Штурман',
                                avatar: { id: 10725, sourceExt: 'jpg' },
                                instagram: 'https://www.instagram.com/evgenij.soloveva',
                                facebook: null,
                                linkedin: null,
                            },
                            {
                                id: 21,
                                firstName: 'Святослав',
                                middleName: 'Львович',
                                lastName: 'Зыков',
                                phone: '+77658644460',
                                email: 'wsavina@rambler.ru',
                                profession: 'Штурман',
                                avatar: { id: 10726, sourceExt: 'jpg' },
                                instagram: 'https://www.instagram.com/wsavina',
                                facebook: null,
                                linkedin: null,
                            },
                            {
                                id: 24,
                                firstName: 'Даниил',
                                middleName: 'Максимович',
                                lastName: 'Юдин',
                                phone: '+74889544611',
                                email: 'maria48@inbox.ru',
                                profession: 'Бестиарий (гладиатор)',
                                avatar: { id: 10729, sourceExt: 'jpg' },
                                instagram: 'https://www.instagram.com/maria48',
                                facebook: null,
                                linkedin: null,
                            },
                        ],
                        code: 'laksheri_vorkshop_pro_shampuni_2',
                        image: { id: 10730, sourceExt: 'jpg' },
                        price: { value: 14829, currency: 'RUB' },
                        oldPrice: { value: 15057, currency: 'RUB' },
                        bonus: 0,
                        nearestDate: '2020-07-23',
                        nearestTimeFrom: '12:00:00',
                        nearestPlaceName: 'Сухонский двор',
                        qty: 14,
                        qtyOccupied: 9,
                        active: true,
                        url: '/masterclasses/laksheri_vorkshop_pro_shampuni_2',
                        author: 'Болеслав Ковалёв, Штурман',
                        dateTime: '23 июля, 12:00',
                        desktopImg: {
                            webp: 'http://local.ibt-mas.greensight.ru:8080/files/compressed/10730/144/96/webp',
                            orig: 'http://local.ibt-mas.greensight.ru:8080/files/compressed/10730/144/96/orig',
                        },
                        defaultImg: 'http://local.ibt-mas.greensight.ru:8080/files/compressed/10730/144/96/orig',
                    },
                },
                {
                    id: 1821,
                    type: 'masterclass',
                    count: 1,
                    p: {
                        id: 1672,
                        name: 'Бьюти лекция о стрижке',
                        ticketTypeName: 'Pro',
                        speakers: [
                            {
                                id: 20,
                                firstName: 'Болеслав',
                                middleName: 'Андреевич',
                                lastName: 'Ковалёв',
                                phone: '+78783722504',
                                email: 'evgenij.soloveva@semenova.ru',
                                profession: 'Штурман',
                                avatar: { id: 10725, sourceExt: 'jpg' },
                                instagram: 'https://www.instagram.com/evgenij.soloveva',
                                facebook: null,
                                linkedin: null,
                            },
                            {
                                id: 21,
                                firstName: 'Святослав',
                                middleName: 'Львович',
                                lastName: 'Зыков',
                                phone: '+77658644460',
                                email: 'wsavina@rambler.ru',
                                profession: 'Штурман',
                                avatar: { id: 10726, sourceExt: 'jpg' },
                                instagram: 'https://www.instagram.com/wsavina',
                                facebook: null,
                                linkedin: null,
                            },
                            {
                                id: 23,
                                firstName: 'Радислав',
                                middleName: 'Романович',
                                lastName: 'Миронов',
                                phone: '+70115872600',
                                email: 'cpetrova@odincova.ru',
                                profession: 'Фотограф',
                                avatar: { id: 10728, sourceExt: 'jpg' },
                                instagram: 'https://www.instagram.com/cpetrova',
                                facebook: null,
                                linkedin: null,
                            },
                        ],
                        code: 'byuti_lekciya_o_strizhke_1',
                        image: { id: 10752, sourceExt: 'jpg' },
                        price: { value: 16894, currency: 'RUB' },
                        oldPrice: { value: 17122, currency: 'RUB' },
                        bonus: 0,
                        nearestDate: '2020-07-20',
                        nearestTimeFrom: '16:00:00',
                        nearestPlaceName: 'Подвал достоевского',
                        qty: 17,
                        qtyOccupied: 17,
                        active: true,
                        url: '/masterclasses/byuti_lekciya_o_strizhke_1',
                        author: 'Болеслав Ковалёв, Штурман',
                        dateTime: '20 июля, 16:00',
                        desktopImg: {
                            webp: 'http://local.ibt-mas.greensight.ru:8080/files/compressed/10752/144/96/webp',
                            orig: 'http://local.ibt-mas.greensight.ru:8080/files/compressed/10752/144/96/orig',
                        },
                        defaultImg: 'http://local.ibt-mas.greensight.ru:8080/files/compressed/10752/144/96/orig',
                    },
                },
                {
                    id: 1822,
                    type: 'masterclass',
                    count: 1,
                    p: {
                        id: 1674,
                        name: 'Бьюти лекция о стрижке',
                        ticketTypeName: 'VIP+',
                        speakers: [
                            {
                                id: 20,
                                firstName: 'Болеслав',
                                middleName: 'Андреевич',
                                lastName: 'Ковалёв',
                                phone: '+78783722504',
                                email: 'evgenij.soloveva@semenova.ru',
                                profession: 'Штурман',
                                avatar: { id: 10725, sourceExt: 'jpg' },
                                instagram: 'https://www.instagram.com/evgenij.soloveva',
                                facebook: null,
                                linkedin: null,
                            },
                            {
                                id: 21,
                                firstName: 'Святослав',
                                middleName: 'Львович',
                                lastName: 'Зыков',
                                phone: '+77658644460',
                                email: 'wsavina@rambler.ru',
                                profession: 'Штурман',
                                avatar: { id: 10726, sourceExt: 'jpg' },
                                instagram: 'https://www.instagram.com/wsavina',
                                facebook: null,
                                linkedin: null,
                            },
                            {
                                id: 23,
                                firstName: 'Радислав',
                                middleName: 'Романович',
                                lastName: 'Миронов',
                                phone: '+70115872600',
                                email: 'cpetrova@odincova.ru',
                                profession: 'Фотограф',
                                avatar: { id: 10728, sourceExt: 'jpg' },
                                instagram: 'https://www.instagram.com/cpetrova',
                                facebook: null,
                                linkedin: null,
                            },
                        ],
                        code: 'byuti_lekciya_o_strizhke_1',
                        image: { id: 10752, sourceExt: 'jpg' },
                        price: { value: 34016, currency: 'RUB' },
                        oldPrice: { value: 34244, currency: 'RUB' },
                        bonus: 0,
                        nearestDate: '2020-07-20',
                        nearestTimeFrom: '16:00:00',
                        nearestPlaceName: 'Подвал достоевского',
                        qty: 10,
                        qtyOccupied: 2,
                        active: true,
                        url: '/masterclasses/byuti_lekciya_o_strizhke_1',
                        author: 'Болеслав Ковалёв, Штурман',
                        dateTime: '20 июля, 16:00',
                        desktopImg: {
                            webp: 'http://local.ibt-mas.greensight.ru:8080/files/compressed/10752/144/96/webp',
                            orig: 'http://local.ibt-mas.greensight.ru:8080/files/compressed/10752/144/96/orig',
                        },
                        defaultImg: 'http://local.ibt-mas.greensight.ru:8080/files/compressed/10752/144/96/orig',
                    },
                },
            ],
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(ORDERS_MODULE_PATH, {
            [ORDER]: state => state[ORDER_DETAILS][ORDER] || {},
            [DELIVERIES]: state => state[ORDER_DETAILS][DELIVERIES] || [],
        }),

        canPay() {
            const { payment_status = 3, payments = [] } = this[ORDER];
            return payment_status === orderPaymentStatus.NOT_PAID && payments.length !== 0;
        },

        orderStatusClass() {
            return getOrderStatusColorClass(this.order.status, this.order.canceled);
        },

        deliveryMethod() {
            const deliveries = this[DELIVERIES];
            if (deliveries.length === 1) {
                const { delivery_method } = deliveries[0];
                return this.formatDeliveryMethod(delivery_method);
            }
        },

        deliveryMethodId() {
            const deliveries = this[DELIVERIES];
            if (deliveries.length === 1) {
                const { delivery_method } = deliveries[0];
                return delivery_method;
            }
        },

        deliveryDate() {
            const deliveries = this[DELIVERIES];
            if (deliveries.length === 1) {
                const { delivery_at } = deliveries[0];
                return this.formatDate(delivery_at);
            }
        },

        deliveryAddress() {
            const deliveries = this[DELIVERIES];
            if (deliveries.length === 1) return this.formatAddress(deliveries[0]);
        },

        deliveryPoint() {
            const deliveries = this[DELIVERIES];
            if (deliveries.length === 1) return deliveries[0].point;
        },

        orderStatus() {
            const { status } = this[ORDER];
            return this.$t(`orderStatus.${status}`);
        },

        backUrl() {
            return { name: 'Orders' };
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
        ...mapActions(ORDERS_MODULE_PATH, [FETCH_ORDER_DETAILS, SET_LOAD_PATH, GET_ORDER_PAYMENT_LINK, REPEAT_ORDER]),
        ...mapActions(CART_MODULE, [FETCH_CART_DATA]),

        async onContinuePayment(orderId) {
            const backUrl = `${document.location.origin}/thank-you`;
            const url = await this[GET_ORDER_PAYMENT_LINK]({ id: orderId, backUrl });
            document.location.href = url;
        },

        async onRepeatOrder(orderId) {
            try {
                this.isDisabled = true;
                await this[REPEAT_ORDER](orderId);
                await this[FETCH_CART_DATA]();
                this.$router.push({ path: '/cart' });
                this.isDisabled = false;
            } catch (error) {
                this.isDisabled = false;
            }
        },

        getDeliveryStatusClass(status) {
            return getDeliveryStatusColorClass(status);
        },

        formatDeliveryStatus(status) {
            return this.$t(`deliveryStatus.${status}`);
        },

        formatAddress(delivery) {
            const { delivery_address, point } = delivery;
            return (delivery_address && toAddressString(delivery_address)) || point.address.address_string;
        },

        formatDate(date) {
            if (typeof date !== 'string') return;
            const obj = new Date(date.split(' ')[0]);
            return obj.toLocaleDateString(this[LOCALE], orderDateLocaleOptions);
        },

        formatPackageCount(count) {
            return this.$t('profile.format.packageCount', { n: count });
        },

        formatDeliveryMethod(deliveryMethodId) {
            return this.$t(`deliveryMethod.${deliveryMethodId}`);
        },
    },

    beforeRouteEnter(to, from, next) {
        const { fullPath, name, params } = to;
        const { loadPath, orderDetails } = $store.state[PROFILE_MODULE][ORDERS_MODULE];

        if (loadPath === fullPath) next(vm => updateBreadcrumbs(vm, name, params, orderDetails.order.number));
        else {
            $progress.start();
            $store
                .dispatch(`${ORDERS_MODULE_PATH}/${FETCH_ORDER_DETAILS}`, params.orderId)
                .then(({ number }) => {
                    $store.dispatch(`${ORDERS_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                        updateBreadcrumbs(vm, name, params, number);
                    });
                })
                .catch(error =>
                    next(vm => {
                        $progress.fail();
                        updateBreadcrumbs(vm, name, params);
                    })
                );
        }
    },

    beforeRouteUpdate(to, from, next) {
        const { name, params } = to;

        this.$progress.start();
        this[FETCH_ORDER_DETAILS](params.orderId)
            .then(({ number }) => {
                this.$progress.finish();
                updateBreadcrumbs(this, name, params, number);
            })
            .catch(error => {
                this.$progress.fail();
                updateBreadcrumbs(this, name, params);
            });
        next();
    },

    beforeRouteLeave(to, from, next) {
        this[UPDATE_BREADCRUMB]([]);
        next();
    },

    beforeMount() {
        this.deliveryMethods = receiveMethods;
    },
};
</script>
