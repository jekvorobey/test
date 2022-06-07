<template>
    <section class="section checkout-view">
        <v-cart-header hide-favorites />
        <div class="container">
            <div class="checkout-view__header">
                <h1 class="checkout-view__header-hl">
                    {{ pageTitle }}
                </h1>
                <v-link class="checkout-view__header-link" :to="{ name: 'Cart' }">
                    <v-svg name="arrow-small" width="24" height="24" />&nbsp;&nbsp;Вернуться в корзину
                </v-link>
            </div>
        </div>

        <section class="section checkout-view__main">
            <div class="container checkout-view__main-container">
                <div class="checkout-view__main-body">
                    <component ref="panel" :is="checkoutPanel" />
                </div>
                <v-sticky class="checkout-view__main-sticky" v-if="canDeliver">
                    <template v-slot:sticky>
                        <div class="checkout-view__main-panel">
                            <p class="text-grey checkout-view__main-panel-info" v-if="attentionMessage">
                                {{ attentionMessage }}
                            </p>
                            <p class="checkout-view__main-panel-line">
                                Сумма заказа: {{ checkoutType && $t(`cart.summary.type.${checkoutType}`) }}
                                <price v-bind="summary.sum" />
                            </p>

                            <template v-if="isProduct">
                                <p class="checkout-view__main-panel-line" v-if="summary.delivery">
                                    Доставка
                                    <price
                                        v-if="summary.delivery.value || summary.delivery.value === 0"
                                        v-bind="summary.delivery"
                                    />
                                    <span v-else>{{ summary.delivery }}</span>
                                </p>

                                <p class="checkout-view__main-panel-line" v-if="bonusPayment > 0">
                                    Оплата бонусами
                                    <span> -<price :value="bonusPayment" currency="RUB" /> </span>
                                </p>
                            </template>

                            <p class="checkout-view__main-panel-line" v-if="certificatePayment > 0">
                                Оплата подарочным сертификатом
                                <span> -<price :value="certificatePayment" currency="RUB" /> </span>
                            </p>

                            <p
                                class="checkout-view__main-panel-line"
                                v-for="discount in summary.discounts"
                                :key="discount.type"
                            >
                                <template v-if="discount.type === discountType.PRODUCT">
                                    {{ $t(`cart.summary.discount.${discount.type}.${checkoutType}`) }}
                                </template>
                                <template v-else>
                                    {{ $t(`cart.summary.discount.${discount.type}`) }}
                                </template>
                                <span>-<price v-bind="discount.value" /></span>
                            </p>

                            <div class="checkout-view__main-panel-total">
                                <p class="text-bold checkout-view__main-panel-line">
                                    Итого <price v-bind="summary.total" />
                                </p>
                                <p v-if="showBonus" class="text-grey text-sm checkout-view__main-panel-line">
                                    Будет начислено
                                    <span> {{ `+ ${prepareBonus(summary.bonusGet)}` }}&nbsp;бонусов </span>
                                </p>
                                <p
                                    v-if="isProduct && summary.bonusSpent"
                                    class="text-grey text-sm checkout-view__main-panel-line"
                                >
                                    Будет списано
                                    <span>
                                        {{
                                            summary.bonusSpent > 0
                                                ? `- ${prepareBonus(summary.bonusSpent)}`
                                                : prepareBonus(summary.bonusSpent)
                                        }}
                                        &nbsp;бонусов
                                    </span>
                                </p>
                            </div>

                            <div v-if="!promocode" class="checkout-view__main-panel-promo">
                                <v-input
                                    class="checkout-view__main-panel-promo-input"
                                    placeholder="Ваш промокод"
                                    v-model="inputPromocode"
                                    :error="promocodeError"
                                >
                                    <template v-slot:error="{ error }">
                                        <transition name="slide-in-bottom" mode="out-in">
                                            <div :key="error" v-if="error">{{ error }}</div>
                                        </transition>
                                    </template>
                                </v-input>

                                <v-button
                                    class="btn--outline checkout-view__main-panel-promo-btn"
                                    @click="onAddPromocode"
                                    :disabled="isCommit || isPromocodePending || !inputPromocode"
                                >
                                    <template v-if="!isPromocodePending">Применить</template>
                                    <v-spinner v-else show height="24" width="24" />
                                </v-button>
                            </div>
                            <div
                                v-else
                                class="checkout-view__main-panel-promo checkout-view__main-panel-promo--success"
                            >
                                <div class="checkout-view__main-panel-promo-icon">
                                    <v-svg name="check" width="16" height="16" />
                                </div>

                                <div>
                                    Промокод&nbsp;{{ promocode }}&nbsp;применён
                                    <v-link
                                        tag="button"
                                        class="checkout-view__main-panel-promo-link"
                                        @click="onDeletePromocode"
                                        :disabled="isCommit || isPromocodePending"
                                    >
                                        Отменить
                                    </v-link>
                                </div>
                            </div>

                            <v-button
                                class="checkout-view__main-panel-submit"
                                @click="onCommit"
                                :disabled="isCommit || isPromocodePending"
                            >
                                {{ isPostPaidSelected ? 'Подтвердить заказ' : 'Перейти к оплате' }}
                            </v-button>
                        </div>
                    </template>
                </v-sticky>
            </div>
        </section>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VInput from '@controls/VInput/VInput.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import Price from '@components/Price/Price.vue';
