<template>
    <section class="section orders-view">
        <h2 class="orders-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <table class="orders-view__table">
            <colgroup>
                <col width="20%" />
                <col width="15%" />
                <col width="20%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
            </colgroup>
            <thead class="orders-view__table-head">
                <tr class="orders-view__table-tr orders-view__table-tr--header">
                    <th class="orders-view__table-th">
                        <v-link tag="button" class="orders-view__table-th-link">
                            Номер заказа&nbsp;<v-svg name="arrow-updown" width="16" height="16" />
                        </v-link>
                    </th>
                    <th class="orders-view__table-th">
                        <v-link tag="button" class="orders-view__table-th-link">
                            Дата заказа&nbsp;<v-svg name="arrow-updown" width="16" height="16" />
                        </v-link>
                    </th>
                    <th class="orders-view__table-th">
                        <v-link tag="button" class="orders-view__table-th-link">
                            Дата доставки&nbsp;<v-svg name="arrow-updown" width="16" height="16" />
                        </v-link>
                    </th>
                    <th class="orders-view__table-th">
                        Сумма
                    </th>
                    <th class="orders-view__table-th">
                        <v-link tag="button" class="orders-view__table-th-link">
                            Статус заказа&nbsp;<v-svg name="arrow-updown" width="16" height="16" />
                        </v-link>
                    </th>
                    <th class="orders-view__table-th" />
                </tr>
            </thead>
            <transition-group tag="tbody" name="fade-in" appear class="orders-view__table-body">
                <tr class="orders-view__table-tr" key="1" @click="onOpenOrder(124589524)">
                    <td class="orders-view__table-td">124589524</td>
                    <td class="orders-view__table-td">18.08.2019</td>
                    <td class="orders-view__table-td">20.08.2019</td>
                    <td class="orders-view__table-td">15 780 ₽</td>
                    <td class="orders-view__table-td">
                        <v-button class="btn--outline" @click.stop>Оплатить</v-button>
                    </td>
                    <td class="orders-view__table-td">
                        <v-link class="orders-view__table-td-link" tag="button" @click.stop>Отменить</v-link>
                    </td>
                </tr>
                <tr class="orders-view__table-tr" key="2" @click="onOpenOrder(454654545)">
                    <td class="orders-view__table-td">454654545</td>
                    <td class="orders-view__table-td">27.07.2019</td>
                    <td class="orders-view__table-td">28.07.2019</td>
                    <td class="orders-view__table-td">12 788 ₽</td>
                    <td class="orders-view__table-td">Передан в доставку</td>
                    <td class="orders-view__table-td">
                        <v-link class="orders-view__table-td-link" tag="button" @click.stop>Повторить</v-link>
                    </td>
                </tr>
                <tr class="orders-view__table-tr" key="3" @click="onOpenOrder(24823875)">
                    <td class="orders-view__table-td">24823875</td>
                    <td class="orders-view__table-td">6.07.2019</td>
                    <td class="orders-view__table-td">8.07.2019</td>
                    <td class="orders-view__table-td">25 478 ₽</td>
                    <td class="orders-view__table-td">Доставлен</td>
                    <td class="orders-view__table-td">
                        <v-link class="orders-view__table-td-link" tag="button" @click.stop>Повторить</v-link>
                    </td>
                </tr>
                <tr class="orders-view__table-tr" key="4" @click="onOpenOrder(123547899)">
                    <td class="orders-view__table-td">123547899</td>
                    <td class="orders-view__table-td">6.07.2019</td>
                    <td class="orders-view__table-td">-</td>
                    <td class="orders-view__table-td">22 365 ₽</td>
                    <td class="orders-view__table-td">Отменён</td>
                    <td class="orders-view__table-td">
                        <v-link class="orders-view__table-td-link" tag="button" @click.stop>Повторить</v-link>
                    </td>
                </tr>
            </transition-group>
        </table>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VInput from '../../../components/controls/VInput/VInput.vue';

import '../../../assets/images/sprites/arrow-updown.svg';
import './Orders.css';

export default {
    name: 'orders',

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
    },

    data() {
        return {};
    },

    computed: {},

    watch: {},

    methods: {
        onOpenOrder(id) {
            this.$router.push({ name: 'OrderDetails', params: { orderId: id } });
        },
    },
};
</script>