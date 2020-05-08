<template>
    <section class="section orders-view">
        <h2 class="container container--tablet-lg orders-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <div class="orders-view__panels" v-if="referralPartner">
            <div class="orders-view__panel">
                <div class="orders-view__panel-item">
                    <div class="text-grey orders-view__panel-name">Ваш уровень</div>
                    <div class="orders-view__panel-level">{{ levelData.currentLevelName }}</div>
                </div>
                <div class="orders-view__panel-item">
                    <div class="text-grey orders-view__panel-name">Следующий уровень</div>
                    <div class="text-grey orders-view__panel-level">{{ levelData.nextLevelName }}</div>
                </div>

                <a class="orders-view__panel-link">Подробнее о реферальной программе</a>
            </div>

            <div class="orders-view__panel">
                <div class="orders-view__panel-item">
                    <div class="orders-view__panel-item-counter">
                        <v-arc-counter
                            stroke="#BDBDBD"
                            activeStroke="#141116"
                            :text="referralArcData.current"
                            :start="-120"
                            :end="120"
                            :activeWidth="16"
                            :strokeWidth="16"
                            :dashCount="referralArcData.next"
                            :activeCount="referralArcData.current"
                        />
                        <div class="text-grey orders-view__panel-item-label">
                            <span>0</span>
                            <span>{{ referralArcData.next }}</span>
                        </div>
                    </div>

                    <div class="text-grey">Новых заказов</div>
                </div>
                <div class="orders-view__panel-item">
                    <div class="orders-view__panel-item-counter">
                        <v-arc-counter
                            stroke="#BDBDBD"
                            activeStroke="#141116"
                            :text="formatArcSum(sumArcData.current)"
                            :start="-120"
                            :end="120"
                            :activeWidth="16"
                            :strokeWidth="16"
                            :dashCount="sumArcData.next"
                            :activeCount="sumArcData.current"
                        />
                        <div class="text-grey orders-view__panel-item-label">
                            <span>0</span>
                            <span>{{ shortNumberFormat(sumArcData.next) }}</span>
                        </div>
                    </div>
                    <div class="text-grey">Сумма моих заказов</div>
                </div>
            </div>
        </div>

        <div class="container container--tablet-lg">
            <filter-button class="orders-view__filter-btn" @click="filterModal = !filterModal">
                Фильтр и сортировка&nbsp;&nbsp;
                <span class="text-grey">4</span>
            </filter-button>

            <table class="orders-view__table" v-if="!isTabletLg">
                <colgroup>
                    <col width="15%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="15%" />
                </colgroup>
                <thead class="orders-view__table-head">
                    <tr class="orders-view__table-tr orders-view__table-tr--header">
                        <th class="orders-view__table-th">
                            <v-link
                                tag="button"
                                class="orders-view__table-th-link"
                                @click="onChangeSort(sortFields.NUMBER)"
                            >
                                Номер заказа&nbsp;
                                <v-svg
                                    v-if="orderField !== sortFields.NUMBER"
                                    name="arrow-updown"
                                    width="16"
                                    height="16"
                                />
                                <v-svg
                                    v-else-if="orderDirection === sortDirections.DESC"
                                    name="arrow-down"
                                    width="16"
                                    height="16"
                                />
                                <v-svg v-else class="icon--rotate-deg180" name="arrow-down" width="16" height="16" />
                            </v-link>
                        </th>
                        <th class="orders-view__table-th">
                            <v-link
                                tag="button"
                                class="orders-view__table-th-link"
                                @click="onChangeSort(sortFields.CREATED_AT)"
                            >
                                Дата заказа&nbsp;
                                <v-svg
                                    v-if="orderField !== sortFields.CREATED_AT"
                                    name="arrow-updown"
                                    width="16"
                                    height="16"
                                />
                                <v-svg
                                    v-else-if="orderDirection === sortDirections.DESC"
                                    name="arrow-down"
                                    width="16"
                                    height="16"
                                />
                                <v-svg v-else class="icon--rotate-deg180" name="arrow-down" width="16" height="16" />
                            </v-link>
                        </th>
                        <th class="orders-view__table-th">
                            Сумма
                        </th>
                        <th class="orders-view__table-th">
                            Статус заказа
                        </th>
                        <th class="orders-view__table-th" />
                    </tr>
                </thead>
                <tbody class="orders-view__table-body">
                    <tr
                        class="orders-view__table-tr"
                        v-for="order in orders"
                        :key="order.id"
                        @click="onOpenOrder(order.id)"
                    >
                        <td class="orders-view__table-td">{{ order.number }}</td>
                        <td class="orders-view__table-td">{{ formatDate(order.created_at) }}</td>
                        <td class="orders-view__table-td">
                            <price v-bind="order.price" />
                        </td>
                        <td class="orders-view__table-td">
                            <template
                                v-if="
                                    order.payment_status === orderPaymentStatus.NOT_PAID && order.payments.length !== 0
                                "
                            >
                                <v-button
                                    class="btn--outline"
                                    v-for="payment in order.payments"
                                    :key="payment.id"
                                    @click.stop="onContinuePayment(order.id, payment.id)"
                                >
                                    Оплатить
                                </v-button>
                            </template>
                            <span :class="getOrderStatusClass(order)" v-else>
                                {{ $t(`orderStatus.${order.status}`) }}
                            </span>
                        </td>
                        <td class="orders-view__table-td">
                            <v-link
                                v-if="order.status === 'created'"
                                class="orders-view__table-td-link"
                                tag="button"
                                @click.stop
                            >
                                Отменить
                            </v-link>
                            <v-link
                                v-else
                                class="orders-view__table-td-link"
                                tag="button"
                                @click.stop="onRepeatOrder(order)"
                            >
                                Повторить
                            </v-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <ul class="orders-view__list" v-if="isTabletLg">
            <li
                class="orders-view__list-item"
                tabindex="0"
                v-for="order in orders"
                :key="order.id"
                @click="onOpenOrder(order.id)"
            >
                <info-row class="orders-view__list-item-row" name="Номер заказа" :value="order.number" />
                <info-row class="orders-view__list-item-row" name="Сумма">
                    <price v-bind="order.price" />
                </info-row>
                <info-row class="orders-view__list-item-row" name="Дата заказа" :value="order.created_at" />
                <info-row class="orders-view__list-item-row" name="Дата доставки" :value="order.deliveryDate" />

                <template v-if="order.payment_status === orderPaymentStatus.NOT_PAID && order.payments.length !== 0">
                    <info-row class="orders-view__list-item-row">
                        <v-button
                            class="btn--outline"
                            v-for="payment in order.payments"
                            :key="payment.id"
                            @click.stop="onContinuePayment(order.id, payment.id)"
                        >
                            Оплатить
                        </v-button>
                    </info-row>
                    <!-- <info-row class="orders-view__list-item-row">
                        <v-link tag="button" @click.stop>
                            Отменить
                        </v-link>
                    </info-row> -->
                </template>

                <template v-else>
                    <info-row class="orders-view__list-item-row" name="Cтатус">
                        {{ $t(`orderStatus.${order.status}`) }}
                    </info-row>
                    <info-row class="orders-view__list-item-row">
                        <v-link tag="button" @click.stop="onRepeatOrder(order)">
                            Повторить
                        </v-link>
                    </info-row>
                </template>
            </li>
        </ul>

        <div class="container container--tablet-lg orders-view__controls" v-if="pagesCount > 1">
            <show-more-button
                v-if="activePage < pagesCount"
                btn-class="btn--outline orders-view__controls-btn"
                @click.prevent="onShowMore"
                :show-preloader="showMore"
            >
                Показать ещё
            </show-more-button>
            <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
        </div>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VArcCounter from '@controls/VArcCounter/VArcCounter.vue';

