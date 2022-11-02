<template>
    <section class="section referal-view">
        <h2 class="referal-view__hl">
            {{ pageTitle }}
        </h2>

        <cabinet-referral-panel class="cabinet-view__panel referal-view__referal-panel" />

        <div class="referal-view__panels" v-if="referralData && level">
            <div class="referal-view__panel">
                <div class="referal-view__panel-group">
                    <div class="referal-view__panel-item">
                        <div class="text-grey referal-view__panel-name">Ваш уровень</div>
                        <div class="referal-view__panel-level">{{ levelData.currentLevelName }}</div>
                    </div>
                    <div
                        class="referal-view__panel-item"
                        v-if="levelData.nextLevelName || (!levelData.nextLevelName && isTabletLg && !isTablet)"
                        :style="{ visibility: levelData.nextLevelName ? 'visible' : 'hidden' }"
                    >
                        <div class="text-grey referal-view__panel-name">Следующий уровень</div>
                        <div class="text-grey referal-view__panel-level">{{ levelData.nextLevelName }}</div>
                    </div>
                </div>

                <a class="referal-view__panel-link">Подробнее о реферальной программе</a>
            </div>
            <div class="referal-view__panel" :class="{ 'referal-view__panel--empty': !levelData.nextLevelName }">
                <template v-if="levelData.nextLevelName">
                    <div class="referal-view__panel-item">
                        <div class="referal-view__panel-item-counter">
                            <v-arc-counter
                                v-bind="arcSettings"
                                :text="referralArcData.value"
                                :active-count="referralArcData.currentPercent"
                            />
                            <div class="text-grey referal-view__panel-item-label">
                                <span>0</span>
                                <span>{{ referralArcData.next }}</span>
                            </div>
                        </div>
                        <div class="text-grey">Новых рефералов</div>
                    </div>
                    <div class="referal-view__panel-item">
                        <div class="referal-view__panel-item-counter">
                            <v-arc-counter
                                v-bind="arcSettings"
                                :text="formatArcSum(sumArcData.value)"
                                :active-count="sumArcData.currentPercent"
                            />
                            <div class="text-grey referal-view__panel-item-label">
                                <span>0</span>
                                <span>{{ shortNumberFormat(sumArcData.next) }}</span>
                            </div>
                        </div>
                        <div class="text-grey">Сумма заказов</div>
                    </div>
                </template>
                <div class="referal-view__panel-item" v-else>
                    <h2>Поздравляем!</h2>
                    Вы достигли максимального уровня!
                </div>
            </div>
        </div>

        <template v-if="(orders && orders.length) || !!sumArcData.value">
            <section class="referal-view__section referal-view__graph">
                <h3 class="container container--tablet-lg referal-view__section-hl">Новые рефералы</h3>

                <referral-chart
                    :labels="series.labels"
                    :data="series.points"
                    :y-step="series.yStep"
                    height="300px"
                    width="912px"
                />
            </section>

            <div class="container container--tablet-lg">
                <section class="referal-view__section referal-view__graph-table">
                    <div class="referal-view__section-header">
                        <h3 class="referal-view__section-hl">История заказов рефералов</h3>
                        <v-select
                            class="referal-view__section-filter"
                            v-if="!isTabletLg"
                            label="title"
                            track-by="id"
                            v-model="orderFilterValue"
                            :options="orderFilterOptions"
                            :searchable="false"
                            :allow-empty="false"
                            :show-labels="false"
                        />
                    </div>

                    <table class="referal-view__table" v-if="!isTabletLg && orders && orders.length">
                        <colgroup>
                            <col width="40%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="12%" />
                        </colgroup>

                        <thead class="referal-view__table-head">
                            <tr class="referal-view__table-tr referal-view__table-tr--header">
                                <th
                                    class="referal-view__table-th"
                                    :class="[
                                        { 'is-active': item.field === sortValue.field },
                                        { 'is-rotate': item.field === sortValue.field && sortDirection === 'asc' },
                                    ]"
                                    v-for="item in sortFields"
                                    :key="item.id"
                                    :id="`order-sort-item-${item.id}`"
                                >
                                    <div class="referal-view__table-sort" @click="setSortValue(item.field)">
                                        {{ item.title }}
                                        <v-svg name="arrow-down-small" width="24" height="24" />
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <transition-group class="referal-view__table-body" tag="tbody" name="fade-in" appear>
                            <tr class="referal-view__table-tr" v-for="order in orders" :key="order.id">
                                <td class="referal-view__table-td">
                                    <router-link class="referal-view__table-link" :to="order.url">
                                        <div
                                            class="referal-view__table-img"
                                            :class="{
                                                'referal-view__table-img--empty': !order.image || !order.image.id,
                                            }"
                                        >
                                            <v-picture v-if="order.image && order.image.id" :key="order.image.id">
                                                <source :data-srcset="order.desktopImage" type="image/webp" />
                                                <img
                                                    class="blur-up lazyload v-picture__img"
                                                    :data-src="order.defaultImage"
                                                />
                                            </v-picture>
                                            <v-svg v-else name="logo" width="32" height="32" />
                                        </div>
                                        <div class="referal-view__table-title">
                                            <div>{{ order.name }}</div>
                                            <div class="text-grey text-sm">{{ order.note }}</div>
                                        </div>
                                    </router-link>
                                </td>
                                <td class="referal-view__table-td">{{ order.qty }} шт</td>
                                <td class="referal-view__table-td">
                                    <router-link
                                        :to="{ name: 'ReferalOrderDetails', params: { referalId: order.customer_id } }"
                                    >
                                        {{ order.customer_id }}
                                    </router-link>
                                </td>
                                <td class="referal-view__table-td">
                                    {{ order.sourceString }}
                                </td>
                                <td class="referal-view__table-td">{{ order.date }}</td>
                                <td class="referal-view__table-td">
                                    <price v-bind="order.price_product" always-number />
                                </td>
                                <td class="referal-view__table-td">
                                    <price v-bind="order.price_commission" always-number />
                                </td>
                            </tr>
                        </transition-group>
                    </table>
                </section>

                <filter-button class="referal-view__filter-btn" v-if="isTabletLg" @click="filterModal = !filterModal">
                    Фильтр и сортировка&nbsp;&nbsp;
                    <!-- <span class="text-grey">4</span> -->
                </filter-button>
            </div>

            <ul class="referal-view__list" v-if="isTabletLg">
                <li class="referal-view__list-item" v-for="order in orders" :key="order.id">
                    <info-row class="referal-view__list-item-row" name="Товар">
                        <router-link class="referal-view__table-link" :to="order.url">
                            <div
                                class="referal-view__table-img"
                                :class="{ 'referal-view__table-img--empty': !order.image || !order.image.id }"
                            >
                                <v-picture v-if="order.image && order.image.id" :key="order.image.id">
                                    <source :data-srcset="order.desktopImage" type="image/webp" />
                                    <img class="blur-up lazyload v-picture__img" :data-src="order.defaultImage" />
                                </v-picture>
                                <v-svg v-else name="logo" width="32" height="32" />
                            </div>
                            <div class="referal-view__table-title">
                                <div>{{ order.name }}</div>
                                <div class="text-grey text-sm">{{ order.note }}</div>
                            </div>
                        </router-link>
                    </info-row>

                    <info-row class="referal-view__list-item-row" name="Количество"> {{ order.qty }} шт. </info-row>

                    <info-row class="referal-view__list-item-row" name="ID реферала">
                        <router-link :to="{ name: 'ReferalOrderDetails', params: { referalId: order.customer_id } }">
                            {{ order.customer_id }}
                        </router-link>
                    </info-row>
                    <info-row class="referal-view__list-item-row" name="Источник" :value="order.sourceString" />
                    <info-row class="referal-view__list-item-row" name="Дата заказа" :value="order.date" />
                    <info-row class="referal-view__list-item-row" name="Сумма">
                        <price v-bind="order.price_product" always-number />
                    </info-row>
                    <info-row class="referal-view__list-item-row" name="Сумма вознаграждения">
                        <price v-bind="order.price_commission" always-number />
                    </info-row>
                </li>
            </ul>
        </template>
        <attention-panel class="referal-view__attention-panel">
            <div class="referal-view__attention-section">
                <p class="referal-view__attention-text">
                    Вам еще не начислялись вознаграждения за покупки рефералов. Воспользуйтесь одним из маркетинговых
                    инструменов для привлечения аудитории:
                </p>
                <ul class="list list--dashed referal-view__attention-list">
                    <li class="referal-view__attention-list-item">
                        <v-link class="referal-view__attention-link" tag="button" @click="onCopyToClipboard($event)">
                            скопировать
                        </v-link>
                        реферальную ссылку и разместить её в соцсетях
                    </li>
                    <li class="referal-view__attention-list-item">
                        собрать собственную
                        <v-link class="referal-view__attention-link" tag="button" :to="{ name: 'Promopage' }">
                            промо-страницу
                        </v-link>
                        с товарами
                    </li>
                    <li class="referal-view__attention-list-item">
                        <button class="referal-view__attention-link" @click="onPromocodeRequest">запросить</button>
                        промо-код
                    </li>
                    <li class="referal-view__attention-list-item">
                        <v-link class="referal-view__attention-link" tag="button" :to="{ name: 'Seo' }">
                            расшарить
                        </v-link>
                        товары для продвижения
                    </li>
                </ul>
            </div>
        </attention-panel>

        <div class="container container--tablet-lg referal-view__controls" v-if="pagesCount > 1">
            <show-more-button
                v-if="activePage < pagesCount"
                btn-class="btn--outline referal-view__controls-btn"
                @click.prevent="onShowMore"
                :show-preloader="showMore"
            >
                Показать ещё
            </show-more-button>
            <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
        </div>

        <transition name="fade">
            <general-modal
                class="referal-view__modal-filter"
                type="fullscreen"
                :is-mobile="isTabletLg"
                header="Фильтр и сортировка"
                v-if="filterModal && isTabletLg"
                @close="filterModal = false"
            >
                <template v-slot:content>
                    <transition name="fade-in" mode="out-in">
                        <div class="referal-view__modal-filter-sort">
                            <div class="referal-view__modal-filter-sort-title">Сортировка</div>
                            <ul class="referal-view__modal-filter-sort-list">
                                <li
                                    class="referal-view__modal-filter-sort-item"
                                    :class="{
                                        'referal-view__modal-filter-sort-item--active': item === orderFilterValue,
                                    }"
                                    v-for="item in orderFilterOptions"
                                    :key="item.title"
                                >
                                    <button
                                        class="referal-view__modal-filter-sort-btn"
                                        @click="setOrderFilterValue(item.field)"
                                    >
                                        {{ item.title }}
                                    </button>
                                </li>
                            </ul>

                            <div class="referal-view__modal-filter-controls">
                                <v-button
                                    class="btn--outline referal-view__modal-filter-clear-btn"
                                    @click="clearFilterUrl"
                                    replace
                                    >Очистить</v-button
                                >
                                <v-button
                                    class="referal-view__modal-filter-close-btn"
                                    @click="filterModal = !filterModal"
                                    >Показать</v-button
                                >
                            </div>
                        </div>
                    </transition>
                </template>
            </general-modal>
        </transition>

        <transition name="fade">
            <message-modal v-if="$isServer || isMessageOpen" @created="onChatCreated" />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VArcCounter from '@controls/VArcCounter/VArcCounter.vue';
