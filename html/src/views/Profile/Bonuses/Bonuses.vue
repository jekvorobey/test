<template>
    <section class="section bonuses-view">
        <h2 class="bonuses-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <div class="bonuses-view__panel">
            <div class="bonuses-view__panel-col">
                <div class="text-grey bonuses-view__panel-label">Ваши бонусы</div>
                <div class="text-bold bonuses-view__panel-count">1 587</div>
            </div>
            <div class="bonuses-view__panel-col">
                <div class="text-grey bonuses-view__panel-label">Ближайшее сгорание: 9 сентября 2019</div>
                <div class="text-medium bonuses-view__panel-burn">238 бонусов</div>
            </div>
            <div class="bonuses-view__panel-col">
                <div class="text-bold bonuses-view__panel-amount">1 бонус = 1 рубль</div>
                <div>
                    <router-link to="/">Подробнее о бонусной программе</router-link>
                </div>
            </div>
        </div>

        <section class="bonuses-view__section">
            <h3 class="bonuses-view__section-hl">Бонусная программа</h3>
            <table class="bonuses-view__table">
                <colgroup>
                    <col width="35%" />
                    <col width="20%" />
                    <col width="15%" />
                    <col width="30%" />
                </colgroup>
                <thead class="bonuses-view__table-head">
                    <tr class="bonuses-view__table-tr bonuses-view__table-tr--header">
                        <th class="bonuses-view__table-th">Заказ/событие</th>
                        <th class="bonuses-view__table-th">Списано всего<br />30 749</th>
                        <th class="bonuses-view__table-th">Начислено всего<br />32 336</th>
                        <th class="bonuses-view__table-th">Дата</th>
                    </tr>
                </thead>
                <transition-group tag="tbody" name="fade-in" appear class="bonuses-view__table-body">
                    <tr class="bonuses-view__table-tr" key="1">
                        <td class="bonuses-view__table-td">15487654</td>
                        <td class="bonuses-view__table-td">499</td>
                        <td class="bonuses-view__table-td">1 463</td>
                        <td class="bonuses-view__table-td">18 августа 2019</td>
                    </tr>
                    <tr class="bonuses-view__table-tr" key="2">
                        <td class="bonuses-view__table-td">Промоакция</td>
                        <td class="bonuses-view__table-td"></td>
                        <td class="bonuses-view__table-td">500</td>
                        <td class="bonuses-view__table-td">15 августа 2019</td>
                    </tr>
                    <tr class="bonuses-view__table-tr" key="3">
                        <td class="bonuses-view__table-td">Сгорание</td>
                        <td class="bonuses-view__table-td">154</td>
                        <td class="bonuses-view__table-td"></td>
                        <td class="bonuses-view__table-td">9 августа 2019</td>
                    </tr>
                </transition-group>
            </table>
        </section>

        <div class="bonuses-view__controls">
            <v-button class="btn--outline bonuses-view__controls-btn">
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
import VPagination from '../../../components/controls/VPagination/VPagination.vue';

import './Bonuses.css';

export default {
    name: 'bonuses',

    components: {
        VLink,
        VButton,
        VInput,
        VPagination,
    },

    data() {
        return {
            page: 1,
        };
    },

    computed: {},

    watch: {},

    methods: {},
};
</script>