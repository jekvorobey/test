<template>
    <section class="section order-details-view">
        <div class="container container--tablet-lg">
            <v-link class="order-details-view__back-link" :to="backUrl">
                <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад ко всем
                заказам
            </v-link>

            <h2 class="order-details-view__hl">
                {{ pageTitle }}
            </h2>

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
                        v-if="order.is_partially_cancelled && !order.is_canceled"
                        class="order-details-view__details-row"
                        :class="'status-color-error'"
                        name=" "
                        :value="partiallyCancelledStatus"
                    />

                    <info-row
                        v-if="deliveryMethod"
                        class="order-details-view__details-row"
                        name="Способ доставки"
                        :value="deliveryMethod"
                    />

                    <info-row class="order-details-view__details-row" name="Дата заказа" :value="createDate" />

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

                    <info-row
                        v-if="receiverEmail"
                        class="order-details-view__details-row"
                        name="Email"
                        :value="receiverEmail"
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
                        @click.stop="onRepeatOrder(order)"
                        :disabled="isDisabled"
                    >
                        Повторить заказ
                    </v-button>
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
            v-for="delivery in deliveryItems"
            :key="delivery.number"
            :header="`Доставка №${delivery.number}`"
        >
            <div :class="{ 'container container--tablet-lg': !isTablet }">
                <template v-if="deliveries.length > 1">
                    <info-row class="order-details-view__panel-row" name="Способ доставки" :value="delivery.method" />
                    <info-row class="order-details-view__panel-row" name="Дата доставки" :value="delivery.deliveryAt" />
                    <info-row
                        class="order-details-view__panel-row"
                        name="Статус доставки"
                        :class="delivery.statusClass"
                        :value="delivery.status"
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
                </template>

                <info-row
                    v-if="delivery.packageCount > 0"
                    class="order-details-view__panel-row"
                    name="Количество коробок"
                    :value="delivery.packageCount"
                />

                <ul class="order-details-view__panel-list">
                    <package-product-card
                        class="order-details-view__panel-item"
                        v-for="product in delivery.products"
                        :key="product.id"
                        :name="product.name"
                        :note="product.note"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.cost"
                        :count="product.qty"
                        :href="product.url"
                    />
                </ul>
            </div>
        </info-panel>

        <info-panel v-if="ticketItems && ticketItems.length > 0" class="order-details-view__panel" header="Билеты">
            <div :class="{ 'container container--tablet-lg': isTabletLg && !isTablet }">
                <ul class="order-details-view__panel-list">
                    <order-masterclass-card
                        class="order-details-view__panel-item"
                        type="masterclass"
                        v-for="item in ticketItems"
                        :key="item.id"
                        :name="item.name"
                        :note="item.note"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :date="item.dateTime"
                        :author="item.author"
                        :additions="item.additions"
                        :qty="item.qty"
                        :qty-returned="item.qtyReturned"
                        :is-complete="item.isComplete"
                        :url="item.url"
                        :download-url="item.downloadUrl"
                        :is-small="isTablet"
                    >
                        <source :data-srcset="item.desktopImg.webp" type="image/webp" />
                        <source :data-srcset="item.desktopImg.orig" />
                        <img class="blur-up lazyload v-picture__img" :data-src="item.defaultImg" alt="" />
                    </order-masterclass-card>
                </ul>
            </div>
        </info-panel>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';

import Price from '@components/Price/Price.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';

import PackageProductCard from '@components/PackageProductCard/PackageProductCard.vue';
import OrderMasterclassCard from '@components/profile/OrderMasterclassCard/OrderMasterclassCard.vue';

import { $store, $progress } from '@services';
import { mapActions, mapState } from 'vuex';

import { LOCALE } from '@store';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { UPDATE_BREADCRUMB } from '@store/modules/Profile/actions';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import {
    NAME as ORDERS_MODULE,
    ORDER_DETAILS,
    ORDER,
    DELIVERIES,
    TICKETS,
} from '@store/modules/Profile/modules/Orders';
import {
    FETCH_ORDER_DETAILS,
    SET_LOAD_PATH,
    GET_ORDER_PAYMENT_LINK,
    REPEAT_ORDER,
} from '@store/modules/Profile/modules/Orders/actions';

