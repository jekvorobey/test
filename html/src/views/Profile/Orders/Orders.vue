<template>
    <section class="section orders-view">
        <div class="container container--tablet-lg orders-view__header">
            <h2 class="orders-view__hl">
                {{ pageTitle }}
            </h2>

            <v-select
                v-for="filter in filters"
                :key="filter.id"
                class="orders-view__filters-sort"
                label="name"
                track-by="id"
                :value="filterValueMap[filter.name]"
                :options="filter.items"
                :searchable="false"
                :allow-empty="false"
                :show-labels="false"
                @input="onChangeFilter(filter.name, $event)"
            />
        </div>

        <div class="orders-view__panels" v-if="referralPartner && referralData && level">
            <div class="orders-view__panel">
                <div class="orders-view__panel-item">
                    <div class="text-grey orders-view__panel-name">Ваш уровень</div>
                    <div class="orders-view__panel-level">{{ levelData.currentLevelName }}</div>
                </div>
                <div
                    class="orders-view__panel-item"
                    v-if="levelData.nextLevelName || (!levelData.nextLevelName && isTabletLg && !isTablet)"
                    :style="{ visibility: levelData.nextLevelName ? 'visible' : 'hidden' }"
                >
                    <div class="text-grey orders-view__panel-name">Следующий уровень</div>
                    <div class="text-grey orders-view__panel-level">{{ levelData.nextLevelName }}</div>
                </div>

                <a class="orders-view__panel-link">Подробнее о реферальной программе</a>
            </div>

            <div class="orders-view__panel" :class="{ 'orders-view__panel--empty': !levelData.nextLevelName }">
                <template v-if="levelData.nextLevelName">
                    <div class="orders-view__panel-item">
                        <div class="orders-view__panel-item-counter">
                            <v-arc-counter
                                v-bind="arcSettings"
                                :text="referralArcData.current"
                                :activeCount="referralArcData.currentPercent"
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
                                v-bind="arcSettings"
                                :text="formatArcSum(sumArcData.current)"
                                :activeCount="sumArcData.currentPercent"
                            />
                            <div class="text-grey orders-view__panel-item-label">
                                <span>0</span>
                                <span>{{ shortNumberFormat(sumArcData.next) }}</span>
                            </div>
                        </div>
                        <div class="text-grey">Сумма моих заказов</div>
                    </div>
                </template>
                <div class="orders-view__panel-item" v-else>
                    <h2>Поздравляем!</h2>
                    Вы достигли максимального уровня!
                </div>
            </div>
        </div>

        <div ref="hook" />

        <div class="container" v-if="isTabletLg">
            <filter-button class="orders-view__filter-btn" @click="filterModal = !filterModal">
                Фильтр и сортировка&nbsp;&nbsp;
                <span class="text-grey">{{ filterCount }}</span>
            </filter-button>
        </div>

        <template v-if="orders.length > 0">
            <table class="container container--tablet-lg orders-view__table" v-if="!isTabletLg">
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
                                Номер&nbsp;заказа&nbsp;
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
                        <th class="orders-view__table-th">Сумма</th>
                        <th class="orders-view__table-th">Статус заказа</th>
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
                        <td class="orders-view__table-td">
                            <div class="text-underline">{{ order.number }}</div>
                            <div>{{ $t(`profile.productType.${order.type}`) }}</div>
                        </td>
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
                                    :disabled="isDisabled"
                                >
                                    Оплатить
                                </v-button>
                            </template>
                            <span :class="getOrderStatusClass(order)" v-else>
                                {{ getStatusName(order) }}
                            </span>
                            <br />
                            <span v-if="order.is_partially_cancelled && !order.is_canceled" class="status-color-error">
                                {{ partiallyCancelledStatus }}
                            </span>
                        </td>
                        <td class="orders-view__table-td">
                            <v-link
                                v-if="order.status === 'created'"
                                class="orders-view__table-td-link"
                                tag="button"
                                @click.stop
                                :disabled="isDisabled"
                            >
                                Отменить
                            </v-link>
                            <v-link
                                v-if="order.can_repeat"
                                class="orders-view__table-td-link"
                                tag="button"
                                @click.stop="onRepeatOrder(order)"
                                :disabled="isDisabled"
                            >
                                Повторить
                            </v-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ul class="orders-view__list" v-else>
                <li
                    class="orders-view__list-item"
                    tabindex="0"
                    v-for="order in orders"
                    :key="order.id"
                    @click="onOpenOrder(order.id)"
                >
                    <info-row class="orders-view__list-item-row" name="Номер заказа">
                        <div class="text-underline">{{ order.number }}</div>
                        <div>{{ $t(`profile.productType.${order.type}`) }}</div>
                    </info-row>

                    <info-row class="orders-view__list-item-row" name="Сумма">
                        <price v-bind="order.price" />
                    </info-row>

                    <info-row
                        class="orders-view__list-item-row"
                        name="Дата заказа"
                        :value="formatDate(order.created_at)"
                    />

                    <info-row class="orders-view__list-item-row" name="Дата доставки" :value="order.deliveryDate" />

                    <template
                        v-if="order.payment_status === orderPaymentStatus.NOT_PAID && order.payments.length !== 0"
                    >
                        <info-row class="orders-view__list-item-row">
                            <v-button
                                class="btn--outline"
                                v-for="payment in order.payments"
                                :key="payment.id"
                                @click.stop="onContinuePayment(order.id, payment.id)"
                                :disabled="isDisabled"
                            >
                                Оплатить
                            </v-button>
                        </info-row>

                        <!-- 
                        <info-row class="orders-view__list-item-row">
                            <v-link tag="button" @click.stop>
                                    Отменить
                            </v-link>
                        </info-row> 
                        -->
                    </template>

                    <template v-else>
                        <info-row class="orders-view__list-item-row" name="Cтатус">
                            {{ $t(`orderStatus.${order.status}`) }}
                        </info-row>

                        <info-row
                            class="orders-view__list-item-row"
                            v-if="order.is_partially_cancelled && !order.is_canceled"
                        >
                            {{ partiallyCancelledStatus }}
                        </info-row>

                        <info-row class="orders-view__list-item-row">
                            <v-link tag="button" @click.stop="onRepeatOrder(order)" :disabled="isDisabled">
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
        </template>
        <div class="container container--tablet-lg orders-view__empty-container" v-else>
            <v-svg name="alert" width="24" height="24" />

            <span class="orders-view__empty-text">У вас еще нет заказов</span>

            <v-button class="btn--outline" to="/catalog">перейти к покупкам</v-button>
        </div>

        <transition name="fade-in">
            <modal
                class="orders-view__modal-filter"
                v-if="filterModal && isTabletLg"
                :show-close-btn="false"
                type="fullscreen"
            >
                <template v-slot:body>
                    <v-sticky class="orders-view__modal-filter-sticky">
                        <template v-slot:sticky>
                            <div class="orders-view__modal-filter-header">
                                <button class="orders-view__modal-filter-header-btn" @click="filterModal = false">
                                    <v-svg name="cross-small" width="14" height="14" />Фильтр
                                </button>
                            </div>
                        </template>

                        <div class="orders-view__modal-filter-sort">
                            <div class="container container--tablet-lg orders-view__modal-filter-sort-title">
                                Сортировка
                            </div>

                            <ul
                                class="orders-view__modal-filter-sort-list"
                                v-for="filter in filters"
                                :key="filter.name"
                            >
                                <li
                                    class="orders-view__modal-filter-sort-item"
                                    :class="{
                                        'orders-view__modal-filter-sort-item--active':
                                            item === filterValueMap[filter.name],
                                    }"
                                    :key="item.name"
                                    v-for="item in filter.items"
                                >
                                    <button
                                        class="orders-view__modal-filter-sort-item-btn"
                                        :disabled="item === filterValueMap[filter.name]"
                                        @click="onChangeFilter(filter.name, item)"
                                    >
                                        {{ item.name }}
                                    </button>
                                </li>
                            </ul>

                            <ul class="orders-view__modal-filter-sort-list">
                                <li
                                    class="orders-view__modal-filter-sort-item"
                                    :class="{
                                        'orders-view__modal-filter-sort-item--active': orderField === sortFields.NUMBER,
                                    }"
                                >
                                    <button
                                        class="orders-view__modal-filter-sort-item-btn"
                                        :disabled="orderField === sortFields.NUMBER"
                                        @click="onChangeSort(sortFields.NUMBER)"
                                    >
                                        Номер заказа
                                    </button>
                                </li>
                                <li
                                    class="orders-view__modal-filter-sort-item"
                                    :class="{
                                        'orders-view__modal-filter-sort-item--active':
                                            orderField === sortFields.CREATED_AT,
                                    }"
                                >
                                    <button
                                        class="orders-view__modal-filter-sort-item-btn"
                                        :disabled="orderField === sortFields.CREATED_AT"
                                        @click="onChangeSort(sortFields.CREATED_AT)"
                                    >
                                        Дата заказа
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div class="orders-view__modal-filter-controls">
                            <v-button class="orders-view__modal-filter-close-btn" @click="filterModal = !filterModal">
                                Показать
                            </v-button>
                        </div>
                    </v-sticky>
                </template>
            </modal>
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSelect from '@controls/VSelect/VSelect.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VArcCounter from '@controls/VArcCounter/VArcCounter.vue';
import modal from '@controls/modal/modal.vue';