import VCartHeader from '@components/VCartHeader/VCartHeader.vue';

import CheckoutProductPanel from '@components/checkout/CheckoutProductPanel/CheckoutProductPanel.vue';
import CheckoutMasterClassPanel from '@components/checkout/CheckoutMasterClassPanel/CheckoutMasterClassPanel.vue';

import { $store, $logger, $progress, $retailRocket } from '@services';
import { seoEvents, ProductsBuilder } from '@services/SeoEventsService';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as AUTH_MODULE, HAS_SESSION, REFERRAL_PARTNER, USER } from '@store/modules/Auth';

import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';
import { CART_TYPES } from '@store/modules/Cart/getters';

import { NAME as CHECKOUT_MODULE, CHECKOUT_TYPE, CHECKOUT_DATA } from '@store/modules/Checkout';
import {
    FETCH_CHECKOUT_DATA,
    ADD_PROMOCODE,
    DELETE_PROMOCODE,
    COMMIT_DATA,
    CLEAR_CHECKOUT_DATA,
    FETCH_PROFESSIONS,
    FETCH_CHECKOUT_RECEIVE_METHODS,
} from '@store/modules/Checkout/actions';
import {
    PROMO_CODE,
    SUMMARY,
    RECEIVE_METHODS,
    BONUS_PAYMENT,
    PROMOCODE_STATUS,
    CERTIFICATE_PAYMENT,
    PAYMENT_METHODS,
    SELECTED_PAYMENT_METHOD_ID,
} from '@store/modules/Checkout/getters';

import metaMixin from '@plugins/meta';
import { httpCodes, requestStatus } from '@enums';
import { discountType } from '@enums/checkout';
import { preparePrice } from '@util';
import { generateThankPageUrl } from '@util/order';
import { cartItemTypes } from '@enums/product';
import { cancelRoute } from '@settings';
import '@images/sprites/check.svg';
import '@images/sprites/arrow-small.svg';
import './Checkout.css';

