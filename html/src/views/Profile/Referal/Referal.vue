<template>
    <section class="section referal-view">
        <h2 class="referal-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <div class="referal-view__panels">
            <div class="referal-view__panel">
                <div class="referal-view__panel-item">
                    <div class="text-grey referal-view__panel-name">Ваш уровень</div>
                    <div class="referal-view__panel-level">Золотой</div>
                </div>
                <div class="referal-view__panel-item">
                    <div class="text-grey referal-view__panel-name">Следующий уровень</div>
                    <div class="text-grey referal-view__panel-level">Платиновый</div>
                </div>

                <a class="referal-view__panel-link">Подробнее о реферальной программе</a>
            </div>
            <div class="referal-view__panel">
                <div class="referal-view__panel-item">
                    <div class="referal-view__panel-item-counter">
                        <v-arc-counter
                            stroke="#BDBDBD"
                            activeStroke="#141116"
                            text="23"
                            :start="-120"
                            :end="120"
                            :activeWidth="16"
                            :strokeWidth="16"
                            :dashCount="30"
                            :activeCount="23"
                        />
                        <div class="text-grey referal-view__panel-item-label">
                            <span>0</span>
                            <span>30</span>
                        </div>
                    </div>
                    <div class="text-grey">Новых рефералов</div>
                </div>
                <div class="referal-view__panel-item">
                    <div class="referal-view__panel-item-counter">
                        <v-arc-counter
                            stroke="#BDBDBD"
                            activeStroke="#141116"
                            text="750 860 ₽"
                            :start="-120"
                            :end="120"
                            :activeWidth="16"
                            :strokeWidth="16"
                            :dashCount="10"
                            :activeCount="7"
                        />
                        <div class="text-grey referal-view__panel-item-label">
                            <span>0</span>
                            <span>1 млн</span>
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
            <v-button class="btn--outline referal-view__controls-btn">
                Показать ещё
            </v-button>
            <v-pagination v-model="page" :page-count="10" />
        </div>
    </section>
</template>

<script>
import VButton from '../../../components/controls/VButton/VButton.vue';
import VPagination from '../../../components/controls/VPagination/VPagination.vue';
import VArcCounter from '../../../components/controls/VArcCounter/VArcCounter.vue';

import Price from '../../../components/Price/Price.vue';
import InfoRow from '../../../components/profile/InfoRow/InfoRow.vue';
import FilterButton from '../../../components/FilterButton/FilterButton.vue';

import referalProduct1 from '../../../assets/images/mock/referalProduct1.png';
import referalProduct2 from '../../../assets/images/mock/referalProduct2.png';
import referalProduct3 from '../../../assets/images/mock/referalProduct3.png';

import { baseChartOptions } from '../../../assets/scripts/enums';
import './Referal.css';

const VChart = () => import(/* webpackChunkName: "v-chart" */ '../../../components/controls/VChart/VChart.vue');

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
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    watch: {},

    methods: {
        onImageChanged(image) {},
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
