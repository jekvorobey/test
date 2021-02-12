<template>
    <section class="section product-view" :class="{ 'product-view--scroll': scroll }">
        <breadcrumbs class="container university-view__breadcrumbs">
            <breadcrumb-item key="main" to="/">
                <v-svg v-if="isTablet" name="home" width="10" height="10" />
                <span v-else>Главная</span>
            </breadcrumb-item>
            <breadcrumb-item key="no-main" to="/giftcard">Подарочные сертификаты</breadcrumb-item>
        </breadcrumbs>

        <section class="section">
            <div class="container product-view__header">
                <v-sticky class="product-view__header-sticky">
                    <template v-slot:sticky>
                        <div class="product-view__header-container">
                            <div class="product-view__header-gallery">
                                <div class="product-view__header-gallery-item product-view__header-gallery-item--empty">
                                    <div class="gift-card-view">
                                        <div class="gift-card-view__card" v-if="design.preview">
                                            <div class="gift-card-view__image">
                                                <img :src="design.preview" alt="certificate" />
                                            </div>
                                            <div class="gift-card-view__price">
                                                <price :value="nominal.price" :currency="'RUB'" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </v-sticky>

                <v-sticky class="product-view__header-detail">
                    <template v-slot:sticky>
                        <!-- Title and ratings -->
                        <product-detail-panel
                            class="product-view__header-detail-info"
                            :title="cardTitle"
                            :reviews-count="reviewsCount"
                            :vendor-code="card.vendorCode"
                            :rating="rating"
                            @rating-click="onScrollTo($refs.reviews, !isTabletLg ? 64 : isTablet ? -24 : -48)"
                        />

                        <product-option-panel
                            class="product-view__header-detail-section product-view__header-detail-options"
                            :header="'Выберите номинал карты'"
                        >
                            <div class="product-view__header-detail-options-tags">
                                <product-option-tag
                                    class="product-view__header-detail-options-item"
                                    v-for="option in nominals"
                                    :key="'pot' + option.id"
                                    :selected="nominal.id === option.id"
                                    @click="onNominalSelect(option)"
                                >
                                    <price :value="option.price" :currency="'RUB'" />
                                </product-option-tag>
                            </div>
                        </product-option-panel>

                        <product-option-panel
                            class="product-view__header-detail-section product-view__header-detail-options"
                            :header="'Выберите дизайн'"
                        >
                            <div class="product-view__header-detail-options-colors">
                                <card-design-tag
                                    class="product-view__header-detail-options-item"
                                    v-for="option in nominal.designs"
                                    :key="'cdt-' + option.id"
                                    :code="option.id"
                                    :preview="option.preview"
                                    :selected="design.id === option.id"
                                    @click="onDesignSelect(option)"
                                />
                            </div>
                        </product-option-panel>

                        <div class="product-cart-panel">
                            <div class="product-cart-panel__controls product-cart-panel__controls--card">
                                <v-button
                                    class="product-cart-panel__btn product-cart-panel__controls-btn"
                                    @click="openShowGiftCardModal()"
                                    :disabled="isLoading"
                                >
                                    Купить
                                </v-button>

                                <div class="product-cart-panel__info-prices">
                                    <price
                                        class="text-bold product-cart-panel__info-current"
                                        :value="nominal.price"
                                        :currency="'RUB'"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="product-view__header-detail-section">
                            <p v-html="rules"></p>
                        </div>
                    </template>
                </v-sticky>
            </div>
        </section>

        <section class="section product-view__section">
            <div class="container product-view__socials">
                <div class="product-view__socials-inner">
                    <div class="product-view__socials-statistics">
                        <div>
                            <v-svg name="cart-empty" width="24" height="24" />
                        </div>
                        <div>
                            <div>{{ buyPersonText }}</div>
                            <div class="text-grey">за последние 2 месяца</div>
                        </div>
                    </div>
                    <div class="product-view__socials-share">
                        <span class="text-bold">Поделиться</span>&nbsp;

                        <social-sharing v-bind="socialSharing" inline-template>
                            <div :style="{ display: 'flex' }">
                                <network class="network" network="vk">
                                    <v-svg name="vkontakte-bw" width="24" height="24" />
                                </network>
                                <network class="network" network="facebook">
                                    <v-svg name="facebook-bw" width="24" height="24" />
                                </network>
                            </div>
                        </social-sharing>
                    </div>
                </div>
            </div>
        </section>

        <section class="section product-view__section product-view__info" v-if="description">
            <div class="container product-view__info-container">
                <div id="description" class="hook" />
                <div v-if="description" class="product-view__info-part product-view__info-part--50">
                    <div class="product-view__info-header">
                        <h2 class="product-view__section-hl">{{ $t('product.title.description') }}</h2>
                        <p class="product-view__info-text" v-html="description"></p>
                    </div>
                </div>
            </div>
        </section>

        <section ref="reviews" class="section product-view__section product-view__reviews">
            <div class="container">
                <reviews-panel class="product-view__reviews-panel" v-bind="reviewData" ref="reviewPanel" />
            </div>
        </section>

        <featured-products />

        <recently-viewed-products />

        <transition name="fade">
            <gift-card-modal
                v-if="isModalOpen"
                :design-code="design.id"
                :nominal-id="nominal.id"
                :preview="design.preview"
                :price="nominal.price"
            />
        </transition>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import { authMode, modalName } from '@enums';
