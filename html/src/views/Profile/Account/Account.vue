<template>
    <section class="section account-view">
        <h2 class="account-view__hl">
            {{ pageTitle }}
        </h2>

        <div class="account-view__panels" v-if="billingData">
            <div class="account-view__panel">
                <div class="text-grey">На вашем счете</div>
                <div class="account-view__panel-count">
                    <price class="text-bold" v-bind="billingData.referral_bill" always-number />
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
                    <template v-if="hasPaymentInfo">
                        <v-select
                            class="account-view__panel-bottom-select"
                            label="label"
                            track-by="id"
                            placeholder="Выберите способ"
                            :value="selectedCard"
                            :options="cards"
                            :searchable="false"
                            :show-labels="false"
                            @input="onChangeSelectedCard"
                        />

                        <v-input
                            class="account-view__panel-bottom-input"
                            v-model="amount"
                            type="number"
                            :min="billingData.limits.min"
                            :placeholder="sumInputPlaceholder"
                            :max="maxBillingValue"
                        />

                        <v-button
                            class="account-view__panel-bottom-btn"
                            :disabled="!selectedCard || !amount || isDisabledBtn"
                            @click="onClickCashOut"
                        >
                            Вывод
                        </v-button>
                    </template>
                    <template v-else>
                        <span>Для вывода средств заполните ваши реквизиты в&nbsp;</span>
                        <router-link :to="{ name: 'Cabinet' }">личном кабинете</router-link>
                    </template>
                </div>

                <div class="account-view__panel-attention">
                    Нажимая кнопку «оформить вывод», я согласен с условиями
                    <a href="https://yoomoney.ru/pay/page?id=526623">оферты ЮMoney</a>
                </div>
            </div>
        </div>

        <template v-if="operations && operations.length">
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
                            <tr class="account-view__table-tr" v-for="operation in operations" :key="operation.id">
                                <td class="account-view__table-td">{{ operation.action_id || '-' }}</td>
                                <td class="account-view__table-td">{{ operation.date }}</td>
                                <td class="account-view__table-td">
                                    {{ operation.type }}<br />
                                    <span class="status-color-error" v-if="operation.status === 3">Ошибка</span>
                                </td>
                                <td class="account-view__table-td">
                                    <price v-bind="operation.value" always-number />
                                </td>
                            </tr>
                        </transition-group>
                    </table>
                </div>
            </section>

            <ul class="account-view__list" v-if="isTabletLg">
                <li
                    class="container container--tablet-lg account-view__list-item"
                    v-for="operation in operations"
                    :key="operation.id"
                >
                    <info-row class="account-view__list-item-row" name="Заказ/событие" :value="operation.action_id" />
                    <info-row class="account-view__list-item-row" name="Дата" :value="operation.date" />
                    <info-row class="account-view__list-item-row" name="Операция">
                        {{ operation.type }}
                        <template v-if="operation.status === 3">
                            (<span class="status-color-error">Ошибка</span>)
                        </template>
                    </info-row>
                    <info-row class="account-view__list-item-row" name="Начислено/cписано">
                        <price v-bind="operation.value" always-number />
                    </info-row>
                </li>
            </ul>
        </template>

        <attention-panel class="account-view__attention-panel" v-else>
            <div class="account-view__attention-section">
                <p class="account-view__attention-text">
                    Вам еще не начислялись вознаграждения за покупки рефералов. Воспользуйтесь одним из маркетинговых
                    инструменов для привлечения аудитории:
                </p>

                <ul class="list list--dashed account-view__attention-list">
                    <li class="account-view__attention-list-item">
                        <v-link class="account-view__attention-link" tag="button" @click="onCopyToClipboard($event)">
                            скопировать
                        </v-link>
                        реферальную ссылку и разместить её в соцсетях
                    </li>
                    <li class="account-view__attention-list-item">
                        собрать собственную
                        <v-link class="account-view__attention-link" tag="button" :to="{ name: 'Promopage' }">
                            промо-страницу
                        </v-link>
                        с товарами
                    </li>
                    <li class="account-view__attention-list-item">
                        <button class="account-view__attention-link" @click="onPromocodeRequest">запросить</button>
                        промо-код
                    </li>
                    <li class="account-view__attention-list-item">
                        <v-link class="account-view__attention-link" tag="button" :to="{ name: 'Seo' }">
                            расшарить
                        </v-link>
                        товары для продвижения
                    </li>
                </ul>
            </div>
        </attention-panel>

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

        <transition name="fade">
            <message-modal v-if="$isServer || isMessageOpen" @created="onChatCreated" />
        </transition>

        <transition name="fade-in">
            <modal class="" v-if="callModal" :show-close-btn="true" @close="onCloseCallModal">
                <template v-slot:body>
                    <h3 class="account-view__section-hl">Ошибка</h3>
                    Требуется уточнение паспортных данных. Свяжитесь с вашим персональным менеджером или колл-центром.
                    <div class="account-view__form-controls">
                        <v-button @click="onCloseCallModal">Закрыть</v-button>
                    </div>
                </template>
            </modal>
        </transition>

        <transition name="fade-in">
            <modal class="" v-if="reqModal" :show-close-btn="true" @close="onCloseReqModal">
                <template v-slot:body>
                    <h3 class="account-view__section-hl">Подтверждение перевода с использованием паспортных данных*</h3>
                    <ul>
                        <li>
                            Фамилия:
                            <v-input class="" v-model="billingData.passport.surname" type="text" disabled />
                        </li>
                        <li>
                            Имя:
                            <v-input class="" v-model="billingData.passport.name" type="text" disabled />
                        </li>
                        <li>
                            Отчество:
                            <v-input class="" v-model="billingData.passport.patronymic" type="text" disabled />
                        </li>
                        <li>
                            Серия паспорта:
                            <v-input class="" v-model="billingData.passport.serial" type="text" disabled />
                        </li>
                        <li>
                            Номер паспорта:
                            <v-input class="" v-model="billingData.passport.no" type="text" disabled />
                        </li>
                        <li>
                            Дата выдачи паспорта:
                            <v-input class="" v-model="billingData.passport.issue_date" type="text" disabled />
                        </li>
                        <li>
                            Адрес регистрации:
                            <v-input class="" v-model="req.address" type="text" disabled />
                        </li>
                    </ul>
                    <span class="text-grey account-view__section-subtitle">
                        *Если нашли ошибку, свяжитесь с вашим персональным менеджером.
                    </span>
                    <div class="account-view__form-controls">
                        <v-button @click="onApplyModal">Принять</v-button>
                        <v-button @click="onCloseReqModal">Отмена</v-button>
                    </div>
                </template>
            </modal>
        </transition>
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
import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';

