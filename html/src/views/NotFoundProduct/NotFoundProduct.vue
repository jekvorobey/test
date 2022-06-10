<template>
    <section class="section not-found-view">
        <div class="container not-found-view__main">
            <div class="not-found-view__main-body">
                <p>К сожалению, товар закончился или временно не доступен.</p>
                <div class="not-found-view__main-info">
                    <p>Если у вас возникли вопросы, обратитесь в службу поддержки:</p>
                    <p>
                        <a class="text-bold" href="tel:+74951396428">+7 495 139-64-28</a>
                        &nbsp;(звонок бесплатный)
                    </p>
                    Или напишите нам на почту <a href="mailto:support@ibt.ru">support@ibt.ru</a>
                </div>
                <v-button class="not-found-view__main-btn" to="/">На главную страницу</v-button>
            </div>
        </div>

        <section class="section">
            <div class="container">
                <retail-rocket-container
                    data-retailrocket-markup-block="5efda11c97a52833a0d006e7"
                    :data-auth="hasSession ? 'true' : 'false'"
                    :data-user-moderation="canBuy ? 'true' : 'false'"
                />
            </div>
        </section>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VSlider from '@controls/VSlider/VSlider.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as FEATURED_MODULE, FEATURED_PRODUCTS } from '@store/modules/Featured';
import { FETCH_FEATURED_PRODUCTS } from '@store/modules/Featured/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import metaMixin from '@plugins/meta';
import { breakpoints, modalName } from '@enums';
import './NotFoundProduct.css';

import {NAME as AUTH_MODULE, HAS_SESSION, CAN_BUY, USER} from '@store/modules/Auth';
import RetailRocketContainer from '@components/RetailRocketContainer/RetailRocketContainer.vue';

const sliderOptions = {
    spaceBetween: 24,
    slidesPerView: 4,
    grabCursor: true,

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
    name: 'not-found',
    mixins: [metaMixin],

    components: {
        RetailRocketContainer,
        VButton,
        VSlider,

        CatalogProductCard,
    },

    metaInfo() {
        return {
            title: '404 - страница не найдена',
        };
    },

    computed: {
        ...mapState(FEATURED_MODULE, [FEATURED_PRODUCTS]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        sliderOptions() {
            return sliderOptions;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FEATURED_MODULE, [FETCH_FEATURED_PRODUCTS]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onAddToCart(item) {
            const { code, type, stock, id, variantGroups } = item;

            if (variantGroups) this.onPreview(code);
            else
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.ADD_TO_CART,
                    open: true,
                    state: { offerId: id, storeId: stock && stock.storeId, type },
                });
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.QUICK_VIEW,
                open: true,
                state: { code },
            });
        },

    },

    beforeMount() {
        this[FETCH_FEATURED_PRODUCTS]();
    },
};
</script>
