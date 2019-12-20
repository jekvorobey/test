<template>
    <section class="section referal-view">
        <h2 class="referal-view__hl">Реферальная программа</h2>
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

                <a>Подробнее о реферальной программе</a>
            </div>
            <div class="referal-view__panel">
                <div class="referal-view__panel-item">
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
                    <div class="text-grey">Новых рефералов</div>
                </div>
                <div class="referal-view__panel-item">
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
                    <div class="text-grey">Сумма заказов</div>
                </div>
            </div>
        </div>

        <div class="referal-view__graph">
            <img :src="graph" alt="" />
        </div>

        <section class="referal-view__section">
            <h3 class="referal-view__section-hl">Заказы рефералов</h3>
            <table class="referal-view__table">
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
                    <tr class="referal-view__table-tr" key="1">
                        <td class="referal-view__table-td">
                            <div class="referal-view__table-img">
                                <img :src="referalProduct1" />
                            </div>
                            <div class="referal-view__table-title">
                                Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая
                            </div>
                        </td>
                        <td class="referal-view__table-td">2 шт</td>
                        <td class="referal-view__table-td">154</td>
                        <td class="referal-view__table-td">Промокод SOKOLOV</td>
                        <td class="referal-view__table-td">18.08.19</td>
                        <td class="referal-view__table-td">3 374 ₽</td>
                        <td class="referal-view__table-td">337 ₽</td>
                    </tr>

                    <tr class="referal-view__table-tr" key="2">
                        <td class="referal-view__table-td">
                            <div class="referal-view__table-img">
                                <img :src="referalProduct2" />
                            </div>
                            <div class="referal-view__table-title">
                                Matrix Спрей для укладки волос Total results Wonder boost, 250 мл
                            </div>
                        </td>
                        <td class="referal-view__table-td">1 шт</td>
                        <td class="referal-view__table-td">154</td>
                        <td class="referal-view__table-td">Промокод SOKOLOV</td>
                        <td class="referal-view__table-td">17.08.19</td>
                        <td class="referal-view__table-td">1 124 ₽</td>
                        <td class="referal-view__table-td">112 ₽</td>
                    </tr>

                    <tr class="referal-view__table-tr" key="3">
                        <td class="referal-view__table-td">
                            <div class="referal-view__table-img">
                                <img :src="referalProduct3" />
                            </div>
                            <div class="referal-view__table-title">
                                Лосьон для волос Matrix Total Results Keep Me Vivid Color Velvetizer 100 мл
                            </div>
                        </td>
                        <td class="referal-view__table-td">3 шт</td>
                        <td class="referal-view__table-td">469</td>
                        <td class="referal-view__table-td">Реферальная ссылка</td>
                        <td class="referal-view__table-td">16.08.19</td>
                        <td class="referal-view__table-td">2 789 ₽</td>
                        <td class="referal-view__table-td">278 ₽</td>
                    </tr>
                </transition-group>
            </table>
        </section>

        <div class="referal-view__controls">
            <v-button class="btn--outline referal-view__controls-btn">
                Показать ещё
            </v-button>
            <v-pagination :value="1" :page-count="10" />
        </div>
    </section>
</template>

<script>
import VButton from '../../../components/controls/VButton/VButton.vue';
import VPagination from '../../../components/controls/VPagination/VPagination.vue';
import VArcCounter from '../../../components/controls/VArcCounter/VArcCounter.vue';

import referalProduct1 from '../../../assets/images/mock/referalProduct1.png';
import referalProduct2 from '../../../assets/images/mock/referalProduct2.png';
import referalProduct3 from '../../../assets/images/mock/referalProduct3.png';
import graph from '../../../assets/images/mock/graph.png';
import referalGroup1 from '../../../assets/images/mock/referalGroup1.png';
import referalGroup2 from '../../../assets/images/mock/referalGroup2.png';
import './Referal.css';

export default {
    name: 'referal',

    components: {
        VButton,
        VPagination,
        VArcCounter,
    },

    data() {
        return {
            graph,
            referalGroup1,
            referalGroup2,
            referalProduct1,
            referalProduct2,
            referalProduct3,
        };
    },

    computed: {},

    watch: {},

    methods: {
        onImageChanged(image) {},
    },

    beforeRouteEnter(to, from, next) {
        next();
    },

    beforeRouteUpdate(to, from, next) {
        next();
    },

    beforeMount() {},
};
</script>
