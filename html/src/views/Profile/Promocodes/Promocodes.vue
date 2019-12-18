<template>
    <section class="section promocodes-view">
        <h2 class="promocodes-view__hl">Мои промокоды</h2>

        <table class="promocodes-view__table">
            <colgroup>
                <col width="20%" />
                <col width="25%" />
                <col width="15%" />
                <col width="40%" />
            </colgroup>
            <thead class="promocodes-view__table-head">
                <tr class="promocodes-view__table-tr promocodes-view__table-tr--header">
                    <th class="promocodes-view__table-th">Промокод</th>
                    <th class="promocodes-view__table-th">Срок действия</th>
                    <th class="promocodes-view__table-th">Скидка</th>
                    <th class="promocodes-view__table-th">Категория товаров</th>
                </tr>
            </thead>
            <transition-group tag="tbody" name="fade-in" appear class="promocodes-view__table-body">
                <tr class="promocodes-view__table-tr" key="1">
                    <td class="promocodes-view__table-td">
                        SOKOLOV&nbsp;&nbsp;
                        <button class="promocodes-view__table-btn">
                            <v-svg name="copy" width="16" height="16" />
                        </button>
                    </td>
                    <td class="promocodes-view__table-td">1.07.2019 – 31.08.2019</td>
                    <td class="promocodes-view__table-td">5%</td>
                    <td class="promocodes-view__table-td">Все товары</td>
                </tr>
                <tr class="promocodes-view__table-tr" key="2">
                    <td class="promocodes-view__table-td">
                        SOKOLOV77&nbsp;&nbsp;
                        <button class="promocodes-view__table-btn">
                            <v-svg name="copy" width="16" height="16" />
                        </button>
                    </td>
                    <td class="promocodes-view__table-td">10.07.2019 – 10.08.2019</td>
                    <td class="promocodes-view__table-td">10%</td>
                    <td class="promocodes-view__table-td">
                        Товары для волос Aveda:<br />
                        - Шампуни<br />
                        - Кондиционеры<br />
                        - Маски<br />
                    </td>
                </tr>
            </transition-group>
        </table>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';

import '../../../assets/images/sprites/copy.svg';
import '../../../assets/images/sprites/edit.svg';
import './Promocodes.css';

export default {
    name: 'promocodes',

    components: {
        VSvg,
        VLink,
    },

    data() {
        return {};
    },

    computed: {},

    watch: {},

    methods: {},

    beforeRouteEnter(to, from, next) {
        next();
    },

    beforeRouteUpdate(to, from, next) {
        next();
    },

    beforeMount() {},
};
</script>
