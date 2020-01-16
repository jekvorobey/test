<template>
    <section class="section referal-orders-view">
        <h2 class="referal-orders-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <section class="referal-orders-view__section">
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

            <table class="referal-orders-view__table">
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
                        <th class="referal-orders-view__table-th">Количество</th>
                        <th class="referal-orders-view__table-th">ID реферала</th>
                        <th class="referal-orders-view__table-th">Источник</th>
                        <th class="referal-orders-view__table-th">Дата заказа</th>
                        <th class="referal-orders-view__table-th">Сумма</th>
                        <th class="referal-orders-view__table-th">Сумма вознаграждения</th>
                    </tr>
                </thead>
                <transition-group tag="tbody" name="fade-in" appear class="referal-orders-view__table-body">
                    <tr class="referal-orders-view__table-tr" key="1">
                        <td class="referal-orders-view__table-td">
                            <div class="referal-orders-view__table-img">
                                <img :src="referalProduct1" />
                            </div>
                            <div class="referal-orders-view__table-title">
                                Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая
                            </div>
                        </td>
                        <td class="referal-orders-view__table-td">2 шт</td>
                        <td class="referal-orders-view__table-td">154</td>
                        <td class="referal-orders-view__table-td">Промокод SOKOLOV</td>
                        <td class="referal-orders-view__table-td">18.08.19</td>
                        <td class="referal-orders-view__table-td">3 374 ₽</td>
                        <td class="referal-orders-view__table-td">337 ₽</td>
                    </tr>

                    <tr class="referal-orders-view__table-tr" key="2">
                        <td class="referal-orders-view__table-td">
                            <div class="referal-orders-view__table-img">
                                <img :src="referalProduct2" />
                            </div>
                            <div class="referal-orders-view__table-title">
                                Matrix Спрей для укладки волос Total results Wonder boost, 250 мл
                            </div>
                        </td>
                        <td class="referal-orders-view__table-td">1 шт</td>
                        <td class="referal-orders-view__table-td">154</td>
                        <td class="referal-orders-view__table-td">Промокод SOKOLOV</td>
                        <td class="referal-orders-view__table-td">17.08.19</td>
                        <td class="referal-orders-view__table-td">1 124 ₽</td>
                        <td class="referal-orders-view__table-td">112 ₽</td>
                    </tr>

                    <tr class="referal-orders-view__table-tr" key="3">
                        <td class="referal-orders-view__table-td">
                            <div class="referal-orders-view__table-img">
                                <img :src="referalProduct3" />
                            </div>
                            <div class="referal-orders-view__table-title">
                                Лосьон для волос Matrix Total Results Keep Me Vivid Color Velvetizer 100 мл
                            </div>
                        </td>
                        <td class="referal-orders-view__table-td">3 шт</td>
                        <td class="referal-orders-view__table-td">469</td>
                        <td class="referal-orders-view__table-td">Реферальная ссылка</td>
                        <td class="referal-orders-view__table-td">16.08.19</td>
                        <td class="referal-orders-view__table-td">2 789 ₽</td>
                        <td class="referal-orders-view__table-td">278 ₽</td>
                    </tr>
                </transition-group>
            </table>
        </section>

        <div class="referal-orders-view__controls">
            <v-button class="btn--outline referal-orders-view__controls-btn">
                Показать ещё
            </v-button>
            <v-pagination v-model="page" :page-count="10" />
        </div>
    </section>
</template>

<script>
import VButton from '../../../components/controls/VButton/VButton.vue';
import VSelect from '../../../components/controls/VSelect/VSelect.vue';
import VPagination from '../../../components/controls/VPagination/VPagination.vue';

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
    },

    data() {
        const sortTypes = ['Всё время'];

        return {
            page: 1,
            selectedSortType: sortTypes[0],
            sortTypes,
            referalProduct1,
            referalProduct2,
            referalProduct3,
        };
    },

    computed: {},

    watch: {},

    methods: {
        onOpenOrder(id) {
            this.$router.push({ name: 'ReferalOrderDetails', params: { referalId: id } });
        },
    },
};
</script>
