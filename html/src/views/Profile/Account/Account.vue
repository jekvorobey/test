<template>
    <section class="section account-view">
        <h2 class="account-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <div class="account-view__panels">
            <div class="account-view__panel">
                <div class="text-grey">На вашем счете</div>
                <div class="text-bold account-view__panel-count">1 587 ₽</div>
            </div>
            <div class="account-view__panel">
                <div class="account-view__panel-top">
                    <span class="text-bold account-view__panel-top-label">Вывод средств</span>
                    <span class="text-grey account-view__panel-top-notice">
                        Вывод денежных средств осуществляется в срок до 10 календарных дней
                    </span>
                </div>
                <div class="account-view__panel-bottom">
                    <v-select
                        class="account-view__panel-bottom-select"
                        v-model="selectedCard"
                        :options="cards"
                        :searchable="false"
                        :show-labels="false"
                    />
                    <v-input class="account-view__panel-bottom-input" placeholder="Сумма от 0 до 1 587 ₽" />
                    <v-button class="account-view__panel-bottom-btn">
                        Оформить вывод
                    </v-button>
                </div>
            </div>
        </div>

        <section class="account-view__section">
            <div class="container container--tablet-lg">
                <h3 class="account-view__section-hl">История начислений</h3>
                <table class="account-view__table" v-if="!isTabletLg">
                    <colgroup>
                        <col width="35%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="15%" />
                    </colgroup>
                    <thead class="account-view__table-head">
                        <tr class="account-view__table-tr account-view__table-tr--header">
                            <th class="account-view__table-th">Заказ/событие</th>
                            <th class="account-view__table-th">Дата</th>
                            <th class="account-view__table-th">Операция</th>
                            <th class="account-view__table-th">Начислено/cписано</th>
                        </tr>
                    </thead>
                    <transition-group tag="tbody" name="fade-in" appear class="account-view__table-body">
                        <tr class="account-view__table-tr" v-for="event in events" :key="event.id">
                            <td class="account-view__table-td">{{ event.eventId }}</td>
                            <td class="account-view__table-td">{{ event.date }}</td>
                            <td class="account-view__table-td">{{ event.operation }}</td>
                            <td class="account-view__table-td">
                                <span v-if="event.delta.minus">-</span>&nbsp;
                                <price v-bind="event.delta" />
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </div>
        </section>

        <ul class="account-view__list" v-if="isTabletLg">
            <li class="container container--tablet-lg account-view__list-item" v-for="event in events" :key="event.id">
                <info-row class="account-view__list-item-row" name="Заказ/событие" :value="event.eventId" />
                <info-row class="account-view__list-item-row" name="Дата" :value="event.date" />
                <info-row class="account-view__list-item-row" name="Операция" :value="event.operation" />
                <info-row class="account-view__list-item-row" name="Начислено/cписано">
                    <span v-if="event.delta.minus">-</span>&nbsp;
                    <price v-bind="event.delta" />
                </info-row>
            </li>
        </ul>

        <div class="container container--tablet-lg account-view__controls">
            <show-more-button btn-class="btn--outline account-view__controls-btn">
                Показать ещё
            </show-more-button>
            <v-pagination v-model="page" :page-count="10" />
        </div>
    </section>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VSelect from '@controls/VSelect/VSelect.vue';
import VPagination from '@controls/VPagination/VPagination.vue';

import Price from '@components/Price/Price.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import './Account.css';

export default {
    name: 'account',

    components: {
        VLink,
        VButton,
        VInput,
        VSelect,
        VPagination,

        Price,
        InfoRow,
        ShowMoreButton,
    },

    data() {
        const cards = ['MasterCard **** 8515', 'VISA **** 5000', 'Добавить новую карту'];

        return {
            page: 1,
            selectedCard: cards[0],
            cards,
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
