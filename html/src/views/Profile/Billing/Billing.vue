<template>
    <section class="section billing-view">
        <div class="billing-view__header">
            <h2 class="billing-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <v-select
                class="billing-view__sort"
                v-model="selectedSortType"
                :options="sortTypes"
                :searchable="false"
                :show-labels="false"
            />
        </div>

        <table class="billing-view__table">
            <colgroup>
                <col width="35%" />
                <col width="25%" />
                <col width="25%" />
                <col width="15%" />
            </colgroup>
            <thead class="billing-view__table-head">
                <tr class="billing-view__table-tr billing-view__table-tr--header">
                    <th class="billing-view__table-th">Заказ/событие</th>
                    <th class="billing-view__table-th">Дата</th>
                    <th class="billing-view__table-th">Операция</th>
                    <th class="billing-view__table-th">Начислено</th>
                </tr>
            </thead>
            <transition-group tag="tbody" name="fade-in" appear class="billing-view__table-body">
                <tr class="billing-view__table-tr" key="1">
                    <td class="billing-view__table-td">15487654</td>
                    <td class="billing-view__table-td">18 августа 2019</td>
                    <td class="billing-view__table-td">Оплата заказа</td>
                    <td class="billing-view__table-td">– 1 463 ₽</td>
                </tr>
                <tr class="billing-view__table-tr" key="2">
                    <td class="billing-view__table-td">15487654</td>
                    <td class="billing-view__table-td">15 августа 2019</td>
                    <td class="billing-view__table-td">Оплата заказа</td>
                    <td class="billing-view__table-td">– 4 780 ₽</td>
                </tr>
                <tr class="billing-view__table-tr" key="3">
                    <td class="billing-view__table-td">15487654</td>
                    <td class="billing-view__table-td">9 августа 2019</td>
                    <td class="billing-view__table-td">Вывод средств</td>
                    <td class="billing-view__table-td">– 5 000 ₽</td>
                </tr>
                <tr class="billing-view__table-tr" key="4">
                    <td class="billing-view__table-td">15487488</td>
                    <td class="billing-view__table-td">15 августа 2019</td>
                    <td class="billing-view__table-td">Начисление вознаграждения</td>
                    <td class="billing-view__table-td">+ 6 880 ₽</td>
                </tr>
                <tr class="billing-view__table-tr" key="5">
                    <td class="billing-view__table-td">15487364</td>
                    <td class="billing-view__table-td">27 июля 2019</td>
                    <td class="billing-view__table-td">Начисление вознаграждения</td>
                    <td class="billing-view__table-td">+ 7 888 ₽</td>
                </tr>
            </transition-group>
        </table>

        <div class="billing-view__controls">
            <v-button class="btn--outline billing-view__controls-btn">
                Показать ещё
            </v-button>
            <v-pagination v-model="page" :page-count="10" />
        </div>
    </section>
</template>

<script>
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VSelect from '../../../components/controls/VSelect/VSelect.vue';
import VPagination from '../../../components/controls/VPagination/VPagination.vue';

import './Billing.css';

export default {
    name: 'billing',

    components: {
        VLink,
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
        };
    },

    computed: {},

    watch: {},

    methods: {},
};
</script>
