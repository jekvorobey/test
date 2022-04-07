<template>
    <section class="section cart-view">
        <v-cart-header />

        <div class="container">
            <h1 class="cart-view__section-hl">
                {{ pageTitle }}
            </h1>
        </div>

        <section class="section cart-view__main">
            <div v-if="cartItemsCount > 0" class="container cart-view__main-container">
                <div class="cart-view__main-tabs">
                    <v-tabs :items="cartTypes" key-field="type" :activeTab.sync="activeTab">
                        <template v-slot:header="{ item: type }">
                            {{ $t(`cart.title.${type.type}`) }}
                            &nbsp;&nbsp;<span class="text-grey">{{ type.items.length }}</span>
                        </template>

                        <template v-slot:panel="{ item: type }">
                            <cart-product-panel
                                v-if="IS_PRODUCT(type)"
                                :items="type.items"
                                :user-professional="userCanBeProfessional"
                            />
                            <cart-masterclass-panel :items="type.items" v-else-if="IS_MASTER_CLASS(type)" />
                        </template>
                    </v-tabs>

                    <!-- <ul
                        class="container container--tablet status-color-error cart-view__main-tabs-errors"
                        v-if="errorStrings && errorStrings.length > 0"
                    >
                        <li v-for="error in errorStrings" :key="error">
                            {{ error }}
                        </li>
                    </ul>

                    <ul
                        class="container container--tablet status-color-warning cart-view__main-tabs-errors"
                        v-if="warningStrings && warningStrings.length > 0"
                    >
                        <li v-for="warning in warningStrings" :key="warning">
                            {{ warning }}
                        </li>
                    </ul> -->

                    <v-link class="cart-view__main-clear" tag="button" @click="openOnClearCart(activeTabItem.type)">
                        <v-svg name="cross-small" width="13" height="13" />
                        &nbsp;&nbsp;Очистить корзину
                    </v-link>
                </div>

                <v-sticky class="cart-view__main-sticky">
                    <template v-slot:sticky>
                        <div class="cart-view__main-panel">
                            <p class="text-grey cart-view__main-panel-info" v-if="attentionMessage">
                                {{ attentionMessage }}
                            </p>

                            <template v-if="isMasterClass || canOrderProducts">
                                <p class="cart-view__main-panel-line">
                                    <span>
                                        Сумма заказа:
                                        <span v-if="showCartType" class="text-lowercase">
                                            {{ activeTabItem && $t(`cart.summary.type.${activeTabItem.type}`) }}
                                        </span>
                                    </span>
                                    <price v-bind="activeTabItem.summary.sum" />
                                </p>

                                <p
                                    class="cart-view__main-panel-line"
                                    v-for="discount in activeTabItem.summary.discounts"
                                    :key="discount.type"
                                >
                                    <template v-if="discount.type === discountType.PRODUCT">
                                        {{ $t(`cart.summary.discount.${discount.type}.${activeTabItem.type}`) }}
                                    </template>
                                    <template v-else>
                                        {{ $t(`cart.summary.discount.${discount.type}`) }}
                                    </template>

                                    <span>-<price v-bind="discount.value" /></span>
                                </p>

                                <div class="cart-view__main-panel-total">
                                    <p class="text-bold cart-view__main-panel-line">
                                        Итого <price v-bind="activeTabItem.summary.total" />
                                    </p>

                                    <p v-if="showBonus" class="text-grey text-sm cart-view__main-panel-line">
                                        Будет начислено
                                        <span>
                                            {{ `+ ${prepareBonus(activeTabItem.summary.bonusGet)}` }}&nbsp;бонусов
                                        </span>
                                    </p>
                                </div>

                                <div v-if="!promocode" class="cart-view__main-panel-promo">
                                    <v-input
                                        class="cart-view__main-panel-promo-input"
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
                                        class="btn--outline cart-view__main-panel-promo-btn"
                                        @click="onAddPromocode"
                                        :disabled="isLoad || isPromocodePending || !inputPromocode"
                                    >
                                        <template v-if="!isPromocodePending">Применить</template>
                                        <v-spinner v-else show height="24" width="24" />
                                    </v-button>
                                </div>
                                <div v-else class="cart-view__main-panel-promo cart-view__main-panel-promo--success">
                                    <div class="cart-view__main-panel-promo-icon">
                                        <v-svg name="check" width="16" height="16" />
                                    </div>

                                    <div>
                                        Промокод&nbsp;{{ promocode }}&nbsp;применён
                                        <v-link
                                            tag="button"
                                            class="cart-view__main-panel-promo-link"
                                            @click="onDeletePromocode"
                                            :disabled="isLoad || isPromocodePending"
                                        >
                                            Отменить
                                        </v-link>
                                    </div>
                                </div>
                            </template>

                            <v-button
                                class="cart-view__main-panel-submit"
                                v-if="!isLoad"
                                @click="loadCheckout"
                                :disabled="isPromocodePending"
                            >
                                Оформить заказ
                            </v-button>
                            <div class="cart-view__main-panel-preloader" v-else>
                                <v-spinner height="30" width="30" show />
                            </div>
                        </div>
                    </template>
                </v-sticky>
            </div>

            <div class="container cart-view__main-container" v-else>
                <div class="cart-view__empty-cart">
                    <v-svg name="cart" width="20" height="24" />

                    <span class="cart-view__empty-cart-message">
                        Вы ещё ничего не добавили в вашу корзину, перейдите в каталог для покупок
                    </span>

                    <v-button class="btn--outline cart-view__empty-cart-btn" to="/catalog">
                        Перейти к покупкам
                    </v-button>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <retail-rocket-container
                    v-if="cartItemsCount > 0"
                    data-retailrocket-markup-block="5f21670e97a5282edc07d7cd"
                    :data-products="activeItemIds"
                    :data-auth="hasSession ? 'true' : 'false'"
                    :data-user-moderation="canBuy ? 'true' : 'false'"
                />
                <retail-rocket-container
                    v-else
                    data-retailrocket-markup-block="5f21671697a5282edc07d7ce"
                    :data-auth="hasSession ? 'true' : 'false'"
                    :data-user-moderation="canBuy ? 'true' : 'false'"
                />
            </div>
        </section>

        <transition name="fade">
            <clear-cart-modal v-if="isClearCartModalOpen" />
        </transition>

        <transition name="fade">
            <cart-non-prof-warning
                v-if="isCartNonProfWarningModalOpen"
                @buy="onNonProfModalBuy"
                @do-moderate="onNonProfModalDoModerate"
            />
        </transition>

        <transition name="fade">
            <portfolio-edit-modal
                v-if="$isServer || isPortfolioEditModalOpen"
                @success-uploaded="onPortfolioEditModalSuccessUploaded"
            />
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VLink from '@controls/VLink/VLink.vue';
import VInput from '@controls/VInput/VInput.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import VSlider from '@controls/VSlider/VSlider.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import Price from '@components/Price/Price.vue';
import VCartHeader from '@components/VCartHeader/VCartHeader.vue';