import VLink from '@controls/VLink/VLink.vue';
import VSelect from '@controls/VSelect/VSelect.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import Price from '@components/Price/Price.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import FilterButton from '@components/FilterButton/FilterButton.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';
import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';
import CabinetReferralPanel from "@components/profile/CabinetReferralPanel/CabinetReferralPanel.vue";
import MessageModal from '@components/profile/MessageModal/MessageModal.vue';

import { mapActions, mapGetters, mapState } from 'vuex';
import { LOCALE } from '@store';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as REFERRAL_MODULE, ITEMS, ACTIVE_PAGE, REFERRAL_DATA } from '@store/modules/Profile/modules/Referral';
import { FETCH_REFERRAL_DATA, SET_LOAD_PATH, FETCH_ORDERS } from '@store/modules/Profile/modules/Referral/actions';
import {
    REFERRAL_ARC_DATA,
    SUM_ARC_DATA,
    LEVEL_DATA,
    PAGES_COUNT,
    REFERRALS,
    LEVEL,
} from '@store/modules/Profile/modules/Referral/getters';

import { NAME as AUTH_MODULE, REFERRAL_CODE, USER } from '@store/modules/Auth';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import {$store, $progress, $logger} from '@services';
import { fileExtension, sortDirections, modalName, themeCodes } from '@enums';
import { referralOrderSortFields } from '@enums/profile';
import { filterField } from '@enums/order';
import { DEFAULT_PAGE } from '@constants';
import { digit2DateSettings } from '@settings';
import { baseChartOptions } from '@settings/profile';
import { preparePrice, shortNumberFormat, saveToClipboard, getDate, calculateStepSize } from '@util';
import { generateProductUrl } from '@util/catalog';
import { generatePictureSourcePath } from '@util/file';
import { generateReferralLink } from '@util/profile';
import { getOrderFilterDate } from '@util/order';
import metaMixin from '@plugins/meta';
import '@images/sprites/link.svg';
import '@images/sprites/logo.svg';
import '@images/sprites/arrow-down-small.svg';
import './Referal.css';
import {
    FETCH_CABINET_DATA,
} from "@store/modules/Profile/modules/Cabinet/actions";
import {NAME as CABINET_MODULE} from "@store/modules/Profile/modules/Cabinet";
const REFERRAL_MODULE_PATH = `${PROFILE_MODULE}/${REFERRAL_MODULE}`;
const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

