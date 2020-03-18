<template>
    <section class="section billing-view">
        <div class="container container--tablet-lg billing-view__header">
            <h2 class="billing-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <v-select
                class="billing-view__sort"
                v-model="selectedSortType"
                :options="sortTypes"
                :searchable="false"
                :show-labels="false"
            />
        </div>

        <div class="container container--tablet-lg">
            <table class="billing-view__table" v-if="!isTabletLg">
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
                    <tr class="billing-view__table-tr" v-for="event in events" :key="event.id">
                        <td class="billing-view__table-td">{{ event.eventId }}</td>
                        <td class="billing-view__table-td">{{ event.date }}</td>
                        <td class="billing-view__table-td">{{ event.operation }}</td>
                        <td class="billing-view__table-td">
                            <span v-if="event.delta.minus">-</span>&nbsp;
                            <price v-bind="event.delta" />
                        </td>
                    </tr>
                </transition-group>
            </table>
        </div>

        <ul class="billing-view__list" v-if="isTabletLg">
            <li class="container container--tablet-lg billing-view__list-item" v-for="event in events" :key="event.id">
                <info-row class="billing-view__list-item-row" name="Заказ/событие" :value="event.eventId" />
                <info-row class="billing-view__list-item-row" name="Дата" :value="event.date" />
                <info-row class="billing-view__list-item-row" name="Операция" :value="event.operation" />
                <info-row class="billing-view__list-item-row" name="Начислено/cписано">
                    <span v-if="event.delta.minus">-</span>&nbsp;
                    <price v-bind="event.delta" />
                </info-row>
            </li>
        </ul>

        <div class="container container--tablet-lg billing-view__controls">
            <v-button class="btn--outline billing-view__controls-btn">
                Показать ещё
            </v-button>
            <v-pagination v-model="page" :page-count="10" />
        </div>
    </section>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSelect from '@controls/VSelect/VSelect.vue';
import VPagination from '@controls/VPagination/VPagination.vue';

import Price from '@components/Price/Price.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import './Billing.css';

export default {
    name: 'billing',

    components: {
        VLink,
        VButton,
        VSelect,
        VPagination,

        Price,
        InfoRow,
    },

    data() {
        const sortTypes = ['Всё время'];

        return {
            page: 1,
            selectedSortType: sortTypes[0],
            sortTypes,

            events: [
                {
                    id: 1,
                    eventId: 15487488,
                    date: '18 августа 2019',
                    operation: 'Оплата заказа',
                    delta: {
                        minus: true,
                        value: 1463,
                        currency: 'RUB',
                    },
                },
                {
                    id: 2,
                    eventId: 15487488,
                    date: '15 августа 2019',
                    operation: 'Оплата заказа',
                    delta: {
                        minus: true,
                        value: 4780,
                        currency: 'RUB',
                    },
                },
                {
                    id: 3,
                    eventId: 15487488,
                    date: '9 августа 2019',
                    operation: 'Вывод средств',
                    delta: {
                        minus: true,
                        value: 6880,
                        currency: 'RUB',
                    },
                },
                {
                    id: 4,
                    eventId: 15487364,
                    date: '27 июля 2019',
                    operation: 'Начисление вознаграждения',
                    delta: {
                        value: 7888,
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

    methods: {},
};
</script>
