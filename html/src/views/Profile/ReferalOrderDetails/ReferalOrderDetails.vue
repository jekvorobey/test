<template>
    <section class="section referal-order-details-view">
        <v-link class="referal-order-details-view__back-link" :to="backUrl">
            <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад к реферальным
            заказам
        </v-link>
        <h2 class="referal-order-details-view__hl">{{ $t('profile.format.referal', { id: referalId }) }}</h2>
        <section class="referal-order-details-view__details">
            <div class="referal-order-details-view__details-info">
                <info-row class="referal-order-details-view__details-row" name="Заказал товаров" value="12" />
                <info-row class="referal-order-details-view__details-row" name="Сумма заказов" value="745 856 ₽" />
                <info-row class="referal-order-details-view__details-row" name="Источник" value="Промокод SOKOLOV" />
                <info-row
                    class="referal-order-details-view__details-row"
                    name="Дата привязки реферала"
                    value="9 августа 2019"
                />
            </div>
        </section>

        <section class="referal-order-details-view__section">
            <div class="referal-order-details-view__section-header">
                <h3 class="referal-order-details-view__section-hl">История заказов реферала</h3>
                <div>
                    <v-check
                        class="referal-order-details-view__section-check"
                        v-for="source in referalSources"
                        v-model="referalSource"
                        name="referal-source"
                        type="radio"
                        :id="`${source.value}-${source.id}`"
                        :key="source.id"
                        :value="source.value"
                    >
                        {{ source.name }}
                    </v-check>
                </div>
            </div>

            <table class="referal-order-details-view__table">
                <colgroup>
                    <col width="40%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                </colgroup>
                <thead class="referal-order-details-view__table-head">
                    <tr class="referal-order-details-view__table-tr referal-order-details-view__table-tr--header">
                        <th class="referal-order-details-view__table-th">Товар</th>
                        <th class="referal-order-details-view__table-th">Кол-во</th>
                        <th class="referal-order-details-view__table-th">Источник</th>
                        <th class="referal-order-details-view__table-th">Дата заказа</th>
                        <th class="referal-order-details-view__table-th">Сумма</th>
                        <th class="referal-order-details-view__table-th">Сумма вознаграждения</th>
                    </tr>
                </thead>
                <transition-group tag="tbody" name="fade-in" appear class="referal-order-details-view__table-body">
                    <tr class="referal-order-details-view__table-tr" key="1">
                        <td class="referal-order-details-view__table-td">
                            <div class="referal-order-details-view__table-img">
                                <img :src="referalProduct1" />
                            </div>
                            <div class="referal-order-details-view__table-title">
                                Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая
                            </div>
                        </td>
                        <td class="referal-order-details-view__table-td">2 шт</td>
                        <td class="referal-order-details-view__table-td">Промокод SOKOLOV</td>
                        <td class="referal-order-details-view__table-td">18.08.19</td>
                        <td class="referal-order-details-view__table-td">3 374 ₽</td>
                        <td class="referal-order-details-view__table-td">337 ₽</td>
                    </tr>

                    <tr class="referal-order-details-view__table-tr" key="2">
                        <td class="referal-order-details-view__table-td">
                            <div class="referal-order-details-view__table-img">
                                <img :src="referalProduct2" />
                            </div>
                            <div class="referal-order-details-view__table-title">
                                Matrix Спрей для укладки волос Total results Wonder boost, 250 мл
                            </div>
                        </td>
                        <td class="referal-order-details-view__table-td">1 шт</td>
                        <td class="referal-order-details-view__table-td">Промокод SOKOLOV</td>
                        <td class="referal-order-details-view__table-td">17.08.19</td>
                        <td class="referal-order-details-view__table-td">1 124 ₽</td>
                        <td class="referal-order-details-view__table-td">112 ₽</td>
                    </tr>

                    <tr class="referal-order-details-view__table-tr" key="3">
                        <td class="referal-order-details-view__table-td">
                            <div class="referal-order-details-view__table-img">
                                <img :src="referalProduct3" />
                            </div>
                            <div class="referal-order-details-view__table-title">
                                Лосьон для волос Matrix Total Results Keep Me Vivid Color Velvetizer 100 мл
                            </div>
                        </td>
                        <td class="referal-order-details-view__table-td">3 шт</td>
                        <td class="referal-order-details-view__table-td">Реферальная ссылка</td>
                        <td class="referal-order-details-view__table-td">16.08.19</td>
                        <td class="referal-order-details-view__table-td">2 789 ₽</td>
                        <td class="referal-order-details-view__table-td">278 ₽</td>
                    </tr>
                </transition-group>
            </table>
        </section>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VCheck from '../../../components/controls/VCheck/VCheck.vue';

import InfoRow from '../../../components/profile/InfoRow/InfoRow.vue';

import { mapActions, mapState } from 'vuex';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';
import { UPDATE_BREADCRUMB } from '../../../store/modules/Profile/actions';

import referalProduct1 from '../../../assets/images/mock/referalProduct1.png';
import referalProduct2 from '../../../assets/images/mock/referalProduct2.png';
import referalProduct3 from '../../../assets/images/mock/referalProduct3.png';
import '../../../assets/images/sprites/arrow-small.svg';
import './ReferalOrderDetails.css';

export default {
    name: 'referal-order-details',

    components: {
        VSvg,
        VLink,
        VCheck,

        InfoRow,
    },

    data() {
        return {
            referalProduct1,
            referalProduct2,
            referalProduct3,
            referalSource: 'all',
            referalSources: [
                { id: 1, value: 'all', name: 'Все источники' },
                { id: 2, value: 'referal', name: 'Реферальная ссылка' },
                { id: 3, value: 'promo', name: 'Промокод' },
            ],
        };
    },

    computed: {
        ...mapState('route', {
            referalId: state => state.params && state.params.referalId,
        }),

        backUrl() {
            return { name: 'ReferalOrders' };
        },
    },

    methods: {
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
    },

    beforeRouteEnter(to, from, next) {
        const { name, params } = to;
        next(vm => {
            vm[UPDATE_BREADCRUMB]([
                { name: vm.$t('profile.routes.ReferalOrders'), to: { name: 'ReferalOrders' } },
                { name: vm.$t('profile.format.referal', { id: params.referalId }), to: { name, params } },
            ]);
        });
    },

    beforeRouteUpdate(to, from, next) {
        const { name, params } = to;

        this[UPDATE_BREADCRUMB]([
            { name: vm.$t('profile.routes.Orders'), to: { name: 'ReferalOrders' } },
            { name: vm.$t('profile.format.referal', { id: params.referalId }), to: { name, params } },
        ]);
        next();
    },

    beforeRouteLeave(to, from, next) {
        this[UPDATE_BREADCRUMB]([]);
        next();
    },
};
</script>
