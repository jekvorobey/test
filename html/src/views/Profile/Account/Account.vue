<template>
    <section class="section account-view">
        <h2 class="account-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>

        <div class="account-view__panels">
            <div class="account-view__panel">
                <div class="text-grey">На вашем счете</div>
                <div class="account-view__panel-count">
                    <price class="text-bold" v-bind="billingData.referral_bill" />
                </div>
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
                        <tr
                            class="account-view__table-tr"
                            v-for="(operation, index) in operations"
                            :key="operation.id || index"
                        >
                            <td class="account-view__table-td">{{ operation.action_id }}</td>
                            <td class="account-view__table-td">{{ operation.date }}</td>
                            <td class="account-view__table-td">{{ operation.type }}</td>
                            <td class="account-view__table-td">
                                <price v-bind="operation.value" />
                            </td>
                        </tr>
                    </transition-group>
                </table>
            </div>
        </section>

        <ul class="account-view__list" v-if="isTabletLg">
            <li
                class="container container--tablet-lg account-view__list-item"
                v-for="(operation, index) in operations"
                :key="operation.id || index"
            >
                <info-row class="account-view__list-item-row" name="Заказ/событие" :value="operation.action_Id" />
                <info-row class="account-view__list-item-row" name="Дата" :value="operation.date" />
                <info-row class="account-view__list-item-row" name="Операция" :value="operation.type" />
                <info-row class="account-view__list-item-row" name="Начислено/cписано">
                    <price v-bind="operation.value" />
                </info-row>
            </li>
        </ul>

        <div class="container container--tablet-lg account-view__controls" v-if="pagesCount > 1">
            <show-more-button
                v-if="activePage < pagesCount"
                btn-class="btn--outline account-view__controls-btn"
                @click="onShowMore"
            >
                Показать ещё
            </show-more-button>
            <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
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

import { mapState, mapActions, mapGetters } from 'vuex';

import { LOCALE } from '@store';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as BILLING_MODULE, ITEMS, ACTIVE_PAGE, BILLING_DATA } from '@store/modules/Profile/modules/Billing';
import { PAGES_COUNT } from '@store/modules/Profile/modules/Billing/getters';
import { FETCH_BILLING_DATA, SET_LOAD_PATH, FETCH_OPERATIONS } from '@store/modules/Profile/modules/Billing/actions';

import { DEFAULT_PAGE } from '@constants';
import { monthLongDateSettings } from '@settings';
import { $store, $progress, $logger } from '@services';
import './Account.css';

const BILLING_MODULE_PATH = `${PROFILE_MODULE}/${BILLING_MODULE}`;

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
            showMore: false,
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
        ...mapState([LOCALE]),
        ...mapState(BILLING_MODULE_PATH, [BILLING_DATA, ITEMS, ACTIVE_PAGE]),
        ...mapGetters(BILLING_MODULE_PATH, [PAGES_COUNT]),

        operations() {
            const items = this[ITEMS] || [];
            return items.map(i => {
                const dateObj = i.created_at && new Date(i.created_at);
                const date = dateObj.toLocaleDateString(this[LOCALE], monthLongDateSettings);

                return {
                    ...i,
                    date,
                };
            });
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        onShowMore() {
            this.showMore = true;
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, page: this[ACTIVE_PAGE] + 1 },
            });
        },

        onPageChanged(page) {
            this.showMore = false;
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page } });
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            fullPath,
            query: { page = DEFAULT_PAGE },
        } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][BILLING_MODULE];

        // если все загружено, пропускаем
        if (loadPath === fullPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${BILLING_MODULE_PATH}/${FETCH_BILLING_DATA}`, {
                    page,
                })
                .then(data => {
                    $store.dispatch(`${BILLING_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                    });
                })
                .catch(thrown => {
                    if (thrown && thrown.isCancel === true) return next();
                    next(vm => {
                        $progress.fail();
                    });
                });
        }
    },

    async beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        const {
            query: { page = DEFAULT_PAGE },
        } = to;

        try {
            this.$progress.start();
            await this[FETCH_OPERATIONS]({ page, showMore: this.showMore });
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }

        this.showMore = false;
    },
};
</script>