import CartProductPanel from '@components/cart/CartProductPanel/CartProductPanel.vue';
import CartMasterclassPanel from '@components/cart/CartMasterclassPanel/CartMasterclassPanel.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import ClearCartModal from '@components/ClearCartModal/ClearCartModal.vue';
import CartNonProfWarning from '@components/CartNonProfWarning/CartNonProfWarning.vue';
import PortfolioEditModal from '@components/profile/PortfolioEditModal/PortfolioEditModal.vue';
import VTabs from '@controls/VTabs/VTabs.vue';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE } from '@store/modules/Profile/modules/Cabinet';
import { FETCH_CABINET_DATA } from '@store/modules/Profile/modules/Cabinet/actions';

import RetailRocketContainer from '@components/RetailRocketContainer/RetailRocketContainer.vue';

import { $store, $progress, $logger } from '@services';
import { seoEvents, ProductsBuilder } from '@services/SeoEventsService';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as CART_MODULE, FEATURED_PRODUCTS, CART_DATA } from '@store/modules/Cart';
import {
    FETCH_FEATURED_PRODUCTS,
    DELETE_ALL_ITEMS,
    ADD_PROMOCODE,
    DELETE_PROMOCODE,
    FETCH_CART_DATA,
    SET_LOAD,
    ADD_CART_ITEM,
    CHECK_CART_DATA,
} from '@store/modules/Cart/actions';
import {
    IS_PRODUCT,
    IS_MASTER_CLASS,
    CART_ITEMS_COUNT,
    CART_TYPES,
    PROMO_CODE,
    PROMOCODE_STATUS,
    ERRORS,
    WARNINGS,
} from '@store/modules/Cart/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as AUTH_MODULE, HAS_SESSION, REFERRAL_PARTNER, USER, CAN_BUY } from '@store/modules/Auth';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import metaMixin from '@plugins/meta';
import { cancelRoute } from '@settings';
import { breakpoints, modalName, httpCodes, requestStatus, authMode } from '@enums';
import { discountType } from '@enums/checkout';
import { preparePrice } from '@util';
import '@images/sprites/check.svg';
import '@images/sprites/cart.svg';
import './Cart.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