import { fileExtension, modalName } from '@enums';
import { receiveMethods } from '@enums/checkout';
import { orderPaymentStatus } from '@enums/order';
import { dayMonthLongDateSettings, hourMinuteTimeSettings } from '@settings';
import { orderDateLocaleOptions } from '@settings/profile';
import { toAddressString } from '@util/address';
import { generateMasterclassUrl, generateTicketDownloadUrl, generateProductUrl } from '@util/catalog';
import { generatePictureSourcePath } from '@util/file';
import { getOrderStatusColorClass, getDeliveryStatusColorClass, generateThankPageUrl } from '@util/order';
import { orderStatus as orderStatusNames } from '@enums/order';
import metaMixin from '@plugins/meta';
import '@images/sprites/arrow-small.svg';
import './OrderDetails.css';

const ORDERS_MODULE_PATH = `${PROFILE_MODULE}/${ORDERS_MODULE}`;

function updateBreadcrumbs(vm, name, params, number) {
    const { href: rootHref } = vm.$router.resolve({ name: 'Orders' });
    const { href: currentHref } = vm.$router.resolve({ name, params });

    vm[UPDATE_BREADCRUMB]([
        { name: vm.$t('profile.routes.Orders'), to: rootHref },
        { name: vm.$t('profile.format.order', { id: number }), to: currentHref },
    ]);
}