import FilterButton from '@components/FilterButton/FilterButton.vue';
import Price from '@components/Price/Price.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import { $store, $progress } from '@services';
import { mapState, mapActions, mapGetters } from 'vuex';

import { LOCALE, SCROLL } from '@store';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { UPDATE_BREADCRUMB } from '@store/modules/Profile/actions';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';

import {
    NAME as ORDERS_MODULE,
    ORDERS,
    ORDER_DIRECTION,
    ORDER_FIELD,
    ACTIVE_PAGE,
    REFERRAL_DATA,
    FILTERS, ORDER,
} from '@store/modules/Profile/modules/Orders';
import {
    REFERRAL_ARC_DATA,
    SUM_ARC_DATA,
    LEVEL_DATA,
    PAGES_COUNT,
    LEVEL,
} from '@store/modules/Profile/modules/Orders/getters';
import {
    FETCH_ORDERS,
    SET_LOAD_PATH,
    GET_ORDER_PAYMENT_LINK,
    FETCH_ORDERS_DATA,
    REPEAT_ORDER,
} from '@store/modules/Profile/modules/Orders/actions';

import { preparePrice, shortNumberFormat } from '@util';
import { getOrderStatusColorClass, generateThankPageUrl } from '@util/order';
import {orderPaymentStatus, orderStatus as orderStatusNames, sortFields} from '@enums/order';
import { orderDateLocaleOptions } from '@settings/profile';
import { sortDirections, modalName } from '@enums';
import { DEFAULT_PAGE } from '@constants';
import metaMixin from '@plugins/meta';
import '@images/sprites/arrow-updown.svg';
import '@images/sprites/arrow-down.svg';
import '@images/sprites/alert.svg';
import './Orders.css';