const sliderOptions = {
    spaceBetween: 24,
    slidesPerView: 4,
    grabCursor: true,
    autoHeight: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    breakpoints: {
        [breakpoints.tabletLg - 1]: {
            slidesPerView: 2.5,
            spaceBetween: 24,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
        },

        [breakpoints.tablet - 1]: {
            slidesPerView: 2,
            spaceBetween: 12,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
        },
    },
};

export default {
    name: 'cart',
    mixins: [metaMixin],

    components: {
        PortfolioEditModal,
        CartNonProfWarning,
        VSvg,
        VButton,
        VLink,
        VInput,
        VTabs,
        VSticky,
        VSlider,
        VSpinner,
        VCartHeader,

        Price,

        CatalogProductCard,
        ClearCartModal,

        CartProductPanel,
        CartMasterclassPanel,

        RetailRocketContainer,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    data() {
        return {
            activeTab: 0,
            promocodeError: null,
            inputPromocode: null,
            isLoad: false,
        };
    },

    computed: {
        ...mapState(CART_MODULE, [FEATURED_PRODUCTS, CART_DATA]),
        ...mapGetters(CART_MODULE, [
            CART_ITEMS_COUNT,
            CART_TYPES,
            IS_PRODUCT,
            IS_MASTER_CLASS,
            PROMO_CODE,
            PROMOCODE_STATUS,
            ERRORS,
            WARNINGS,
        ]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),
        ...mapState(MODAL_MODULE, {
            isClearCartModalOpen: (state) =>
                state[MODALS][modalName.cart.CLEAR_CART] && state[MODALS][modalName.cart.CLEAR_CART].open,
            isCartNonProfWarningModalOpen: (state) =>
                state[MODALS][modalName.cart.CART_NON_PROF_WARNING] &&
                state[MODALS][modalName.cart.CART_NON_PROF_WARNING].open,
            isPortfolioEditModalOpen: (state) =>
                state[MODALS][modalName.profile.PORTFOLIO_EDIT] && state[MODALS][modalName.profile.PORTFOLIO_EDIT].open,
        }),

        errorStrings() {
            const errors = this[ERRORS] || [];
            return errors.map((e) => this.$t(`validation.cart.${e}`));
        },

        warningStrings() {
            const warnings = this[WARNINGS] || [];
            return warnings.map((e) => this.$t(`validation.cart.${e}`));
        },

        pageTitle() {
            const { activeTabItem } = this;
            return activeTabItem ? `Моя корзина - ${this.$t(`cart.title.${activeTabItem.type}`)}` : 'Моя корзина';
        },

        sliderOptions() {
            return sliderOptions;
        },

        activeTabItem() {
            return this.cartTypes[this.activeTab];
        },

        activeItemIds() {
            const { activeTabItem = {} } = this;
            const { items = [] } = activeTabItem;
            return items.map((i) => i.p.id).join(',');
        },

        attentionMessage() {
            const types = this[CART_TYPES] || [];
            return types.length === 2 && 'Внимание: продукты и мастер-классы оплачиваются отдельно';
        },

        showCartType() {
            return this[CART_TYPES] && this[CART_TYPES].length === 2;
        },

        isProduct() {
            const { activeTabItem } = this;
            return this[IS_PRODUCT](activeTabItem);
        },

        isMasterClass() {
            const { activeTabItem } = this;
            return this[IS_MASTER_CLASS](activeTabItem);
        },

        isPromocodePending() {
            return this[PROMOCODE_STATUS] === requestStatus.PENDING;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        showBonus() {
            return !this.referralPartner && this.activeTabItem.summary.bonusGet > 0;
        },

        canOrderProducts() {
            if (typeof this.cartData.product !== 'undefined' && this.cartData.product) {
                return (
                    this.cartData.product.items.filter((cartItem) => {
                        return cartItem.p.userCanBuy === true;
                    }).length > 0
                );
            } else {
                return false;
            }
        },

        userCanBeProfessional() {
            let canBe = false;

            if (this[HAS_SESSION] && typeof this.cartData.product !== 'undefined') {
                this.cartData.product.items.forEach((product) => {
                    if (product.p.isOnlyForProfessional === true && product.p.userCanBuy === true) {
                        canBe = true;
                    }
                });
            }

            return canBe;
        },

        cartHaveProfessionalProducts() {
            let have = false;

            if (typeof this.cartData.product !== 'undefined') {
                this.cartData.product.items.forEach((product) => {
                    if (product.p.isOnlyForProfessional === true) {
                        have = true;
                    }
                });
            }

            return have;
        },
    },

    watch: {
        [HAS_SESSION](value) {
            if (!value) this.$router.replace(cancelRoute.path);
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),
        ...mapActions(CABINET_MODULE_PATH, [FETCH_CABINET_DATA]),
        ...mapActions(CART_MODULE, [
            FETCH_CART_DATA,
            CHECK_CART_DATA,
            FETCH_FEATURED_PRODUCTS,
            DELETE_ALL_ITEMS,
            ADD_PROMOCODE,
            DELETE_PROMOCODE,
            ADD_CART_ITEM,
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

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onAddToCart(item) {
            const { code, stock, id, variantGroups } = item;

            if (variantGroups) this.onPreview(code);
            else this[ADD_CART_ITEM]({ offerId: id, storeId: stock && stock.storeId });
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.QUICK_VIEW,
                open: true,
                state: { code },
            });
        },

        openOnClearCart(type) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.cart.CLEAR_CART,
                open: true,
                state: { type },
            });
        },

        prepareBonus(value) {
            return preparePrice(value);
        },

        async onNonProfModalBuy() {
            this.$store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                name: modalName.cart.CART_NON_PROF_WARNING,
                open: false,
            });

            try {
                this.isLoad = true;
                await this[CHECK_CART_DATA]();
                this.$router.push({ name: 'Checkout', params: { type: this.activeTabItem.type } });
            } catch (error) {
                this.isLoad = false;
            }
        },

        async onNonProfModalDoModerate() {
            this.$store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                name: modalName.cart.CART_NON_PROF_WARNING,
                open: false,
            });

            await this[FETCH_CABINET_DATA](this.$isServer);

            this.$store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                name: modalName.profile.PORTFOLIO_EDIT,
                open: true,
            });
        },

        async onPortfolioEditModalSuccessUploaded() {
            await this[FETCH_CART_DATA](this.$isServer);

            if (this.userCanBeProfessional) {
                this.isLoad = true;
                await this[CHECK_CART_DATA]();
                this.$router.push({ name: 'Checkout', params: { type: this.activeTabItem.type } });
            }
        },

        async loadCheckout() {
            try {
                const hasSession = this.$store.state[AUTH_MODULE][HAS_SESSION];

                if (hasSession) {
                    if (this.isProduct && !this.userCanBeProfessional && this.cartHaveProfessionalProducts) {
                        if (!this.canOrderProducts) {
                            await this[FETCH_CABINET_DATA](this.$isServer);

                            this.$store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                                name: modalName.profile.PORTFOLIO_EDIT,
                                open: true,
                            });
                        } else {
                            this.$store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                                name: modalName.cart.CART_NON_PROF_WARNING,
                                open: true,
                            });
                        }
                    } else {
                        this.isLoad = true;
                        await this[CHECK_CART_DATA]();
                        this.$router.push({ name: 'Checkout', params: { type: this.activeTabItem.type } });
                    }
                } else {
                    this.$store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                        name: modalName.general.AUTH,
                        open: true,
                        state: {
                            activeTab: authMode.LOGIN,
                            registrationSuccessRedirect: false,
                        },
                    });
                }
            } catch (error) {
                this.isLoad = false;
            }
        },
    },

    async serverPrefetch() {
        try {
            await this[FETCH_CART_DATA](this.$isServer);
        } catch (error) {
            $logger.log(error);
        }
    },

    beforeRouteEnter(to, from, next) {
        function proceed() {
            if ($store.state[CART_MODULE]) {
                const { load } = $store.state[CART_MODULE];
                if (load) $store.dispatch(`${CART_MODULE}/${SET_LOAD}`, false);

                $progress.start();
                $store
                    .dispatch(`${CART_MODULE}/${FETCH_CART_DATA}`)
                    .then(() => next(() => $progress.finish()))
                    .catch(() => next(() => $progress.fail()));
            }
        }
        if ($store.state[CART_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[CART_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },

    created() {
        this.discountType = discountType;
    },

    mounted() {
        const { load } = $store.state[CART_MODULE];

        if (load) {
            $store.dispatch(`${CART_MODULE}/${SET_LOAD}`, false);
            return;
        }

        $progress.start();
        $store
            .dispatch(`${CART_MODULE}/${FETCH_CART_DATA}`)
            .then(() => () => $progress.finish())
            .catch(() => () => $progress.fail());

        this[FETCH_FEATURED_PRODUCTS]();

        if (this.cartData.product) {
            const products = new ProductsBuilder().createForCheckout(this.cartData.product.items);
            seoEvents.checkout(products, 1);
        }
    },
};
</script>