export default {
    name: 'order-details',
    mixins: [metaMixin],

    components: {
        VSvg,
        VLink,
        VButton,

        Price,
        InfoPanel,
        InfoRow,

        PackageProductCard,
        OrderMasterclassCard,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    data() {
        return {
            isDisabled: false,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(ORDERS_MODULE_PATH, {
            [ORDER]: (state) => (state[ORDER_DETAILS] && state[ORDER_DETAILS][ORDER]) || {},
            [DELIVERIES]: (state) => (state[ORDER_DETAILS] && state[ORDER_DETAILS][DELIVERIES]) || [],
            [TICKETS]: (state) => (state[ORDER_DETAILS] && state[ORDER_DETAILS][TICKETS]) || [],
        }),

        receiverEmail() {
            const order = this[ORDER] || {};
            return order.receiver_email;
        },

        deliveryItems() {
            const deliveries = this[DELIVERIES] || [];

            return deliveries.map((d) => {
                return {
                    ...d,
                    method: this.formatDeliveryMethod(d.delivery_method),
                    deliveryAt: this.formatDate(d.delivery_at),
                    statusClass: this.getDeliveryStatusClass(d.status),
                    status: this.formatDeliveryStatus(d.status),
                    address: this.formatAddress(d),
                    packageCount: this.formatPackageCount(d.package_count),
                    products: d.products && d.products.map(this.prepareProduct),
                };
            });
        },

        ticketItems() {
            const { id, payment_status } = this[ORDER] || {};
            const tickets = this[TICKETS] || [];

            return tickets.map((i) => {
                const dateObj = new Date(`${i.nearestDate} ${i.nearestTimeFrom}`);
                const date = dateObj.toLocaleString(this[LOCALE], dayMonthLongDateSettings);
                const time = dateObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                const dateTime = `${date}, ${time}`;
                const url = generateMasterclassUrl(i.code);
                const downloadUrl =
                    payment_status === orderPaymentStatus.PAID ? generateTicketDownloadUrl(id, i.basketItemId) : null;
                const note = i.ticketTypeName;

                const speaker = i.speakers && i.speakers[0];
                const author = speaker && `${speaker.firstName} ${speaker.lastName}, ${speaker.profession}`;

                const participants = i.participants || [];
                const additions = `Участники: ${participants.map((p) => `${p.firstName} ${p.lastName}`).join(', ')}`;

                const defaultImg = i.image && generatePictureSourcePath(400, 240, i.image.id);
                const desktopImg = i.image && {
                    webp: generatePictureSourcePath(400, 240, i.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(400, 240, i.image.id),
                };

                const mobileImg = i.image && {
                    webp: generatePictureSourcePath(425, 320, i.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(425, 320, i.image.id),
                };

                return { ...i, note, author, additions, url, downloadUrl, dateTime, desktopImg, mobileImg, defaultImg };
            });
        },

        canPay() {
            const { payment_status = 3, payments = [] } = this[ORDER] || {};
            return payment_status === orderPaymentStatus.NOT_PAID && payments.length !== 0;
        },

        orderStatusClass() {
            return getOrderStatusColorClass(
                this.order.status,
                this.order.is_canceled,
                this.order.is_partially_cancelled
            );
        },

        deliveryMethod() {
            const deliveries = this[DELIVERIES] || [];
            if (deliveries.length === 1) {
                const { delivery_method } = deliveries[0];
                return this.formatDeliveryMethod(delivery_method);
            }
            return null;
        },

        deliveryMethodId() {
            const deliveries = this[DELIVERIES] || [];
            if (deliveries.length === 1) {
                const { delivery_method } = deliveries[0];
                return delivery_method;
            }
            return null;
        },

        deliveryDate() {
            const deliveries = this[DELIVERIES] || [];
            if (deliveries.length === 1) {
                const { delivery_at } = deliveries[0];
                return this.formatDate(delivery_at);
            }
            return null;
        },

        deliveryAddress() {
            const deliveries = this[DELIVERIES] || [];
            return deliveries[0] && this.formatAddress(deliveries[0]);
        },

        deliveryPoint() {
            const deliveries = this[DELIVERIES] || [];
            if (deliveries.length === 1) return deliveries[0].point;
            return null;
        },

        createDate() {
            const { created_at } = this[ORDER] || {};
            return this.formatDate(created_at);
        },

        orderStatus() {
            const { status } = this[ORDER] || {};

            // Вывод статуса Отменён
            if (this[ORDER]['is_canceled']) {
                return this.$t(`orderStatus.${orderStatusNames.CANCELED}`);
            }
            return this.$t(`orderStatus.${status}`);
        },

        pageTitle() {
            const { number } = this[ORDER] || {};
            return this.$t('profile.format.order', { id: number || '000000' });
        },

        backUrl() {
            return { name: 'Orders' };
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        partiallyCancelledStatus() {
            return this.$t(`orderStatus.${orderStatusNames.PARTIALLY_CANCELED}`);
        },
    },

    methods: {
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
        ...mapActions(ORDERS_MODULE_PATH, [FETCH_ORDER_DETAILS, SET_LOAD_PATH, GET_ORDER_PAYMENT_LINK, REPEAT_ORDER]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        async onContinuePayment(orderId) {
            try {
                const backUrl = generateThankPageUrl(orderId);
                const { url } = await this[GET_ORDER_PAYMENT_LINK]({ orderId, backUrl });

                // заменяем текущий роут на роут thank-you, чтобы при переходе по стрелке мы вернулись на страницу
                // благодарности за заказ
                window.history.replaceState(null, '', backUrl);
                document.location.href = url;
            } catch (error) {
                alert('Ошибка при переходе на оплату');
            }
        },

        async onRepeatOrder(order) {
            const { id, can_repeat, has_bad_offers } = order;

            if (!can_repeat)
                return this[CHANGE_MODAL_STATE]({
                    name: modalName.general.NOTIFICATION,
                    open: true,
                    state: {
                        title: 'Уведомление',
                        message: 'Невозможно повторить заказ',
                    },
                });

            if (has_bad_offers)
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.NOTIFICATION,
                    open: true,
                    state: {
                        title: 'Уведомление',
                        message: 'Невозможно оформить заказ на некоторые выбранные товары',
                    },
                });

            try {
                this.isDisabled = true;
                await this[REPEAT_ORDER](id);
                await this.$router.push({ name: 'Cart' });
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

        prepareProduct(p) {
            const { category_code, code, variantGroup } = p;
            let values = null;

            if (variantGroup) {
                const { characteristics = [], combinations = [] } = variantGroup;
                const { props } = combinations.find((c) => c.code === code);
                const keys = Object.keys(props);
                values = keys.map((k) => {
                    const { options, name } = characteristics.find((c) => c.code === k);
                    const option = options.find((o) => o.value === props[k]);
                    return `${name}: ${option.name}`;
                });
            }

            const note = values && values.join(', ');
            return { ...p, note, url: generateProductUrl(category_code, code) };
        },
    },

    beforeRouteEnter(to, from, next) {
        function proceed() {
            if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][ORDERS_MODULE]) {
                const { fullPath, name, params } = to;
                const { loadPath, orderDetails } = $store.state[PROFILE_MODULE][ORDERS_MODULE];

                if (loadPath === fullPath) next((vm) => updateBreadcrumbs(vm, name, params, orderDetails.order.number));
                else {
                    $progress.start();
                    $store
                        .dispatch(`${ORDERS_MODULE_PATH}/${FETCH_ORDER_DETAILS}`, params.orderId)
                        .then(({ number }) => {
                            $store.dispatch(`${ORDERS_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                            next((vm) => {
                                $progress.finish();
                                updateBreadcrumbs(vm, name, params, number);
                            });
                        })
                        .catch(() =>
                            next((vm) => {
                                $progress.fail();
                                updateBreadcrumbs(vm, name, params);
                            })
                        );
                }
            }
        }

        if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][ORDERS_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[PROFILE_MODULE][ORDERS_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },

    beforeRouteLeave(to, from, next) {
        this[UPDATE_BREADCRUMB]([]);
        next();
    },

    created() {
        this.deliveryMethods = receiveMethods;
    },
};
</script>
