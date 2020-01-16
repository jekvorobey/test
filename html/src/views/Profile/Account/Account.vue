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
            <h3 class="account-view__section-hl">История начислений</h3>
            <table class="account-view__table">
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
                        <th class="account-view__table-th">Начислено</th>
                    </tr>
                </thead>
                <transition-group tag="tbody" name="fade-in" appear class="account-view__table-body">
                    <tr class="account-view__table-tr" key="1">
                        <td class="account-view__table-td">15487654</td>
                        <td class="account-view__table-td">18 августа 2019</td>
                        <td class="account-view__table-td">Оплата заказа</td>
                        <td class="account-view__table-td">– 1 463 ₽</td>
                    </tr>
                    <tr class="account-view__table-tr" key="2">
                        <td class="account-view__table-td">15487654</td>
                        <td class="account-view__table-td">15 августа 2019</td>
                        <td class="account-view__table-td">Оплата заказа</td>
                        <td class="account-view__table-td">– 4 780 ₽</td>
                    </tr>
                    <tr class="account-view__table-tr" key="3">
                        <td class="account-view__table-td">15487654</td>
                        <td class="account-view__table-td">9 августа 2019</td>
                        <td class="account-view__table-td">Вывод средств</td>
                        <td class="account-view__table-td">– 5 000 ₽</td>
                    </tr>
                    <tr class="account-view__table-tr" key="4">
                        <td class="account-view__table-td">15487488</td>
                        <td class="account-view__table-td">15 августа 2019</td>
                        <td class="account-view__table-td">Начисление вознаграждения</td>
                        <td class="account-view__table-td">+ 6 880 ₽</td>
                    </tr>
                    <tr class="account-view__table-tr" key="5">
                        <td class="account-view__table-td">15487364</td>
                        <td class="account-view__table-td">27 июля 2019</td>
                        <td class="account-view__table-td">Начисление вознаграждения</td>
                        <td class="account-view__table-td">+ 7 888 ₽</td>
                    </tr>
                </transition-group>
            </table>
        </section>

        <div class="account-view__controls">
            <v-button class="btn--outline account-view__controls-btn">
                Показать ещё
            </v-button>
            <v-pagination v-model="page" :page-count="10" />
        </div>
    </section>
</template>

<script>
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VInput from '../../../components/controls/VInput/VInput.vue';
import VSelect from '../../../components/controls/VSelect/VSelect.vue';
import VPagination from '../../../components/controls/VPagination/VPagination.vue';

import './Account.css';

export default {
    name: 'account',

    components: {
        VLink,
        VButton,
        VInput,
        VSelect,
        VPagination,
    },

    data() {
        const cards = ['MasterCard **** 8515', 'VISA **** 5000', 'Добавить новую карту'];

        return {
            page: 1,
            selectedCard: cards[0],
            cards,
        };
    },

    computed: {},

    watch: {},

    methods: {},
};
</script>