export default {
    name: 'checkout',
    mixins: [metaMixin],

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VSticky,
        VSpinner,
        VCartHeader,

        Price,

        CheckoutProductPanel,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    data() {
        return {
            promocodeError: null,
            inputPromocode: null,
            isCommit: false,
        };
    },

    computed: {
        ...mapState(CART_MODULE, [CART_DATA]),
        ...mapState(CHECKOUT_MODULE, [CHECKOUT_TYPE, CHECKOUT_DATA]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        ...mapState('route', {
            checkoutType: (state) => state.params.type,
        }),

        ...mapGetters(CART_MODULE, [CART_TYPES]),
        ...mapGetters(CHECKOUT_MODULE, [
            PROMO_CODE,
            SUMMARY,
            RECEIVE_METHODS,
            PAYMENT_METHODS,
            SELECTED_PAYMENT_METHOD_ID,
            BONUS_PAYMENT,
            CERTIFICATE_PAYMENT,
            PROMOCODE_STATUS,
        ]),

        canDeliver() {
            const receiveMethods = this[RECEIVE_METHODS];
            return !this.isProduct || (this.isProduct && receiveMethods && receiveMethods.length > 0);
        },

        checkoutPanel() {
            const { checkoutType } = this;
            switch (checkoutType) {
                case cartItemTypes.PRODUCT:
                    return CheckoutProductPanel;
                case cartItemTypes.MASTERCLASS:
                    return CheckoutMasterClassPanel;
                default:
                    return 'div';
            }
        },

        pageTitle() {
            const { checkoutType } = this;
            return `Оформление заказа: ${checkoutType && this.$t(`cart.summary.type.${checkoutType}`)}`;
        },

        attentionMessage() {
            const { checkoutType } = this;
            const types = this[CART_TYPES] || [];
            if (types.length > 1) {
                switch (checkoutType) {
                    case cartItemTypes.PRODUCT:
                        return 'Внимание: мастер-классы можно оплатить после завершения оплаты продуктов';
                    case cartItemTypes.MASTERCLASS:
                        return 'Внимание: продукты можно оплатить после завершения оплаты мастер-классов';
                }
            }
            return null;
        },

        isPromocodePending() {
            return this[PROMOCODE_STATUS] === requestStatus.PENDING;
        },

        isProduct() {
            return this.checkoutType === cartItemTypes.PRODUCT;
        },

        showBonus() {
            return !this.referralPartner && this.summary.bonusGet > 0;
        },

        isPostPaidSelected() {
            const paymentMethod = this[PAYMENT_METHODS].find(
                (method) => method.id === this[SELECTED_PAYMENT_METHOD_ID]
            );

            return paymentMethod ? paymentMethod.is_postpaid : false;
        },
    },

    watch: {
        [HAS_SESSION](value) {
            if (!value) this.$router.replace(cancelRoute.path);
        },
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [
            FETCH_CHECKOUT_DATA,
            CLEAR_CHECKOUT_DATA,
            FETCH_CHECKOUT_RECEIVE_METHODS,
            ADD_PROMOCODE,
            DELETE_PROMOCODE,
            COMMIT_DATA,
        ]),

        async onAddPromocode() {
            try {
                const { inputPromocode } = this;
                await this[ADD_PROMOCODE](inputPromocode);
            } catch (error) {
                const { status } = error;
                switch (status) {
                    case httpCodes.BAD_REQUEST:
                        this.promocodeError = this.$t('validation.errors.promocodeInvalid');
                        break;
                    case httpCodes.NOT_FOUND:
                        this.promocodeError = this.$t('validation.errors.promocodeNotExist');
                        break;
                }

                setTimeout(() => (this.promocodeError = null), 5000);
            }
        },

        onDeletePromocode() {
            this[DELETE_PROMOCODE]();
        },

        async onCommit() {
            try {
                const { panel } = this.$refs;
                if (!panel.validate()) return;

                this.isCommit = true;
                const { paymentUrl, orderId, orderNumber, items = [] } = await this[COMMIT_DATA]();
                $retailRocket.addTransaction(orderNumber, items);
                const backUrl = generateThankPageUrl(orderId);
                // заменяем текущий роут на роут thank-you, чтобы при переходе по стрелке мы вернулись на страницу
                // благодарности за заказ
                window.history.replaceState(null, '', backUrl);
                document.location.href = paymentUrl;
            } catch (error) {
                this.isCommit = false;
                $logger.error(error);
            }
        },

        async fetchReceiveMethods() {
            this.$progress.start();

            try {
                await this[FETCH_CHECKOUT_RECEIVE_METHODS]();
                this.$progress.finish();
            } catch (error) {
                this.$progress.fail();
                throw new Error(error);
            }
        },

        prepareBonus(value) {
            return preparePrice(value);
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            params: { type },
        } = to;

        if ($store.state[CHECKOUT_MODULE] && $store.state[CHECKOUT_MODULE][CHECKOUT_DATA]) next();
        else {
            $progress.start();
            Promise.all([
                $store.dispatch(`${CHECKOUT_MODULE}/${FETCH_CHECKOUT_DATA}`, type),
                $store.dispatch(`${CHECKOUT_MODULE}/${FETCH_PROFESSIONS}`),
            ])
                .then(() => next(() => $progress.finish()))
                .catch(() => next(() => $progress.fail()));
        }
    },

    async beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        try {
            const {
                params: { type },
            } = to;

            this.$progress.start();
            await this[FETCH_CHECKOUT_DATA](type);
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }
    },

    created() {
        this.discountType = discountType;
    },

    mounted() {
        const products = new ProductsBuilder().createForCheckout(this.cartData.product.items);
        seoEvents.checkout(products, 2);

        if (this.isProduct) {
            this.fetchReceiveMethods().catch((error) => {
                console.error(error);
                this.fetchReceiveMethods();
            });
        }
    },

    beforeDestroy() {
        this[CLEAR_CHECKOUT_DATA]();
    },
};
</script>
