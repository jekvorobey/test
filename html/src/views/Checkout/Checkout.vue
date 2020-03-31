<template>
    <section class="section checkout-view">
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
                    <component :is="checkoutPanel" />
                </div>
                <v-sticky class="checkout-view__main-sticky">
                    <template v-slot:sticky>
                        <div class="checkout-view__main-panel">
                            <p v-if="isProduct" class="text-grey checkout-view__main-panel-info">
                                Внимание: мастер-классы можете оплатить после завершения оплаты продуктов
                            </p>
                            <p class="checkout-view__main-panel-line">
                                Сумма заказа: {{ $t(`cart.summary.type.${checkoutType}`) }}
                                <price v-bind="summary.sum" />
                            </p>
                            <!-- #58322  -->
                            <!-- <p class="checkout-view__main-panel-line">
                                Скидка по промокоду <price v-bind="summary.promoDiscount" />
                            </p> -->

                            <template v-if="isProduct">
                                <!-- #58322  -->
                                <!-- <p class="checkout-view__main-panel-line">
                                    Оплата бонусами <price v-bind="summary.bonusDiscount" />
                                </p>
                                <p class="checkout-view__main-panel-line">
                                    Оплата подарочным сертификатом <price v-bind="summary.certDiscount" />
                                </p> -->
                                <p class="checkout-view__main-panel-line">
                                    Доставка <price v-bind="summary.delivery" />
                                </p>
                            </template>

                            <div class="checkout-view__main-panel-total">
                                <p class="text-bold checkout-view__main-panel-line">
                                    Итого <price v-bind="summary.total" />
                                </p>
                                <!-- #58322  -->
                                <!-- <p class="text-grey text-sm checkout-view__main-panel-line">
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
                                <p v-if="isProduct" class="text-grey text-sm checkout-view__main-panel-line">
                                    Будет списано
                                    <span>
                                        {{
                                            summary.bonusSpent > 0
                                                ? `- ${prepareBonus(summary.bonusSpent)}`
                                                : prepareBonus(summary.bonusSpent)
                                        }}
                                        &nbsp;бонусов
                                    </span>
                                </p> -->
                            </div>

                            <!-- #58322  -->
                            <!-- <div v-if="!promocode" class="checkout-view__main-panel-promo">
                                <v-input
                                    v-model="inputPromocode"
                                    class="checkout-view__main-panel-promo-input"
                                    placeholder="Введите промокод"
                                />
                                <v-button
                                    class="btn--outline checkout-view__main-panel-promo-btn"
                                    @click="ADD_PROMOCODE(inputPromocode)"
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
                            </div> -->
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

import CheckoutProductPanel from '@components/checkout/CheckoutProductPanel/CheckoutProductPanel.vue';
import CheckoutMasterClassPanel from '@components/checkout/CheckoutMasterClassPanel/CheckoutMasterClassPanel.vue';

import { $store, $logger, $progress } from '@services';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';
import { CART_ITEMS_COUNT } from '@store/modules/Cart/getters';

import checkoutModule, { NAME as CHECKOUT_MODULE, CHECKOUT_TYPE, CHECKOUT_DATA } from '@store/modules/Checkout';
import { FETCH_CHECKOUT_DATA, ADD_PROMOCODE, DELETE_PROMOCODE, COMMIT_DATA } from '@store/modules/Checkout/actions';
import { CHECKOUT, PROMO_CODE, SUMMARY } from '@store/modules/Checkout/getters';

import { registerModuleIfNotExists } from '@util/store';
import { preparePrice } from '@util';
import { cartItemTypes } from '@enums/product';
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
        ...mapState('route', {
            checkoutType: state => state.params.type,
        }),

        ...mapGetters(CHECKOUT_MODULE, [PROMO_CODE, SUMMARY]),

        isProduct() {
            return this.checkoutType === cartItemTypes.PRODUCT;
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

    methods: {
        ...mapActions(CHECKOUT_MODULE, [FETCH_CHECKOUT_DATA, ADD_PROMOCODE, DELETE_PROMOCODE, COMMIT_DATA]),

        async onCommit() {
            try {
                this.isCommit = true;
                const data = await this[COMMIT_DATA]();
                document.location.href = data.paymentUrl;
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

        //регистрируем модуль, если такого нет
        registerModuleIfNotExists($store, CHECKOUT_MODULE, checkoutModule);
        const { checkoutType } = $store.state[CHECKOUT_MODULE];

        if (checkoutType === type) return next();
        else {
            $progress.start();
            $store.dispatch(`${CHECKOUT_MODULE}/${FETCH_CHECKOUT_DATA}`, type).then(() => {
                next(vm => $progress.finish());
            });
        }
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        const {
            params: { type },
        } = to;

        this.$progress.start();
        this[FETCH_CHECKOUT_DATA](type)
            .then(() => this.$progress.finish())
            .catch(() => this.$progress.fail());
        next();
    },
};
</script>
