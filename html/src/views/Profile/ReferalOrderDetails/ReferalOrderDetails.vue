<template>
    <section class="section referal-order-details-view">
        <div class="container container--tablet-lg">
            <v-link class="referal-order-details-view__back-link" :to="backUrl">
                <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад к
                реферальным заказам
            </v-link>

            <h2 class="referal-order-details-view__hl">
                {{ pageTitle }}
            </h2>

            <section class="referal-order-details-view__details">
                <div class="referal-order-details-view__details-info">
                    <info-row
                        class="referal-order-details-view__details-row"
                        name="Заказал товаров"
                        :value="referralOrderDetails.totalCount"
                    />
                    <info-row class="referal-order-details-view__details-row" name="Сумма заказов">
                        <price v-bind="referralOrderDetails.totalPrice" />
                    </info-row>
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
                            v-for="source in referralSources"
                            v-model="referralSource"
                            name="referal-source"
                            type="radio"
                            :id="`${source.value}-${source.id}`"
                            :key="source.value"
                            :value="source.value"
                        >
                            {{ source.name }}
                        </v-check>
                    </div>
                </div>

                <!-- <filter-button
                    v-if="isTabletLg"
                    class="referal-orders-view__filter-btn"
                    @click="filterModal = !filterModal"
                >
                    Фильтр и сортировка&nbsp;&nbsp;
                    <span class="text-grey">4</span>
                </filter-button> -->

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
                        <tr
                            class="referal-order-details-view__table-tr"
                            v-for="order in filteredOrders"
                            :key="order.id"
                        >
                            <td class="referal-order-details-view__table-td">
                                <router-link class="referal-order-details-view__table-link" :to="order.url">
                                    <div
                                        class="referal-order-details-view__table-img"
                                        :class="{
                                            'referal-order-details-view__table-img--empty':
                                                !order.image || !order.image.id,
                                        }"
                                    >
                                        <v-picture v-if="order.image && order.image.id" :key="order.image.id">
                                            <source :data-srcset="order.desktopImage" type="image/webp" />
                                            <img
                                                class="blur-up lazyload v-picture__img"
                                                :data-src="order.defaultImage"
                                            />
                                        </v-picture>
                                        <v-svg v-else name="logo" width="32" height="32" />
                                    </div>
                                    <div class="referal-order-details-view__table-title">
                                        <div>{{ order.name }}</div>
                                        <div class="text-grey text-sm">{{ order.note }}</div>
                                    </div>
                                </router-link>
                            </td>
                            <td class="referal-order-details-view__table-td">{{ order.qty }} шт</td>
                            <td class="referal-order-details-view__table-td">{{ order.sourceString }}</td>
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
            <li class="referal-order-details-view__list-item" v-for="order in filteredOrders" :key="order.id">
                <info-row class="referal-order-details-view__list-item-row" name="Товар">
                    <router-link class="referal-order-details-view__table-link" :to="order.url">
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
                            <div>{{ order.name }}</div>
                            <div class="text-grey text-sm">{{ order.note }}</div>
                        </div>
                    </router-link>
                </info-row>
                <info-row class="referal-order-details-view__list-item-row" name="Количество">
                    {{ order.qty }} шт.
                </info-row>
                <info-row
                    class="referal-order-details-view__list-item-row"
                    name="Источник"
                    :value="order.sourceString"
                />
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
//import FilterButton from '@components/FilterButton/FilterButton.vue';
import InfoRow from '@components/profile/InfoRow/InfoRow.vue';

import { mapActions, mapState } from 'vuex';
import { LOCALE } from '@store';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { UPDATE_BREADCRUMB } from '@store/modules/Profile/actions';

import { NAME as REFERRAL_MODULE, REFERRAL_ORDER_DETAILS } from '@store/modules/Profile/modules/Referral';
import { FETCH_REFERRER_ORDER_DETAILS, SET_LOAD_PATH } from '@store/modules/Profile/modules/Referral/actions';

import { $store, $progress } from '@services';
import { fileExtension, sortDirections } from '@enums';
import { referralOrderSortFields, referralSource } from '@enums/profile';
import { digit2DateSettings, monthLongDateSettings } from '@settings';
import { getDate } from '@util';
import { generatePictureSourcePath } from '@util/file';
import { generateProductUrl } from '@util/catalog';
import metaMixin from '@plugins/meta';
import '@images/sprites/logo.svg';
import '@images/sprites/arrow-small.svg';
import './ReferalOrderDetails.css';
import { NAME as LANDING_MODULE } from '@store/modules/Landing';

