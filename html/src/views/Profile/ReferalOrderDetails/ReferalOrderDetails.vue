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
                    <!-- <info-row class="referal-order-details-view__details-row" name="Заказал товаров" value="12" />
                    <info-row class="referal-order-details-view__details-row" name="Сумма заказов" value="745 856 ₽" />
                    <info-row
                        class="referal-order-details-view__details-row"
                        name="Источник"
                        value="Промокод SOKOLOV"
                    /> -->
                    <info-row
                        class="referal-order-details-view__details-row"
                        name="Дата привязки реферала"
                        :value="registerDate"
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
                            :value="source.id"
                        >
                            {{ source.name }}
                        </v-check>
                    </div>
                </div>

                <filter-button
                    v-if="isTabletLg"
                    class="referal-orders-view__filter-btn"
                    @click="filterModal = !filterModal"
                >
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
                        <tr class="referal-order-details-view__table-tr" v-for="order in orders" :key="order.name">
                            <td class="referal-order-details-view__table-td">
                                <div
                                    class="referal-order-details-view__table-img"
                                    :class="{
                                        'referal-order-details-view__table-img--empty': !order.image || !order.image.id,
                                    }"
                                >
                                    <v-picture v-if="order.image && order.image.id" :key="order.image.id">
                                        <source :data-srcset="order.desktopImage" type="image/webp" />
                                        <img class="blur-up lazyload v-picture__img" :data-src="order.defaultImage" />
                                    </v-picture>
                                    <v-svg v-else name="logo" width="32" height="32" />
                                </div>
                                <div class="referal-order-details-view__table-title">
                                    {{ order.name }}
                                </div>
                            </td>
                            <td class="referal-order-details-view__table-td">{{ order.qty }} шт</td>
                            <td class="referal-order-details-view__table-td">{{ order.source }}</td>
                            <td class="referal-order-details-view__table-td">{{ order.date }}</td>
                            <td class="referal-order-details-view__table-td">
                                <price v-bind="order.price_product" />
                            </td>
                            <td class="referal-order-details-view__table-td">
                                <price v-bind="order.price_commission" />
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </section>
        </div>

        <ul class="referal-order-details-view__list" v-if="isTabletLg">
            <li class="referal-order-details-view__list-item" v-for="order in orders" :key="order.id">
                <info-row class="referal-order-details-view__list-item-row" name="Товар">
                    <div
                        class="referal-order-details-view__table-img"
                        :class="{ 'referal-order-details-view__table-img--empty': !order.image || !order.image.id }"
                    >
                        <v-picture v-if="order.image && order.image.id" :key="order.image.id">
                            <source :data-srcset="order.desktopImage" type="image/webp" />
                            <img class="blur-up lazyload v-picture__img" :data-src="order.defaultImage" />
                        </v-picture>
                        <v-svg v-else name="logo" width="32" height="32" />
                    </div>
                    <div class="referal-order-details-view__table-title">
                        {{ order.name }}
                    </div>
                </info-row>
                <info-row class="referal-order-details-view__list-item-row" name="Кол-во">
                    {{ order.qty }} шт.
                </info-row>
                <info-row class="referal-order-details-view__list-item-row" name="Источник" :value="order.source" />
                <info-row class="referal-order-details-view__list-item-row" name="Дата заказа" :value="order.date" />
                <info-row class="referal-order-details-view__list-item-row" name="Сумма">
                    <price v-bind="order.price_product" />
                </info-row>
                <info-row class="referal-order-details-view__list-item-row" name="Сумма вознаграждения">
                    <price v-bind="order.price_commission" />
                </info-row>
            </li>
        </ul>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';
import FilterButton from '@components/FilterButton/FilterButton.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';

import { mapActions, mapGetters, mapState } from 'vuex';
import { LOCALE } from '@store';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { UPDATE_BREADCRUMB } from '@store/modules/Profile/actions';

import { NAME as REFERRAL_MODULE, REFERRAL_ORDER_DETAILS } from '@store/modules/Profile/modules/Referral';
import { FETCH_REFERRER_ORDER_DETAILS } from '@store/modules/Profile/modules/Referral/actions';

import { fileExtension, sortDirections } from '@enums';
import { DEFAULT_PAGE } from '@constants';
import { digit2DateSettings, monthLongDateSettings } from '@settings';
import { generatePictureSourcePath } from '@util/file';
import { $store, $progress, $logger } from '@services';
import '@images/sprites/logo.svg';
import '@images/sprites/arrow-small.svg';
import './ReferalOrderDetails.css';

