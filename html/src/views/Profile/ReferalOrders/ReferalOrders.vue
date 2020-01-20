<template>
    <section class="section referal-orders-view">
        <h2 class="referal-orders-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <section class="referal-orders-view__section">
            <div class="referal-orders-view__panel">
                <div class="referal-orders-view__panel-col">
                    <div class="text-grey referal-orders-view__panel-label">Заказано товаров за август</div>
                    <div class="text-bold referal-orders-view__panel-count">176</div>
                </div>
                <div class="referal-orders-view__panel-col">
                    <div class="text-grey referal-orders-view__panel-label">
                        Сумма за товары
                    </div>
                    <div class="text-bold referal-orders-view__panel-amount">750 860 ₽</div>
                </div>
                <div class="referal-orders-view__panel-col">
                    <v-button class="btn--outline referal-orders-view__panel-btn">Скачать статистику</v-button>
                    <div class="text-grey text-sm">
                        Получите подробную информацию о заказах, <br />сделанных рефералами
                    </div>
                </div>
            </div>

            <div class="container container--tablet-lg">
                <div class="referal-orders-view__section-header">
                    <h3 class="referal-orders-view__section-hl">История заказов реферала</h3>

                    <v-select
                        class="referal-orders-view__sort"
                        v-model="selectedSortType"
                        :options="sortTypes"
                        :searchable="false"
                        :show-labels="false"
                    />
                </div>

                <filter-button class="referal-orders-view__filter-btn" @click="filterModal = !filterModal">
                    Фильтр и сортировка&nbsp;&nbsp;
                    <span class="text-grey">4</span>
                </filter-button>

                <table class="referal-orders-view__table" v-if="!isTabletLg">
                    <colgroup>
                        <col width="40%" />
                        <col width="12%" />
                        <col width="12%" />
                        <col width="12%" />
                        <col width="12%" />
                        <col width="12%" />
                    </colgroup>
                    <thead class="referal-orders-view__table-head">
                        <tr class="referal-orders-view__table-tr referal-orders-view__table-tr--header">
                            <th class="referal-orders-view__table-th">Товар</th>
                            <th class="referal-orders-view__table-th">Кол-во</th>
                            <th class="referal-orders-view__table-th">ID реферала</th>
                            <th class="referal-orders-view__table-th">Источник</th>
                            <th class="referal-orders-view__table-th">Дата заказа</th>
                            <th class="referal-orders-view__table-th">Сумма</th>
                            <th class="referal-orders-view__table-th">Сумма вознаграждения</th>
                        </tr>
                    </thead>
                    <transition-group tag="tbody" name="fade-in" appear class="referal-orders-view__table-body">
                        <tr class="referal-orders-view__table-tr" v-for="order in orders" :key="order.id">
                            <td class="referal-orders-view__table-td">
                                <div class="referal-orders-view__table-img">
                                    <img :src="order.image" />
                                </div>
                                <div class="referal-orders-view__table-title">
                                    {{ order.title }}
                                </div>
                            </td>
                            <td class="referal-orders-view__table-td">{{ order.qty }} шт</td>
                            <td class="referal-orders-view__table-td">
                                <router-link
                                    :to="{ name: 'ReferalOrderDetails', params: { referalId: order.referalId } }"
                                >
                                    {{ order.referalId }}
                                </router-link>
                            </td>
                            <td class="referal-orders-view__table-td">{{ order.source }}</td>
                            <td class="referal-orders-view__table-td">{{ order.date }}</td>
                            <td class="referal-orders-view__table-td">
                                <price v-bind="order.price" />
                            </td>
                            <td class="referal-orders-view__table-td">
                                <price v-bind="order.refund" />
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </div>

            <ul class="referal-orders-view__list" v-if="isTabletLg">
                <li
                    class="referal-orders-view__list-item"
                    v-for="order in orders"
                    :key="order.id"
                    @click="onOpenOrder(order.referalId)"
                >
                    <info-row class="referal-orders-view__list-item-row" name="Товар">
                        <div class="referal-orders-view__table-img">
                            <img :src="order.image" width="40" height="40" />
                        </div>
                        <div class="referal-orders-view__table-title">
                            {{ order.title }}
                        </div>
                    </info-row>
                    <info-row class="referal-orders-view__list-item-row" name="Кол-во"> {{ order.qty }} шт. </info-row>
                    <info-row class="referal-orders-view__list-item-row" name="ID реферала">
                        <router-link :to="{ name: 'ReferalOrderDetails', params: { referalId: order.referalId } }">
                            {{ order.referalId }}
                        </router-link>
                    </info-row>
                    <info-row class="referal-orders-view__list-item-row" name="Источник" :value="order.source" />
                    <info-row class="referal-orders-view__list-item-row" name="Дата заказа" :value="order.date" />
                    <info-row class="referal-orders-view__list-item-row" name="Сумма">
                        <price v-bind="order.price" />
                    </info-row>
                    <info-row class="referal-orders-view__list-item-row" name="Сумма вознаграждения">
                        <price v-bind="order.refund" />
                    </info-row>
                </li>
            </ul>

            <div class=" container contaiter--tablet-lg referal-orders-view__controls">
                <v-button class="btn--outline referal-orders-view__controls-btn">
                    Показать ещё
                </v-button>
                <v-pagination v-model="page" :page-count="10" />
            </div>
        </section>
    </section>
</template>

<script>
import VButton from '../../../components/controls/VButton/VButton.vue';
import VSelect from '../../../components/controls/VSelect/VSelect.vue';
import VPagination from '../../../components/controls/VPagination/VPagination.vue';

import Price from '../../../components/Price/Price.vue';
import InfoRow from '../../../components/profile/InfoRow/InfoRow.vue';
import FilterButton from '../../../components/FilterButton/FilterButton.vue';
import referalProduct1 from '../../../assets/images/mock/referalProduct1.png';
import referalProduct2 from '../../../assets/images/mock/referalProduct2.png';
import referalProduct3 from '../../../assets/images/mock/referalProduct3.png';

import '../../../assets/images/sprites/arrow-updown.svg';
import './ReferalOrders.css';

export default {
    name: 'referal-orders',

    components: {
        VButton,
        VSelect,
        VPagination,

        FilterButton,
        InfoRow,
        Price,
    },

    data() {
        const sortTypes = ['Всё время'];

        return {
            filterModal: false,
            page: 1,
            selectedSortType: sortTypes[0],
            sortTypes,
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
        };
    },

    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    watch: {},

    methods: {
        onOpenOrder(id) {
            this.$router.push({ name: 'ReferalOrderDetails', params: { referalId: id } });
        },
    },
};
</script>
