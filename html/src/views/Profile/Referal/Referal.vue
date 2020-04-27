<template>
    <section class="section referal-view">
        <h2 class="referal-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <div class="referal-view__panels" v-if="referralData">
            <div class="referal-view__panel">
                <div class="referal-view__panel-item">
                    <div class="text-grey referal-view__panel-name">Ваш уровень</div>
                    <div class="referal-view__panel-level">{{ levelData.currentLevelName }}</div>
                </div>
                <div class="referal-view__panel-item">
                    <div class="text-grey referal-view__panel-name">Следующий уровень</div>
                    <div class="text-grey referal-view__panel-level">{{ levelData.nextLevelName }}</div>
                </div>

                <a class="referal-view__panel-link">Подробнее о реферальной программе</a>
            </div>
            <div class="referal-view__panel">
                <div class="referal-view__panel-item">
                    <div class="referal-view__panel-item-counter">
                        <v-arc-counter
                            v-bind="arcSettings"
                            :text="referralArcData.current"
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
                            :text="formatArcSum(sumArcData.current)"
                            :active-count="sumArcData.currentPercent"
                        />
                        <div class="text-grey referal-view__panel-item-label">
                            <span>0</span>
                            <span>{{ shortNumberFormat(sumArcData.next) }}</span>
                        </div>
                    </div>
                    <div class="text-grey">Сумма заказов</div>
                </div>
            </div>
        </div>

        <section class="referal-view__section referal-view__graph">
            <h3 class="container container--tablet-lg referal-view__section-hl">Новые рефералы</h3>
            <v-chart v-if="isMounted" type="line" :options="chartOptions" :series="series" height="350px" />
        </section>

        <div class="container container--tablet-lg">
            <section class="referal-view__section">
                <h3 class="referal-view__section-hl">История заказов реферала</h3>

                <table class="referal-view__table" v-if="!isTabletLg">
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
                            <th class="referal-view__table-th">Товар</th>
                            <th class="referal-view__table-th">Кол-во</th>
                            <th class="referal-view__table-th">ID реферала</th>
                            <th class="referal-view__table-th">Источник</th>
                            <th class="referal-view__table-th">Дата заказа</th>
                            <th class="referal-view__table-th">Сумма</th>
                            <th class="referal-view__table-th">Сумма вознаграждения</th>
                        </tr>
                    </thead>

                    <transition-group class="referal-view__table-body" tag="tbody" name="fade-in" appear>
                        <tr class="referal-view__table-tr" v-for="order in orders" :key="order.id">
                            <td class="referal-view__table-td">
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
                                    {{ order.name }}
                                </div>
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
                                {{ order.source }}
                            </td>
                            <td class="referal-view__table-td">{{ order.date }}</td>
                            <td class="referal-view__table-td">
                                <price v-bind="order.price_product" />
                            </td>
                            <td class="referal-view__table-td">
                                <price v-bind="order.price_commission" />
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </section>

            <filter-button class="referal-view__filter-btn" @click="filterModal = !filterModal">
                Фильтр и сортировка&nbsp;&nbsp;
                <span class="text-grey">4</span>
            </filter-button>
        </div>

        <ul class="referal-view__list" v-if="isTabletLg">
            <li class="referal-view__list-item" v-for="order in orders" :key="order.id">
                <info-row class="referal-view__list-item-row" name="Товар">
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
                        {{ order.name }}
                    </div>
                </info-row>
                <info-row class="referal-view__list-item-row" name="Кол-во"> {{ order.qty }} шт. </info-row>
                <info-row class="referal-view__list-item-row" name="ID реферала">
                    <router-link :to="{ name: 'ReferalOrderDetails', params: { referalId: order.customer_id } }">
                        {{ order.customer_id }}
                    </router-link>
                </info-row>
                <info-row class="referal-view__list-item-row" name="Источник" :value="order.source" />
                <info-row class="referal-view__list-item-row" name="Дата заказа" :value="order.date" />
                <info-row class="referal-view__list-item-row" name="Сумма">
                    <price v-bind="order.price_product" />
                </info-row>
                <info-row class="referal-view__list-item-row" name="Сумма вознаграждения">
                    <price v-bind="order.price_commission" />
                </info-row>
            </li>
        </ul>

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
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VArcCounter from '@controls/VArcCounter/VArcCounter.vue';