const REFERRAL_MODULE_PATH = `${PROFILE_MODULE}/${REFERRAL_MODULE}`;

export default {
    name: 'referal-order-details',

    components: {
        VSvg,
        VLink,
        VCheck,
        VPicture,

        InfoRow,
        FilterButton,
        Price,
    },

    data() {
        return {
            // orders: [
            //     {
            //         id: 1,
            //         referalId: 154,
            //         image: referalProduct1,
            //         title: "Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая",
            //         qty: 1,
            //         source: 'Реферальная ссылка',
            //         date: '16.08.19',
            //         price: {
            //             value: 2789,
            //             currency: 'RUB',
            //         },
            //         refund: {
            //             value: 278,
            //             currency: 'RUB',
            //         },
            //     },
            //     {
            //         id: 2,
            //         referalId: 154,
            //         image: referalProduct2,
            //         title: 'Matrix Спрей для укладки волос Total results Wonder boost, 250 мл',
            //         qty: 2,
            //         source: 'Промокод SOKOLOV',
            //         date: '16.08.19',
            //         price: {
            //             value: 2789,
            //             currency: 'RUB',
            //         },
            //         refund: {
            //             value: 278,
            //             currency: 'RUB',
            //         },
            //     },
            //     {
            //         id: 3,
            //         referalId: 469,
            //         image: referalProduct3,
            //         title: "Губная помада L'Oreal Paris Color Riche Collection Privee by J'Lo's увлажняющая",
            //         qty: 1,
            //         source: 'Реферальная ссылка',
            //         date: '16.08.19',
            //         price: {
            //             value: 1349,
            //             currency: 'RUB',
            //         },
            //         refund: {
            //             value: 145,
            //             currency: 'RUB',
            //         },
            //     },
            // ],
            referalSource: 1,
            referalSources: [
                { id: 1, value: 'all', name: 'Все источники' },
                { id: 2, value: 'referal', name: 'Реферальная ссылка' },
                { id: 3, value: 'promo', name: 'Промокод' },
            ],
        };
    },

    computed: {
        ...mapState(REFERRAL_MODULE_PATH, [REFERRAL_ORDER_DETAILS]),
        ...mapState('route', {
            referalId: state => state.params && state.params.referalId,
        }),

        orders() {
            const { orders } = this[REFERRAL_ORDER_DETAILS] || {};
            return orders.map(i => {
                const desktopImage = i.image && generatePictureSourcePath(40, 40, i.image.id, fileExtension.image.WEBP);
                const defaultImage = i.image && generatePictureSourcePath(40, 40, i.image.id);
                const date =
                    i.order_date && new Date(i.order_date).toLocaleDateString(this[LOCALE], digit2DateSettings);

                return {
                    ...i,
                    qty: Number(i.qty),
                    date,
                    defaultImage,
                    desktopImage,
                };
            });
        },

        registerDate() {
            const { register_date } = this[REFERRAL_ORDER_DETAILS] || {};
            if (!register_date) return null;
            const date = new Date(register_date);
            return date.toLocaleDateString(this[LOCALE], monthLongDateSettings);
        },

        backUrl() {
            return { name: 'Referal' };
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
        ...mapActions(REFERRAL_MODULE_PATH, [FETCH_REFERRER_ORDER_DETAILS]),
    },

    beforeRouteEnter(to, from, next) {
        const { name, params } = to;

        const { referralId } = $store.state[PROFILE_MODULE][REFERRAL_MODULE];

        if (referralId === params.referalId) next();
        else {
            $progress.start();
            $store.dispatch(`${REFERRAL_MODULE_PATH}/${FETCH_REFERRER_ORDER_DETAILS}`, params.referalId).then(() =>
                next(vm => {
                    $progress.finish();
                    vm[UPDATE_BREADCRUMB]([
                        { name: vm.$t('profile.routes.Referal'), to: { name: 'Referal' } },
                        { name: vm.$t('profile.format.referal', { id: params.referalId }), to: { name, params } },
                    ]);
                })
            );
        }
    },

    beforeRouteUpdate(to, from, next) {
        const { name, params } = to;

        this[UPDATE_BREADCRUMB]([
            { name: vm.$t('profile.routes.Referal'), to: { name: 'Referal' } },
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