import FilterButton from '@components/FilterButton/FilterButton.vue';
import Price from '@components/Price/Price.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import { $store, $progress, $logger } from '@services';
import { mapState, mapActions, mapGetters } from 'vuex';

import { LOCALE } from '@store';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { UPDATE_BREADCRUMB } from '@store/modules/Profile/actions';

import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { FETCH_CART_DATA } from '@store/modules/Cart/actions';

import {
    NAME as ORDERS_MODULE,
    ORDERS,
    ORDER_DIRECTION,
    ORDER_FIELD,
    ACTIVE_PAGE,
} from '@store/modules/Profile/modules/Orders';
import {
    REFERRAL_ARC_DATA,
    SUM_ARC_DATA,
    LEVEL_DATA,
    PAGES_COUNT,
} from '@store/modules/Profile/modules/Orders/getters';
import {
    FETCH_ORDERS,
    SET_LOAD_PATH,
    GET_ORDER_PAYMENT_LINK,
    FETCH_ORDERS_DATA,
    REPEAT_ORDER,
} from '@store/modules/Profile/modules/Orders/actions';

import { preparePrice, shortNumberFormat } from '@util';
import { getOrderStatusColorClass } from '@util/order';
import { orderStatus, orderPaymentStatus, sortFields } from '@enums/order';
import { orderDateLocaleOptions } from '@settings/profile';
import { sortDirections } from '@enums';
import { DEFAULT_PAGE } from '@constants';