const REFERRAL_MODULE_PATH = `${PROFILE_MODULE}/${REFERRAL_MODULE}`;

function updateBreadcrumbs(vm, name, params) {
    const { href: rootHref } = vm.$router.resolve({ name: 'Referal' });
    const { href: currentHref } = vm.$router.resolve({ name, params });

    vm[UPDATE_BREADCRUMB]([
        { name: vm.$t('profile.routes.Referal'), to: rootHref },
        { name: vm.$t('profile.format.referal', { id: params.referalId }), to: currentHref },
    ]);
}

export default {
    name: 'referal-order-details',
    mixins: [metaMixin],

    components: {
        VSvg,
        VLink,
        VCheck,
        VPicture,

        InfoRow,
        //FilterButton,
        Price,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    data() {
        return {
            referralSource: null,
            referralSources: [
                { id: 1, value: null, name: 'Все источники' },
                { id: 2, value: referralSource.LINK, name: 'Реферальная ссылка' },
                { id: 3, value: referralSource.PROMOCODE, name: 'Промокод' },
            ],
        };
    },

    computed: {
        ...mapState(REFERRAL_MODULE_PATH, [REFERRAL_ORDER_DETAILS]),
        ...mapState('route', {
            referalId: (state) => state.params && state.params.referalId,
        }),

        orders() {
            const { orders = [] } = this[REFERRAL_ORDER_DETAILS] || {};
            return orders.map((i) => {
                const { image, order_date, source, category_code, code, variantGroup } = i;
                const desktopImage = image && generatePictureSourcePath(40, 40, image.id, fileExtension.image.WEBP);
                const defaultImage = image && generatePictureSourcePath(40, 40, image.id);
                const date = order_date && getDate(order_date).toLocaleDateString(this[LOCALE], digit2DateSettings);
                const sourceString = this.$t(`referralSource.${source}`);
                const url = generateProductUrl(category_code, code);

                let values = null;
                if (variantGroup) {
                    const { characteristics = [], combinations = [] } = variantGroup;
                    const { props } = combinations.find((c) => c.code === code);
                    const keys = Object.keys(props);
                    values = keys.map((k) => {
                        const { options, name } = characteristics.find((c) => c.code === k);
                        const option = options.find((o) => o.value === props[k]);
                        return `${name}: ${option.name}`;
                    });
                }
                const note = values && values.join(', ');

                return {
                    ...i,
                    note,
                    qty: Number(i.qty),
                    url,
                    sourceString,
                    date,
                    defaultImage,
                    desktopImage,
                };
            });
        },

        filteredOrders() {
            const { referralSource, orders } = this;
            return orders.filter((o) => !referralSource || o.source === referralSource);
        },

        registerDate() {
            const { register_date } = this[REFERRAL_ORDER_DETAILS] || {};
            return register_date && getDate(register_date).toLocaleDateString(this[LOCALE], monthLongDateSettings);
        },

        backUrl() {
            return { name: 'Referal' };
        },

        pageTitle() {
            const { referalId } = this;
            return this.$t('profile.format.referal', { id: referalId });
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
        function proceed() {
            if ($store.state[PROFILE_MODULE][REFERRAL_MODULE]) {
                const {
                    fullPath,
                    name,
                    params,
                    query: { orderField = referralOrderSortFields.ORDER_DATE, orderDirection = sortDirections.DESC },
                } = to;
                const { loadPath } = $store.state[PROFILE_MODULE][REFERRAL_MODULE];

                if (fullPath === loadPath) next((vm) => updateBreadcrumbs(vm, name, params));
                else {
                    $progress.start();
                    $store
                        .dispatch(`${REFERRAL_MODULE_PATH}/${FETCH_REFERRER_ORDER_DETAILS}`, {
                            id: params.referalId,
                            orderField,
                            orderDirection,
                        })
                        .then(() => {
                            $store.dispatch(`${REFERRAL_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                            next((vm) => {
                                $progress.finish();
                                updateBreadcrumbs(vm, name, params);
                            });
                        })
                        .catch(() =>
                            next((vm) => {
                                $progress.fail();
                                updateBreadcrumbs(vm, name, params);
                            })
                        );
                }
            }
        }

        if ($store.state[PROFILE_MODULE][REFERRAL_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[PROFILE_MODULE][REFERRAL_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },

    beforeRouteLeave(to, from, next) {
        this[UPDATE_BREADCRUMB]([]);
        next();
    },
};
</script>
