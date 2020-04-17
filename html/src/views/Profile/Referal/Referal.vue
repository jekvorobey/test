<template>
    <section class="section referal-view">
        <h2 class="referal-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <div class="referal-view__panels">
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
                            <th class="referal-view__table-th">Количество</th>
                            <th class="referal-view__table-th">ID реферала</th>
                            <th class="referal-view__table-th">Источник</th>
                            <th class="referal-view__table-th">Дата заказа</th>
                            <th class="referal-view__table-th">Сумма</th>
                            <th class="referal-view__table-th">Сумма вознаграждения</th>
                        </tr>
                    </thead>

                    <transition-group tag="tbody" name="fade-in" appear class="referal-view__table-body">
                        <tr class="referal-view__table-tr" v-for="order in orders" :key="order.id">
                            <td class="referal-view__table-td">
                                <div class="referal-view__table-img">
                                    <img :src="order.image" />
                                </div>
                                <div class="referal-view__table-title">
                                    {{ order.title }}
                                </div>
                            </td>
                            <td class="referal-view__table-td">{{ order.qty }} шт</td>
                            <td class="referal-view__table-td">{{ order.source }}</td>
                            <td class="referal-view__table-td">{{ order.referalId }}</td>
                            <td class="referal-view__table-td">{{ order.date }}</td>
                            <td class="referal-view__table-td">
                                <price v-bind="order.price" />
                            </td>
                            <td class="referal-view__table-td">
                                <price v-bind="order.refund" />
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
                    <div class="referal-view__table-img">
                        <img :src="order.image" width="40" height="40" />
                    </div>
                    <div class="referal-view__table-title">
                        {{ order.title }}
                    </div>
                </info-row>
                <info-row class="referal-view__list-item-row" name="Кол-во"> {{ order.qty }} шт. </info-row>
                <info-row class="referal-view__list-item-row" name="ID реферала" :value="order.referalId" />
                <info-row class="referal-view__list-item-row" name="Источник" :value="order.source" />
                <info-row class="referal-view__list-item-row" name="Дата заказа" :value="order.date" />
                <info-row class="referal-view__list-item-row" name="Сумма">
                    <price v-bind="order.price" />
                </info-row>
                <info-row class="referal-view__list-item-row" name="Сумма вознаграждения">
                    <price v-bind="order.refund" />
                </info-row>
            </li>
        </ul>

        <div class="container container--tablet-lg referal-view__controls">
            <show-more-button btn-class="btn--outline referal-view__controls-btn">
                Показать ещё
            </show-more-button>
            <v-pagination v-model="page" :page-count="10" />
        </div>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VArcCounter from '@controls/VArcCounter/VArcCounter.vue';

import Price from '@components/Price/Price.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import FilterButton from '@components/FilterButton/FilterButton.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import referalProduct1 from '@images/mock/referalProduct1.png';
import referalProduct2 from '@images/mock/referalProduct2.png';
import referalProduct3 from '@images/mock/referalProduct3.png';

import { mapActions, mapGetters, mapState } from 'vuex';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as REFERRAL_MODULE } from '@store/modules/Profile/modules/Referral';
import { FETCH_REFERRAL_DATA } from '@store/modules/Profile/modules/Referral/actions';
import { REFERRAL_ARC_DATA, SUM_ARC_DATA, LEVEL_DATA } from '@store/modules/Profile/modules/Referral/getters';

import { preparePrice, shortNumberFormat } from '@util';
import { $store, $progress, $logger } from '@services';
import { baseChartOptions } from '@settings/profile';
import './Referal.css';

const REFERRAL_MODULE_PATH = `${PROFILE_MODULE}/${REFERRAL_MODULE}`;
const VChart = () => import(/* webpackChunkName: "v-chart" */ '@controls/VChart/VChart.vue');

export default {
    name: 'referal',

    components: {
        VButton,
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
            page: 1,
            isMounted: false,
            referalProduct1,
            referalProduct2,
            referalProduct3,

            chartOptions: {
                ...baseChartOptions,
            },

            orders: [
                {
                    id: 1,
                    referalId: 154,
                    image: referalProduct1,
                    title: "Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая",
                    qty: 1,
                    source: 'Реферальная ссылка',
                    date: '16.08.19',
                    price: {
                        value: 2789,
                        currency: 'RUB',
                    },
                    refund: {
                        value: 278,
                        currency: 'RUB',
                    },
                },
                {
                    id: 2,
                    referalId: 154,
                    image: referalProduct2,
                    title: 'Matrix Спрей для укладки волос Total results Wonder boost, 250 мл',
                    qty: 2,
                    source: 'Промокод SOKOLOV',
                    date: '16.08.19',
                    price: {
                        value: 2789,
                        currency: 'RUB',
                    },
                    refund: {
                        value: 278,
                        currency: 'RUB',
                    },
                },
                {
                    id: 3,
                    referalId: 469,
                    image: referalProduct3,
                    title: "Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая",
                    qty: 1,
                    source: 'Реферальная ссылка',
                    date: '16.08.19',
                    price: {
                        value: 1349,
                        currency: 'RUB',
                    },
                    refund: {
                        value: 145,
                        currency: 'RUB',
                    },
                },
            ],

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
        ...mapGetters(REFERRAL_MODULE_PATH, [REFERRAL_ARC_DATA, SUM_ARC_DATA, LEVEL_DATA]),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    watch: {},

    methods: {
        ...mapActions(REFERRAL_MODULE_PATH, [FETCH_REFERRAL_DATA]),

        formatArcSum(sum) {
            return `${preparePrice(sum)} ₽`;
        },

        shortNumberFormat(sum) {
            return shortNumberFormat(sum);
        },
    },

    async serverPrefetch() {
        try {
            return await this[FETCH_REFERRAL_DATA](this.$isServer);
        } catch (error) {
            $logger.error(error);
        }
    },

    beforeRouteEnter(to, from, next) {
        const { load } = $store.state[PROFILE_MODULE][REFERRAL_MODULE];

        $progress.start();
        $store
            .dispatch(`${REFERRAL_MODULE_PATH}/${FETCH_REFERRAL_DATA}`)
            .then(() => {
                next(vm => {
                    $progress.finish();
                });
            })
            .catch(thrown => {
                $progress.fail();
                next();
            });
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
