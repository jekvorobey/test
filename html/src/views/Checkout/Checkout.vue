<template>
    <section class="section checkout-view">
        <v-cart-header />
        <div class="container">
            <div class="checkout-view__header">
                <h1 class="checkout-view__header-hl">
                    Оформление заказа: {{ $t(`cart.summary.type.${checkoutType}`) }}
                </h1>
                <v-link class="checkout-view__header-link" to="/cart">
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
                            <p v-if="isProduct" class="text-grey checkout-view__main-panel-info">
                                Внимание: мастер-классы можете оплатить после завершения оплаты продуктов
                            </p>
                            <p class="checkout-view__main-panel-line">
                                Сумма заказа: {{ $t(`cart.summary.type.${checkoutType}`) }}
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

                            <p
                                class="checkout-view__main-panel-line"
                                v-for="discount in summary.discounts"
                                :key="discount.type"
                            >
                                {{ $t(`cart.summary.discount.${discount.type}`) }}
                                <span>-<price v-bind="discount.value" /></span>
                            </p>

                            <div class="checkout-view__main-panel-total">
                                <p class="text-bold checkout-view__main-panel-line">
                                    Итого <price v-bind="summary.total" />
                                </p>
                                <p v-if="!referralPartner" class="text-grey text-sm checkout-view__main-panel-line">
                                    Будет начислено
                                    <span>
                                        {{
                                            summary.bonusGet > 0
                                                ? `+ ${prepareBonus(summary.bonusGet)}`
                                                : prepareBonus(summary.bonusGet)
                                        }}
                                        &nbsp;бонусов
                                    </span>
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
                                    v-model="inputPromocode"
                                    class="checkout-view__main-panel-promo-input"
                                    placeholder="Ваш промокод"
                                />
                                <v-button
                                    class="btn--outline checkout-view__main-panel-promo-btn"
                                    @click="ADD_PROMOCODE(inputPromocode)"
                                    :disabled="!inputPromocode"
                                >
                                    Применить
                                </v-button>
                            </div>
                            <div
                                v-else
                                class="checkout-view__main-panel-promo checkout-view__main-panel-promo--success"
                            >
                                <div class="checkout-view__main-panel-promo-icon">
                                    <v-svg name="check-small" width="16" height="16" />
                                </div>
                                <div>
                                    Промокод&nbsp;{{ promocode }}&nbsp;применён
                                    <v-link
                                        tag="button"
                                        class="checkout-view__main-panel-promo-link"
                                        @click="DELETE_PROMOCODE(promocode)"
                                    >
                                        Отменить
                                    </v-link>
                                </div>
                            </div>
                            <v-button class="checkout-view__main-panel-submit" @click="onCommit" :disabled="isCommit">
                                Перейти к оплате
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

import Price from '@components/Price/Price.vue';
import VCartHeader from '@components/VCartHeader/VCartHeader.vue';

import CheckoutProductPanel from '@components/checkout/CheckoutProductPanel/CheckoutProductPanel.vue';
import CheckoutMasterClassPanel from '@components/checkout/CheckoutMasterClassPanel/CheckoutMasterClassPanel.vue';

import { $store, $logger, $progress } from '@services';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as AUTH_MODULE, HAS_SESSION, REFERRAL_PARTNER, USER } from '@store/modules/Auth';

import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';
import { CART_ITEMS_COUNT } from '@store/modules/Cart/getters';

import { NAME as CHECKOUT_MODULE, CHECKOUT_TYPE, CHECKOUT_DATA } from '@store/modules/Checkout';
import {
    FETCH_CHECKOUT_DATA,
    ADD_PROMOCODE,
    DELETE_PROMOCODE,
    COMMIT_DATA,
    CLEAR_CHECKOUT_DATA,
    FETCH_PROFESSIONS,
} from '@store/modules/Checkout/actions';
import { CHECKOUT, PROMO_CODE, SUMMARY, RECEIVE_METHODS, BONUS_PAYMENT } from '@store/modules/Checkout/getters';

import { preparePrice } from '@util';
import { generateThankPageUrl } from '@util/order';
import { cartItemTypes } from '@enums/product';
import { cancelRoute } from '@settings';
import '@images/sprites/check-small.svg';
import '@images/sprites/arrow-small.svg';
import './Checkout.css';

export default {
    name: 'checkout',

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VSticky,
        VCartHeader,

        Price,

        CheckoutProductPanel,
    },

    data() {
        return {
            inputPromocode: null,
            isCommit: false,
        };
    },

    computed: {
        ...mapState(CART_MODULE, [CART_DATA]),
        ...mapState(CHECKOUT_MODULE, [CHECKOUT_TYPE, CHECKOUT_DATA]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: state => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        ...mapState('route', {
            checkoutType: state => state.params.type,
        }),

        ...mapGetters(CHECKOUT_MODULE, [PROMO_CODE, SUMMARY, RECEIVE_METHODS, BONUS_PAYMENT]),

        isProduct() {
            return this.checkoutType === cartItemTypes.PRODUCT;
        },

        canDeliver() {
            const receiveMethods = this[RECEIVE_METHODS];
            return !this.isProduct || (this.isProduct && receiveMethods && receiveMethods.length > 0);
        },

        checkoutPanel() {
            switch (this.checkoutType) {
                case cartItemTypes.PRODUCT:
                    return CheckoutProductPanel;
                case cartItemTypes.MASTERCLASS:
                    return CheckoutMasterClassPanel;
                default:
                    'div';
            }
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
            ADD_PROMOCODE,
            DELETE_PROMOCODE,
            COMMIT_DATA,
        ]),

        async onCommit() {
            try {
                const { panel } = this.$refs;
                if (!panel.validate()) return;

                this.isCommit = true;
                const { paymentUrl, orderId } = await this[COMMIT_DATA]();
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

        const checkoutData = $store.state[CHECKOUT_MODULE][CHECKOUT_DATA];

        if (checkoutData) next();
        else {
            $progress.start();
            Promise.all([
                $store.dispatch(`${CHECKOUT_MODULE}/${FETCH_CHECKOUT_DATA}`, type),
                $store.dispatch(`${CHECKOUT_MODULE}/${FETCH_PROFESSIONS}`),
            ])
                .then(() => next(vm => $progress.finish()))
                .catch(() => next(vm => $progress.fail()));
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

    beforeDestroy() {
        this[CLEAR_CHECKOUT_DATA]();
    },
};
</script>