import '@images/sprites/arrow-updown.svg';
import '@images/sprites/arrow-down.svg';
import './Orders.css';

const ORDERS_MODULE_PATH = `${PROFILE_MODULE}/${ORDERS_MODULE}`;

function updateBreadcrumbs(vm) {
    vm[UPDATE_BREADCRUMB]([]);
}

export default {
    name: 'orders',

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VPagination,
        VArcCounter,

        FilterButton,
        Price,
        InfoRow,
        ShowMoreButton,
    },

    data() {
        return {
            showMore: false,
            filterModal: false,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(ORDERS_MODULE_PATH, [ORDERS, ORDER_DIRECTION, ORDER_FIELD, ACTIVE_PAGE]),
        ...mapGetters(ORDERS_MODULE_PATH, [PAGES_COUNT, REFERRAL_ARC_DATA, SUM_ARC_DATA, LEVEL_DATA]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: state => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(ORDERS_MODULE_PATH, [FETCH_ORDERS, SET_LOAD_PATH, GET_ORDER_PAYMENT_LINK, REPEAT_ORDER]),
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
        ...mapActions(CART_MODULE, [FETCH_CART_DATA]),

        formatDate(date) {
            if (typeof date !== 'string') return;
            const obj = new Date(date.split(' ')[0]);
            return obj.toLocaleDateString(this[LOCALE], orderDateLocaleOptions);
        },

        formatArcSum(sum) {
            return `${preparePrice(sum)} ₽`;
        },

        shortNumberFormat(sum) {
            return shortNumberFormat(sum);
        },

        getOrderStatusClass(order) {
            return getOrderStatusColorClass(order.status, order.canceled);
        },

        async onContinuePayment(orderId, paymentId) {
            const backUrl = `${document.location.origin}/thank-you`;
            const { url } = await this[GET_ORDER_PAYMENT_LINK]({ orderId, paymentId, backUrl });
            document.location.href = url;
        },

        onShowMore() {
            this.showMore = true;
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, page: this[ACTIVE_PAGE] + 1 },
            });
        },

        onPageChanged(page) {
            this.showMore = false;
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page } });
        },

        onChangeSort(name) {
            let orderField = name;
            let orderDirection = null;

            if (this[ORDER_FIELD] !== name) orderDirection = sortDirections.DESC;
            else
                orderDirection =
                    this[ORDER_DIRECTION] === sortDirections.DESC ? sortDirections.ASC : sortDirections.DESC;

            this.$router.replace({
                name: 'Orders',
                query: { orderField, orderDirection, page: DEFAULT_PAGE },
            });
        },

        onOpenOrder(id) {
            this.$router.push({ name: 'OrderDetails', params: { orderId: id } });
        },

        async onRepeatOrder({ id }) {
            Promise.resolve(this[REPEAT_ORDER](id)).then(
                this[FETCH_CART_DATA]().then(this.$router.push({ path: '/cart' }))
            );
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            fullPath,
            query: { page = DEFAULT_PAGE, orderField = sortFields.NUMBER, orderDirection = sortDirections.DESC },
        } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][ORDERS_MODULE];

        // если все загружено, пропускаем
        if (loadPath === fullPath) next(vm => updateBreadcrumbs(vm));
        else {
            $progress.start();
            $store
                .dispatch(`${ORDERS_MODULE_PATH}/${FETCH_ORDERS_DATA}`, {
                    page,
                    orderField,
                    orderDirection,
                })
                .then(data => {
                    $store.dispatch(`${ORDERS_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                        updateBreadcrumbs(vm);
                    });
                })
                .catch(thrown => {
                    if (thrown && thrown.isCancel === true) return next(vm => updateBreadcrumbs(vm));
                    next(vm => {
                        $progress.fail();
                        updateBreadcrumbs(vm);
                    });
                });
        }
    },

    async beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        const {
            query: { page = DEFAULT_PAGE, orderField = sortFields.NUMBER, orderDirection = sortDirections.DESC },
        } = to;

        try {
            this.$progress.start();
            await this[FETCH_ORDERS]({ page, orderField, orderDirection, showMore: this.showMore });
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }

        this.showMore = false;
    },

    beforeCreate() {
        this.sortFields = sortFields;
        this.sortDirections = sortDirections;
        this.orderPaymentStatus = orderPaymentStatus;
    },
};
</script>