const ReferralChart = () =>
    import(/* webpackChunkName: "referral-chart" */ '@components/profile/ReferralChart/ReferralChart.vue');

export default {
    name: 'referal',
    mixins: [metaMixin],

    components: {
        VSvg,
        VButton,
        VPicture,
        VPagination,
        VLink,
        VSelect,
        VArcCounter,
        GeneralModal,

        CabinetReferralPanel,
        Price,
        InfoRow,
        FilterButton,
        ShowMoreButton,
        AttentionPanel,
        MessageModal,

        ReferralChart,
    },

    metaInfo() {
        const { pageTitle, activePage } = this;
        return {
            title: activePage > 1 ? `${pageTitle} – страница ${activePage}` : pageTitle,
        };
    },

    data() {
        const orderFilterOptions = [
            { id: 1, title: 'Все время', field: filterField.ALL_TIME },
            { id: 2, title: 'За год', field: filterField.YEAR },
            { id: 3, title: 'За месяц', field: filterField.MONTH },
            { id: 4, title: 'За день', field: filterField.DAY },
        ];

        const sortFields = [
            { id: 1, title: 'Товар', field: referralOrderSortFields.NAME },
            { id: 2, title: 'Количество', field: referralOrderSortFields.QTY },
            { id: 3, title: 'ID реферала', field: referralOrderSortFields.CUSTOMER_ID },
            { id: 4, title: 'Источник', field: referralOrderSortFields.SOURCE },
            { id: 5, title: 'Дата заказа', field: referralOrderSortFields.ORDER_DATE },
            { id: 6, title: 'Сумма', field: referralOrderSortFields.PRICE_PRODUCT },
            {
                id: 7,
                title: 'Сумма вознаграждения',
                field: referralOrderSortFields.PRICE_COMMISSION,
            },
        ];

        return {
            orderFilterValue: orderFilterOptions[0],
            orderFilterOptions,
            sortFields,
            sortValue: sortFields[0],
            sortDirection: sortDirections.ASC,
            isMounted: false,
            showMore: false,
            filterModal: false,

            chartOptions: {
                ...baseChartOptions,
            },

            options: null,
            chartData: null,
            rectangleSet: false,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(REFERRAL_MODULE_PATH, [ITEMS, ACTIVE_PAGE, REFERRAL_DATA]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_CODE]: (state) => (state[USER] && state[USER][REFERRAL_CODE]) || false,
        }),
        ...mapState(MODAL_MODULE, {
            isMessageOpen: (state) =>
                state[MODALS][modalName.profile.MESSAGE] && state[MODALS][modalName.profile.MESSAGE].open,
        }),

        ...mapGetters(REFERRAL_MODULE_PATH, [
            REFERRAL_ARC_DATA,
            SUM_ARC_DATA,
            LEVEL_DATA,
            PAGES_COUNT,
            REFERRALS,
            LEVEL,
        ]),

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

        series() {
            const data = this[REFERRALS] || [];
            const labels = data.map((d) => d[0]);
            const points = data.map((d) => d[1]);
            const maxPoint = Math.max(...points);
            const yStep = calculateStepSize(maxPoint, 10);

            return {
                labels,
                points,
                yStep,
            };
        },

        orders() {
            const items = this[ITEMS] || [];

            return items.map((i) => {
                const { image, order_date, source, category_code, code, variantGroup } = i;
                const desktopImage = image && generatePictureSourcePath(40, 40, image.id, fileExtension.image.WEBP);
                const defaultImage = image && generatePictureSourcePath(40, 40, image.id);
                const date = order_date && getDate(order_date).toLocaleDateString(this[LOCALE], digit2DateSettings);
                const sourceString = this.$t(`referralSource.${source}`);
                const url = generateProductUrl(category_code, code);

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

                return {
                    ...i,
                    note,
                    qty: Number(i.qty),
                    url,
                    sourceString,
                    date,
                    defaultImage,
                    desktopImage,
                };
            });
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
    },

    watch: {
        orderFilterValue(value, oldValue) {
            if (value !== oldValue) {
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        orderFilterField: value.field,
                    },
                });
            }
        },

        sortValue(value, oldValue) {
            if (value !== oldValue) {
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        orderField: value.field,
                        orderDirection: this.sortDirection,
                    },
                });
            }
        },

        sortDirection(value, oldValue) {
            if (value !== oldValue) {
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        orderDirection: value,
                        orderField: this.sortValue.field,
                    },
                });
            }
        },
    },

    methods: {
        ...mapActions(REFERRAL_MODULE_PATH, [FETCH_REFERRAL_DATA, FETCH_ORDERS, SET_LOAD_PATH]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [FETCH_CABINET_DATA]),

        onOpenOrder(id) {
            this.$router.push({ name: 'ReferalOrderDetails', params: { referalId: id } });
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

        formatArcSum(sum) {
            return `${preparePrice(sum)} ₽`;
        },

        shortNumberFormat(sum) {
            return shortNumberFormat(sum);
        },

        onCopyToClipboard(e) {
            const link = generateReferralLink(this[REFERRAL_CODE]);
            const result = saveToClipboard(link);
            const message = result ? 'Успешно скопировано' : 'Не удается скопировать';
            this[CHANGE_MODAL_STATE]({ name: modalName.general.NOTIFICATION, open: true, state: { message } });
            e.target.focus();
        },

        onPromocodeRequest() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.MESSAGE,
                open: true,
                state: {
                    themeCode: themeCodes.PROMOCODE,
                },
            });
        },

        onChatCreated() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.NOTIFICATION,
                open: true,
                state: {
                    title: 'Уведомление',
                    message: 'Запрос отправлен, администратор свяжется с вами в ближайшее время.',
                },
            });
        },

        setOrderFilterValue(field) {
            this.orderFilterValue =
                this.orderFilterOptions.find((o) => o.field === field) || this.orderFilterOptions[0];
        },

        setSortValue(field) {
            if (field === undefined) return;
            if (this.sortValue.field !== field) {
                this.sortValue = this.sortFields.find((o) => o.field === field);
                this.sortDirection = sortDirections.DESC;
            } else this.setSortDirection();
        },

        setSortDirection() {
            this.sortDirection === sortDirections.DESC
                ? (this.sortDirection = sortDirections.ASC)
                : (this.sortDirection = sortDirections.DESC);
        },

        clearFilterUrl() {
            this.$router.replace({
                path: this.$route.path,
            });
        },
    },

    beforeRouteEnter(to, from, next) {
        try {
            $store.dispatch(`${CABINET_MODULE_PATH}/${FETCH_CABINET_DATA}`)
        } catch (error) {
            $logger.error(error);
        }

        function proceed() {
            if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][REFERRAL_MODULE]) {
                const {
                    fullPath,
                    query: {
                        page = DEFAULT_PAGE,
                        orderField = referralOrderSortFields.NAME,
                        orderDirection = sortDirections.DESC,
                        orderFilterField,
                    },
                } = to;
                const { loadPath } = $store.state[PROFILE_MODULE][REFERRAL_MODULE];

                const date = getOrderFilterDate(orderFilterField);

                if (loadPath === fullPath) next();
                else {
                    $progress.start();
                    $store
                        .dispatch(`${REFERRAL_MODULE_PATH}/${FETCH_REFERRAL_DATA}`, {
                            page,
                            orderField,
                            orderDirection,
                            orderFilterField,
                            date,
                        })
                        .then(() => {
                            $store.dispatch(`${REFERRAL_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                            next((vm) => {
                                $progress.finish();
                                vm.setOrderFilterValue(orderFilterField);
                                vm.setSortValue(orderField);
                            });
                        })
                        .catch(() => {
                            $progress.fail();
                            next();
                        });
                }
            }
        }

        if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][REFERRAL_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[PROFILE_MODULE][REFERRAL_MODULE],
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

        const {
            query: {
                page = DEFAULT_PAGE,
                orderField = referralOrderSortFields.NAME,
                orderDirection = sortDirections.DESC,
                orderFilterField,
            },
        } = to;

        const date = getOrderFilterDate(orderFilterField);

        try {
            this.$progress.start();
            await this[FETCH_ORDERS]({
                page,
                orderField,
                orderDirection,
                showMore: this.showMore,
                orderFilterField,
                date,
            });
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }

        this.showMore = false;
    },

    beforeMount() {
        const { orderFilterField, orderField, orderDirection } = this.$route.query;
        this.setOrderFilterValue(orderFilterField);
        this.setSortValue(orderField);
        if (orderDirection === 'desc') this.sortDirection = orderDirection;
        // this.sortFields = sortFields;
        // this.sortDirections = sortDirections;
        // this.orderPaymentStatus = orderPaymentStatus;
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
