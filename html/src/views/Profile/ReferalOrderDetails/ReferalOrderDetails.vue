<template>
    <section class="section referal-order-details-view">
        <div class="container container--tablet-lg">
            <v-link class="referal-order-details-view__back-link" :to="backUrl">
                <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад к
                реферальным заказам
            </v-link>
            <h2 class="referal-order-details-view__hl">{{ $t('profile.format.referal', { id: referalId }) }}</h2>
            <section class="referal-order-details-view__details">
                <div class="referal-order-details-view__details-info">
                    <info-row class="referal-order-details-view__details-row" name="Заказал товаров" value="12" />
                    <info-row class="referal-order-details-view__details-row" name="Сумма заказов" value="745 856 ₽" />
                    <info-row
                        class="referal-order-details-view__details-row"
                        name="Источник"
                        value="Промокод SOKOLOV"
                    />
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
                    <div class="referal-order-details-view__section-sources">
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

                <filter-button class="referal-orders-view__filter-btn" @click="filterModal = !filterModal">
                    Фильтр и сортировка&nbsp;&nbsp;
                    <span class="text-grey">4</span>
                </filter-button>

                <table class="referal-order-details-view__table" v-if="!isTabletLg">
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
                        <tr class="referal-order-details-view__table-tr" v-for="order in orders" :key="order.id">
                            <td class="referal-order-details-view__table-td">
                                <div class="referal-order-details-view__table-img">
                                    <img :src="order.image" />
                                </div>
                                <div class="referal-order-details-view__table-title">
                                    {{ order.title }}
                                </div>
                            </td>
                            <td class="referal-order-details-view__table-td">{{ order.qty }} шт</td>
                            <td class="referal-order-details-view__table-td">{{ order.source }}</td>
                            <td class="referal-order-details-view__table-td">{{ order.date }}</td>
                            <td class="referal-order-details-view__table-td">
                                <price v-bind="order.price" />
                            </td>
                            <td class="referal-order-details-view__table-td">
                                <price v-bind="order.refund" />
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </section>
        </div>

        <ul class="referal-order-details-view__list" v-if="isTabletLg">
            <li
                class="referal-order-details-view__list-item"
                v-for="order in orders"
                :key="order.id"
                @click="onOpenOrder(order.referalId)"
            >
                <info-row class="referal-order-details-view__list-item-row" name="Товар">
                    <div class="referal-order-details-view__table-img">
                        <img :src="order.image" width="40" height="40" />
                    </div>
                    <div class="referal-order-details-view__table-title">
                        {{ order.title }}
                    </div>
                </info-row>
                <info-row class="referal-order-details-view__list-item-row" name="Кол-во">
                    {{ order.qty }} шт.
                </info-row>
                <info-row
                    class="referal-order-details-view__list-item-row"
                    name="ID реферала"
                    :value="order.referalId"
                />
                <info-row class="referal-order-details-view__list-item-row" name="Источник" :value="order.source" />
                <info-row class="referal-order-details-view__list-item-row" name="Дата заказа" :value="order.date" />
                <info-row class="referal-order-details-view__list-item-row" name="Сумма">
                    <price v-bind="order.price" />
                </info-row>
                <info-row class="referal-order-details-view__list-item-row" name="Сумма вознаграждения">
                    <price v-bind="order.refund" />
                </info-row>
            </li>
        </ul>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VCheck from '../../../components/controls/VCheck/VCheck.vue';

import Price from '../../../components/Price/Price.vue';
import FilterButton from '../../../components/FilterButton/FilterButton.vue';
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
        FilterButton,
        Price,
    },

    data() {
        return {
            orders: [
                {
                    id: 1,
                    referalId: 154,
                    image: referalProduct1,
                    title: "Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая",
                    qty: 1,
                    source: 'Реферальная ссылка',
                    date: '16.08.19',
                    price: {
                        value: 2789,
                        currency: 'RUB',
                    },
                    refund: {
                        value: 278,
                        currency: 'RUB',
                    },
                },
                {
                    id: 2,
                    referalId: 154,
                    image: referalProduct2,
                    title: 'Matrix Спрей для укладки волос Total results Wonder boost, 250 мл',
                    qty: 2,
                    source: 'Промокод SOKOLOV',
                    date: '16.08.19',
                    price: {
                        value: 2789,
                        currency: 'RUB',
                    },
                    refund: {
                        value: 278,
                        currency: 'RUB',
                    },
                },
                {
                    id: 3,
                    referalId: 469,
                    image: referalProduct3,
                    title: "Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая",
                    qty: 1,
                    source: 'Реферальная ссылка',
                    date: '16.08.19',
                    price: {
                        value: 1349,
                        currency: 'RUB',
                    },
                    refund: {
                        value: 145,
                        currency: 'RUB',
                    },
                },
            ],
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

        isTabletLg() {
            return this.$mq.tabletLg;
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