import { SCROLL } from '@store';

import '@images/sprites/home.svg';
import '@images/sprites/cart-empty.svg';
import './GiftCard.css';
import './ProductCartPanel.css';

import VSticky from '@controls/VSticky/VSticky.vue';
import ProductDetailPanel from '@components/product/ProductDetailPanel/ProductDetailPanel.vue';
import ProductOptionPanel from '@components/product/ProductOptionPanel/ProductOptionPanel.vue';
import CardDesignTag from '@components/giftcard/CardDesignTag/CardDesignTag.vue';
import RecentlyViewedProducts from '@components/giftcard/RecentlyViewedProducts/RecentlyViewedProducts.vue';
import FeaturedProducts from '@components/giftcard/FeaturedProducts/FeaturedProducts.vue';
import ProductOptionTag from '@components/product/ProductOptionTag/ProductOptionTag.vue';
import Price from '@components/Price/Price.vue';
import ReviewsPanel from '@components/reviews/ReviewsPanel/ReviewsPanel.vue';
import GiftCardModal from '@components/giftcard/GiftCardModal/GiftCardModal.vue';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { mapActions, mapState } from 'vuex';
import { $http } from '@services';
import { cartItemTypes } from '@enums/product.js';
import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';
import { preparePrice } from '@util';

export default {
    name: 'GiftCard',

    components: {
        VButton,
        Breadcrumbs,
        BreadcrumbItem,
        VSticky,
        ProductDetailPanel,
        ProductOptionPanel,
        CardDesignTag,
        ProductOptionTag,
        Price,
        GiftCardModal,
        ReviewsPanel,
        RecentlyViewedProducts,
        FeaturedProducts,
    },

    data: () => ({
        rules: '',
        description: '',
        nominals: [],
        nominal: {
            price: 0,
        },
        design: {
            preview: '',
        },
        card: {
            title: 'Электронный подарочный сертификат',
            vendorCode: '',
            nominals: [],
            designs: [],
        },
        socialSharing: {},
        isLoading: false,
        reviewData: {
            type: 'certificate',
            code: '1c',
            canAdd: true,
        },
        buyPersonAmount: 0,
    }),

    computed: {
        ...mapState([SCROLL]),

        ...mapState(MODAL_MODULE, {
            isModalOpen: (state) => state[MODALS][modalName.TICKET_EDIT] && state[MODALS][modalName.TICKET_EDIT].open,
        }),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),

        productType() {
            return cartItemTypes.CERTIFICATE;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
        buyPersonText() {
            if (this.buyPersonAmount === 0) {
                return 'Пока никто не купил товар';
            }
            const man = this.declOfNum(this.buyPersonAmount, ['человек', 'человека', 'человек']);
            const buy = this.buyPersonAmount > 1 ? 'купили' : 'купил';
            return this.buyPersonAmount + ' ' + man + ' уже ' + buy + ' этот товар';
        },
        cardTitle() {
            const postfix = this.nominal.price ? ', ' + preparePrice(this.nominal.price) + ' ₽' : '';
            return this.card.title + postfix;
        },
        reviewsCount() {
            return this.$refs['reviewPanel'] ? this.$refs['reviewPanel'].range : 0;
        },
        rating() {
            return this.$refs['reviewPanel'] ? this.$refs['reviewPanel'].rating : 0;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onNominalSelect(option) {
            this.nominal = option;
            if (option.designs.map((item) => item.id).indexOf(this.design.id) === -1) {
                this.onDesignSelect(option.designs[0] || { preview: '' });
            }
        },

        onDesignSelect(option) {
            this.design = option;
        },

        openShowGiftCardModal() {
            if (this[HAS_SESSION]) {
                this[CHANGE_MODAL_STATE]({
                    name: modalName.TICKET_EDIT,
                    open: true,
                    state: {},
                });
            } else {
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.AUTH,
                    open: true,
                    state: {
                        activeTab: authMode.LOGIN,
                    },
                });
            }
        },

        onScrollTo(ref, offset = 0) {
            window.scrollTo({ top: ref.offsetTop + offset, behavior: 'smooth' });
        },

        declOfNum(n, titles) {
            return titles[
                n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
            ];
        },
    },

    beforeMount() {
        $http.get('/v1/certificate/dictionary').then((response) => {
            this.rules = response.content.rules;
            this.description = response.content.description;
            this.nominals = response.nominals;
            this.nominal = response.nominals[0];
            this.design = response.nominals[0].designs[0] || { preview: '' };
            this.buyPersonAmount = response.buyPersonAmount || 0;
        });
    },
};
</script>

<style>
.product-detail-panel__info-code {
    display: none;
}

.product-view__header-detail-brand-link {
    margin-left: 23px;
}

.university-view__breadcrumbs .breadcrumb-item {
    color: #7d7d7d !important;
}
</style>
