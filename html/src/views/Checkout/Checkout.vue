<template>
    <section class="section checkout-view">
        <div class="container">
            <div class="checkout-view__header">
                <h1 class="checkout-view__header-hl">
                    Оформление заказа: Продукты
                </h1>
                <v-link class="checkout-view__header-link" to="/cart">
                    <v-svg name="arrow-small" width="24" height="24" />&nbsp;&nbsp;Вернуться в корзину
                </v-link>
            </div>
        </div>

        <section class="section checkout-view__main">
            <div class="container checkout-view__main-container">
                <div class="checkout-view__main-body">
                    <product-checkout-panel v-if="checkoutType === 'product'" />
                </div>
                <v-sticky class="checkout-view__main-sticky">
                    <template v-slot:sticky>
                        <div class="checkout-view__main-panel">
                            <p class="text-grey checkout-view__main-panel-info">
                                Внимание: мастер-классы можете оплатить после завершения оплаты продуктов
                            </p>
                            <p class="checkout-view__main-panel-line">
                                Сумма заказа: {{ $t(`cart.checkout.type.${activeTabItem.type}`) }}
                                <span>{{ activeTabItem.checkout.sum }}</span>
                            </p>
                            <p class="checkout-view__main-panel-line">
                                Скидка по промокоду <span>{{ activeTabItem.checkout.discount }}</span>
                            </p>

                            <div class="checkout-view__main-panel-total">
                                <p class="text-bold checkout-view__main-panel-line">
                                    Итого <span>{{ activeTabItem.checkout.total }}</span>
                                </p>
                                <p class="text-grey text-sm checkout-view__main-panel-line">
                                    Будет начислено <span>{{ activeTabItem.checkout.bonus }}</span>
                                </p>
                            </div>

                            <div class="checkout-view__main-panel-promo">
                                <v-input class="checkout-view__main-panel-promo-input" placeholder="Введите промокод" />
                                <v-button class="btn--outline checkout-view__main-panel-promo-btn">
                                    Применить
                                </v-button>
                            </div>
                            <v-button class="checkout-view__main-panel-submit">
                                Перейти к оплате
                            </v-button>
                        </div>
                    </template>
                </v-sticky>
            </div>
        </section>

        <section class="section">
            <div class="container"></div>
        </section>

        <section class="section">
            <div class="container"></div>
        </section>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VLink from '../../components/controls/VLink/VLink.vue';
import VInput from '../../components/controls/VInput/VInput.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VSticky from '../../components/controls/VSticky/VSticky.vue';

import ProductCheckoutPanel from '../../components/checkout/ProductCheckoutPanel/ProductCheckoutPanel.vue';

import { $store, $logger, $progress } from '../../services/ServiceLocator';

import { mapState, mapActions } from 'vuex';
import { NAME as CART_MODULE, CART_DATA } from '../../store/modules/Cart';

import checkoutModule, { NAME as CHECKOUT_MODULE, CHECKOUT_DATA, CHECKOUT_TYPE } from '../../store/modules/Checkout';
import { FETCH_CHECKOUT_DATA, FETCH_ADDRESSES } from '../../store/modules/Checkout/actions';

import '../../assets/images/sprites/arrow-small.svg';
import './Checkout.css';

export default {
    name: 'checkout',

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VSticky,

        ProductCheckoutPanel,
    },

    computed: {
        ...mapState(CART_MODULE, [CART_DATA]),
        ...mapState(CHECKOUT_MODULE, [CHECKOUT_DATA, CHECKOUT_TYPE]),
        ...mapState('route', {
            checkoutType: state => state.params.type,
        }),

        activeTabItem() {
            const {
                params: { type },
            } = this.$route;
            return this[CART_DATA][type] || {};
        },
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [FETCH_ADDRESSES]),
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const register = !!$store._modulesNamespaceMap[`${CHECKOUT_MODULE}/`];
        if (!register)
            $store.registerModule(CHECKOUT_MODULE, checkoutModule, {
                preserveState: !!$store.state.checkout,
            });

        const {
            params: { type },
        } = to;

        const { checkoutType } = $store.state.checkout;

        if (checkoutType === type) next();
        else {
            $progress.start();
            $store
                .dispatch(`${CHECKOUT_MODULE}/${FETCH_CHECKOUT_DATA}`, type)
                .then(() => next(vm => $progress.finish()));
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

        const { checkoutType } = $store.state.checkout;

        if (checkoutType !== type) {
            this.$progress.start();
            this.$store.dispatch(`${CHECKOUT_MODULE}/${FETCH_CHECKOUT_DATA}`, type).then(() => this.$progress.finish());
        }
        next();
    },

    beforeRouteLeave(to, from, next) {
        // this.$progress.start();
        // this.$store
        //     .dispatch(`${landingModule.name}/FETCH_LANDING_DATA`)
        //     .then(() => next(vm => this.$progress.finish()));

        next();
    },
};
</script>