import MessageModal from '@components/profile/MessageModal/MessageModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { LOCALE } from '@store';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import {
    NAME as BILLING_MODULE,
    ITEMS,
    ACTIVE_PAGE,
    BILLING_DATA,
    SELECTED_CARD,
    CARD_CREATION_STATUS,
} from '@store/modules/Profile/modules/Billing';
import { PAGES_COUNT, HAS_PAYMENT_INFO } from '@store/modules/Profile/modules/Billing/getters';
import {
    FETCH_BILLING_DATA,
    SET_LOAD_PATH,
    FETCH_OPERATIONS,
    SET_SELECTED_CARD,
    POST_CASH_OUT,
    POST_CASH_OUT_REQUISITES,
    SET_CARD_CREATION_STATUS,
} from '@store/modules/Profile/modules/Billing/actions';

import { NAME as CABINET_MODULE, REQUISITES } from '@store/modules/Profile/modules/Cabinet';
import { NAME as AUTH_MODULE, REFERRAL_CODE, USER } from '@store/modules/Auth';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { $store, $progress } from '@services';
import { DEFAULT_PAGE } from '@constants';
import { monthLongDateSettings } from '@settings';
import { modalName, themeCodes } from '@enums';
import { cardIdentificationStatus } from '@enums/profile';
import { preparePrice, saveToClipboard, getDate } from '@util';
import { generateYandexCardAuthUrl, generateYandexCardAuthBackUrl, generateReferralLink } from '@util/profile';
import metaMixin from '@plugins/meta';
import './Account.css';
import Modal from '@controls/modal/modal.vue';
import { FETCH_CABINET_DATA } from '@store/modules/Profile/modules/Cabinet/actions';