import Price from '@components/Price/Price.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import FilterButton from '@components/FilterButton/FilterButton.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

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
} from '@store/modules/Profile/modules/Referral/getters';

import { fileExtension, sortDirections } from '@enums';
import { referralOrderSortFields } from '@enums/profile';
import { DEFAULT_PAGE } from '@constants';
import { digit2DateSettings } from '@settings';
import { baseChartOptions } from '@settings/profile';
import { preparePrice, shortNumberFormat } from '@util';
import { generatePictureSourcePath } from '@util/file';
import { $store, $progress, $logger } from '@services';
import '@images/sprites/logo.svg';
import './Referal.css';

const REFERRAL_MODULE_PATH = `${PROFILE_MODULE}/${REFERRAL_MODULE}`;
const VChart = () => import(/* webpackChunkName: "v-chart" */ '@controls/VChart/VChart.vue');

export default {
    name: 'referal',

    components: {
        VSvg,
        VButton,
        VPicture,
        VPagination,
        VArcCounter,
        VChart,

        Price,
        InfoRow,
        FilterButton,
        ShowMoreButton,
    },

    data() {
        return {
            isMounted: false,
            showMore: false,

            chartOptions: {
                ...baseChartOptions,
            },

            series: [
                {
                    name: 'Новые рефералы',
                    data: [
                        [1, 5],
                        [2, 8],
                        [3, 7],
                        [4, 21],
                        [5, 15],
                        [6, 12],
                        [7, 13],
                        [8, 12],
                        [9, 3],
                        [10, 5],
                        [11, 24],
                        [12, null],
                    ],
                },
            ],
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(REFERRAL_MODULE_PATH, [ITEMS, ACTIVE_PAGE, REFERRAL_DATA]),
        ...mapGetters(REFERRAL_MODULE_PATH, [REFERRAL_ARC_DATA, SUM_ARC_DATA, LEVEL_DATA, PAGES_COUNT]),

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

        orders() {
            const items = this[ITEMS] || [];

            return items.map(i => {
                const desktopImage = i.image && generatePictureSourcePath(40, 40, i.image.id, fileExtension.image.WEBP);
                const defaultImage = i.image && generatePictureSourcePath(40, 40, i.image.id);
                const date =
                    i.order_date && new Date(i.order_date).toLocaleDateString(this[LOCALE], digit2DateSettings);

                return {
                    ...i,
                    qty: Number(i.qty),
                    date,
                    defaultImage,
                    desktopImage,
                };
            });
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    watch: {},

    methods: {
        ...mapActions(REFERRAL_MODULE_PATH, [FETCH_REFERRAL_DATA, FETCH_ORDERS, SET_LOAD_PATH]),

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
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page } });
        },

        formatArcSum(sum) {
            return `${preparePrice(sum)} ₽`;
        },

        shortNumberFormat(sum) {
            return shortNumberFormat(sum);
        },
    },

    async serverPrefetch() {
        try {
            const {
                fullPath,
                query: {
                    page = DEFAULT_PAGE,
                    orderField = referralOrderSortFields.NAME,
                    orderDirection = sortDirections.DESC,
                },
            } = this.$route;

            await this[FETCH_REFERRAL_DATA]({ page, orderField, orderDirection });
            this[SET_LOAD_PATH](fullPath);
        } catch (error) {
            $logger.error(error);
        }
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            query: {
                page = DEFAULT_PAGE,
                orderField = referralOrderSortFields.NAME,
                orderDirection = sortDirections.DESC,
            },
        } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][REFERRAL_MODULE];

        if (loadPath === fullPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${REFERRAL_MODULE_PATH}/${FETCH_REFERRAL_DATA}`, { page, orderField, orderDirection })
                .then(() => {
                    next(vm => {
                        $progress.finish();
                    });
                })
                .catch(thrown => {
                    $progress.fail();
                    next();
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
            fullPath,
            query: {
                page = DEFAULT_PAGE,
                orderField = referralOrderSortFields.NAME,
                orderDirection = sortDirections.DESC,
            },
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
        // this.sortFields = sortFields;
        // this.sortDirections = sortDirections;
        // this.orderPaymentStatus = orderPaymentStatus;
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