const ORDERS_MODULE_PATH = `${PROFILE_MODULE}/${ORDERS_MODULE}`;

function updateBreadcrumbs(vm) {
    vm[UPDATE_BREADCRUMB]([]);
}

export default {
    name: 'orders',
    mixins: [metaMixin],

    components: {
        VSvg,
        VLink,
        VButton,
        VSelect,
        VPagination,
        VArcCounter,
        VSticky,
        modal,

        FilterButton,
        Price,
        InfoRow,
        ShowMoreButton,
    },

    metaInfo() {
        const { pageTitle, activePage } = this;

        return {
            title: activePage > 1 ? `${pageTitle} – страница ${activePage}` : pageTitle,
        };
    },

    data() {
        return {
            showMore: false,
            filterModal: false,
            isDisabled: false,
        };
    },

    computed: {
        ...mapState([LOCALE, SCROLL]),
        ...mapState(ORDERS_MODULE_PATH, [ORDERS, FILTERS, ORDER_DIRECTION, ORDER_FIELD, ACTIVE_PAGE, REFERRAL_DATA]),
        ...mapGetters(ORDERS_MODULE_PATH, [PAGES_COUNT, REFERRAL_ARC_DATA, SUM_ARC_DATA, LEVEL_DATA, LEVEL]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        filterCount() {
            const {
                filters,
                $route: { query },
                orderField = sortFields.NUMBER,
            } = this;

            let count = filters.reduce((accum, current) => {
                const { name, items } = current;
                const code = query[name];
                const item = code && items.find((i) => i.code === code);
                if (item && item !== items[0]) accum += 1;
                return accum;
            }, 0);

            if (orderField !== sortFields.NUMBER) count += 1;
            return count;
        },

        filterValueMap() {
            const {
                filters,
                $route: { query },
            } = this;

            const map = filters.reduce((accum, current) => {
                const { name, items } = current;
                const code = query[name];
                accum[name] = (code && items.find((i) => i.code === code)) || items[0];
                return accum;
            }, {});
            return map;
        },

        arcSettings() {
            return {
                start: -120,
                end: 120,
                activeWidth: 16,
                strokeWidth: 16,
                stroke: '#BDBDBD',
                activeStroke: '#141116',
                dashCount: 100,
            };
        },

        pageTitle() {
            return this.$t(`profile.routes.${this.$route.name}`);
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
        ...mapActions(ORDERS_MODULE_PATH, [FETCH_ORDERS, SET_LOAD_PATH, GET_ORDER_PAYMENT_LINK, REPEAT_ORDER]),
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

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
            return getOrderStatusColorClass(order.status, order.is_canceled);
        },

        async onContinuePayment(orderId, paymentId) {
            try {
                const backUrl = generateThankPageUrl(orderId);
                const { url } = await this[GET_ORDER_PAYMENT_LINK]({ orderId, paymentId, backUrl });

                // заменяем текущий роут на роут thank-you, чтобы при переходе по стрелке мы вернулись на страницу
                // благодарности за заказ
                window.history.replaceState(null, '', backUrl);
                document.location.href = url;
            } catch (error) {
                alert('Ошибка при переходе на оплату');
            }
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
            this.$router.push({
                path: this.$route.path,
                query: { ...this.$route.query, page: page > DEFAULT_PAGE ? page : undefined },
            });
        },

        scrollTo(options) {
            if (!this.$isServer) window.scrollTo(options);
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
                query: { ...this.$route.query, orderField, orderDirection, page: DEFAULT_PAGE },
            });
        },

        onOpenOrder(id) {
            this.$router.push({ name: 'OrderDetails', params: { orderId: id } });
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

        onChangeFilter(name, value) {
            const { code } = value;

            const query = {
                ...this.$route.query,
                [name]: code,
            };
            delete query.page;

            this.$router.replace({
                path: this.$route.path,
                query,
            });
        },

        getStatusName(order) {
            const { status } = order || {};

            // Вывод статуса Отменён
            if (order['is_canceled']) {
                return this.$t(`orderStatus.${orderStatusNames.CANCELED}`);
            }
            return this.$t(`orderStatus.${status}`);
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const { fullPath, query } = to;
        const { page = DEFAULT_PAGE, orderField = sortFields.NUMBER, orderDirection = sortDirections.DESC } = query;

        function proceed() {
            if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][ORDERS_MODULE]) {
                const { loadPath } = $store.state[PROFILE_MODULE][ORDERS_MODULE];
                const filter = { ...query, page: undefined, orderField: undefined, orderDirection: undefined };

                // если все загружено, пропускаем
                if (loadPath === fullPath)
                    next((vm) => {
                        updateBreadcrumbs(vm);
                    });
                else {
                    $progress.start();
                    $store
                        .dispatch(`${ORDERS_MODULE_PATH}/${FETCH_ORDERS_DATA}`, {
                            page,
                            orderField,
                            orderDirection,
                            filter,
                        })
                        .then(() => {
                            $store.dispatch(`${ORDERS_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                            next((vm) => {
                                $progress.finish();
                                updateBreadcrumbs(vm);
                            });
                        })
                        .catch((thrown) => {
                            if (thrown && thrown.isCancel === true) return next((vm) => updateBreadcrumbs(vm));
                            next((vm) => {
                                $progress.fail();
                                updateBreadcrumbs(vm);
                            });
                        });
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

    async beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        const { query } = to;
        const { page = DEFAULT_PAGE, orderField = sortFields.NUMBER, orderDirection = sortDirections.DESC } = query;
        const filter = { ...query, page: undefined, orderField: undefined, orderDirection: undefined };

        const {
            query: { page: fromPage },
        } = from;

        try {
            if (this[SCROLL] && !this.showMore && page !== fromPage)
                this.scrollTo({
                    top: this.$refs.hook.offsetTop,
                    behavior: 'smooth',
                });

            this.$progress.start();
            await this[FETCH_ORDERS]({
                page,
                orderField,
                orderDirection,
                filter,
                showMore: this.showMore,
            });
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