const BILLING_MODULE_PATH = `${PROFILE_MODULE}/${BILLING_MODULE}`;
const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export default {
    name: 'account',
    mixins: [metaMixin],

    components: {
        Modal,
        VLink,
        VButton,
        VInput,
        VSelect,
        VPagination,

        Price,
        InfoRow,
        ShowMoreButton,
        AttentionPanel,
        MessageModal,
    },

    metaInfo() {
        const { pageTitle, activePage } = this;
        return {
            title: activePage > 1 ? `${pageTitle} – страница ${activePage}` : pageTitle,
        };
    },

    data() {
        return {
            showMore: false,
            amount: null,
            isDisabledBtn: false,
            reqModal: false,
            callModal: false,
            req: {},
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(BILLING_MODULE_PATH, [BILLING_DATA, ITEMS, ACTIVE_PAGE, SELECTED_CARD, CARD_CREATION_STATUS]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_CODE]: (state) => (state[USER] && state[USER][REFERRAL_CODE]) || false,
        }),
        ...mapState(MODAL_MODULE, {
            isMessageOpen: (state) =>
                state[MODALS][modalName.profile.MESSAGE] && state[MODALS][modalName.profile.MESSAGE].open,
        }),
        ...mapState(CABINET_MODULE_PATH, [REQUISITES]),

        ...mapGetters(BILLING_MODULE_PATH, [PAGES_COUNT, HAS_PAYMENT_INFO]),

        // newCardOption() { // Вывод на карту
        //     const backUrl = generateYandexCardAuthBackUrl();
        //     return {
        //         id: 'add',
        //         label: 'Добавить новую карту',
        //         url: generateYandexCardAuthUrl(backUrl, backUrl),
        //     };
        // },

        requisitesOption() {
            return {
                id: 'requisites',
                label: 'Перевод по реквизитам',
            };
        },

        avaliableAmountPlaceholder() {
            const { referral_bill = {} } = this[BILLING_DATA] || {};
            const amount = preparePrice(referral_bill.value);
            return `Сумма до ${amount} руб.`;
        },

        cards() {
            // IBT-460: убрать возможность вывода на карту
            // const { cards = [] } = this[BILLING_DATA] || {};
            // const cardList = cards.map((c) => ({
            //     ...c,
            //     label: `${c.card_type} ${c.card_panmask}`,
            // }));
            const cardList = [];

            // cardList.push(this.newCardOption); // Вывод на карту

            cardList.push(this.requisitesOption); // Вывод по реквизитам
            this[SET_SELECTED_CARD](this.requisitesOption);

            return cardList;
        },

        operations() {
            const items = this[ITEMS] || [];
            return items.map((i) => {
                const date =
                    i.created_at && getDate(i.created_at).toLocaleDateString(this[LOCALE], monthLongDateSettings);
                const type = this.$t(`billingOperationType.${i.type}`);

                return {
                    ...i,
                    date,
                    type,
                };
            });
        },

        sumInputPlaceholder() {
            const { limits } = this.billingData;
            return limits.min !== null ? `Сумма от ${limits.min && limits.min.toLocaleString()} ₽` : '';
        },

        maxBillingValue() {
            return this.billingData.referral_bill.value > this.billingData.limits.max
                ? this.billingData.limits.max
                : this.billingData.referral_bill.value;
        },

        pageTitle() {
            return this.$t(`profile.routes.${this.$route.name}`);
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isFullPassport() {
            return !!(
                this.billingData.passport.surname &&
                this.billingData.passport.name &&
                this.billingData.passport.patronymic &&
                this.billingData.passport.serial &&
                this.billingData.passport.no &&
                this.billingData.passport.issue_date &&
                this.req.address
            );
        },
    },

    watch: {
        [SELECTED_CARD](value) {
            if (value && value.url) document.location.href = value.url;
        },
    },

    methods: {
        ...mapActions(BILLING_MODULE_PATH, [
            SET_SELECTED_CARD,
            POST_CASH_OUT,
            POST_CASH_OUT_REQUISITES,
            SET_CARD_CREATION_STATUS,
            FETCH_BILLING_DATA,
            FETCH_OPERATIONS,
        ]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onChangeSelectedCard(card) {
            this[SET_SELECTED_CARD](card);
        },

        async onApplyModal() {
            this.reqModal = false;
            this.isDisabledBtn = true;
            const message = 'Ваш перевод оформлен, ждите поступления средств в срок до 10 календарных дней';
            try {
                await this[POST_CASH_OUT_REQUISITES]({
                    customerId: this.billingData.passport.customer_id,
                    value: this.amount,
                });
                await this[FETCH_BILLING_DATA]({});
                this.$router.replace({ path: this.$route.path });
                this[CHANGE_MODAL_STATE]({ name: modalName.general.NOTIFICATION, open: true, state: { message } });

                this.amount = null;
                this.isDisabledBtn = false;
            } catch (error) {
                alert('Произошла ошибка при переводе денег');
                this.isDisabledBtn = false;
            }
        },

        onCloseReqModal() {
            this.reqModal = false;
            this.isDisabledBtn = false;
        },

        onCloseCallModal() {
            this.callModal = false;
            this[SET_SELECTED_CARD](null);
        },

        async onClickCashOut() {
            try {
                const { id } = this[SELECTED_CARD] || {};
                const message = 'Ваш перевод оформлен, ждите поступления средств в срок до 10 календарных дней';
                this.isDisabledBtn = true;

                if (id === 'requisites') {
                    if (this.isFullPassport) {
                        this.reqModal = true;
                    } else {
                        this.callModal = true;
                    }
                    this.isDisabledBtn = true;
                    return;
                } else {
                    await this[POST_CASH_OUT]({ cardId: id, value: this.amount });
                }
                await this[FETCH_BILLING_DATA]({});
                this.$router.replace({ path: this.$route.path });
                this[CHANGE_MODAL_STATE]({ name: modalName.general.NOTIFICATION, open: true, state: { message } });

                this.amount = null;
                this.isDisabledBtn = false;
            } catch (error) {
                alert('Произошла ошибка при переводе денег');
                this.isDisabledBtn = false;
            }
        },

        onShowMore() {
            this.showMore = true;
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, page: this[ACTIVE_PAGE] + 1 },
            });
        },

        onPageChanged(page) {
            this.showMore = false;
            this.$router.push({
                path: this.$route.path,
                query: { ...this.$route.query, page: page > DEFAULT_PAGE ? page : undefined },
            });
        },

        onCopyToClipboard(e) {
            const link = generateReferralLink(this[REFERRAL_CODE]);
            const result = saveToClipboard(link);
            const message = result ? 'Успешно скопировано' : 'Не удается скопировать';
            this[CHANGE_MODAL_STATE]({ name: modalName.general.NOTIFICATION, open: true, state: { message } });
            e.target.focus();
        },

        onPromocodeRequest() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.MESSAGE,
                open: true,
                state: {
                    themeCode: themeCodes.PROMOCODE,
                },
            });
        },

        onChatCreated() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.NOTIFICATION,
                open: true,
                state: {
                    title: 'Уведомление',
                    message: 'Запрос отправлен, администратор свяжется с вами в ближайшее время.',
                },
            });
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

        function proceed() {
            if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][BILLING_MODULE]) {
                const { loadPath } = $store.state[PROFILE_MODULE][BILLING_MODULE];

                // если все загружено, пропускаем
                if (loadPath === fullPath) next();
                else {
                    $progress.start();
                    $store
                        .dispatch(`${BILLING_MODULE_PATH}/${FETCH_BILLING_DATA}`, {
                            page,
                        })
                        .then(() => {
                            $store.dispatch(`${BILLING_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath).then(() => {
                                $store.dispatch(`${CABINET_MODULE_PATH}/${FETCH_CABINET_DATA}`);
                                next(() => {
                                    $progress.finish();
                                });
                            });
                        })
                        .catch((thrown) => {
                            if (thrown && thrown.isCancel === true) return next();
                            next(() => {
                                $progress.fail();
                            });
                        });
                }
            }
        }

        if ($store.state[PROFILE_MODULE] && $store.state[PROFILE_MODULE][BILLING_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[PROFILE_MODULE][BILLING_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
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

        if (page == this[ACTIVE_PAGE]) return next();

        try {
            this.$progress.start();
            await this[FETCH_OPERATIONS]({ page, showMore: this.showMore });
            this.$progress.finish();
            next();
        } catch (error) {
            console.log(error);
            this.$progress.fail();
            next(false);
        }

        this.showMore = false;
    },

    beforeRouteLeave(to, from, next) {
        this[SET_CARD_CREATION_STATUS](null);
        next();
    },

    created() {
        this.cardStatus = cardIdentificationStatus;
        const requisites = this[REQUISITES] || {};
        this.req = { ...requisites };
    },
};
</script>
