<template>
    <section class="section not-found-view">
        <div class="container not-found-view__main">
            <div class="not-found-view__main-body">
                <h1 class="not-found-view__hl">Активация пользователя</h1>
                <p>Изменить статус .</p>
                <div class="not-found-view__main-info">
                    <p>Если у вас возникли вопросы, обратитесь в службу поддержки:</p>
                    <p>
                        <a class="text-bold" href="tel:88007079070">8 800 707-90-70</a>
                        &nbsp;(звонок бесплатный)
                    </p>
                    Или напишите нам на почту <a href="mailto:support@ibt.ru">support@ibt.ru</a>
                </div>
                <v-button class="not-found-view__main-btn" to="/">Активировать</v-button>
            </div>
        </div>

        <section class="section">
            <div class="container">
                <retail-rocket-container data-retailrocket-markup-block="5efda11c97a52833a0d006e7" v-bind:data-auth="hasSession" />
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
import './VerificationCode.css';
import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';
import RetailRocketContainer from '@components/RetailRocketContainer/RetailRocketContainer.vue';


export default {
    name: 'verification-code',
    mixins: [metaMixin],

    components: {
        VButton,
    },

    metaInfo() {
        return {
            title: 'Активация пользователя',
        };
    },

    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FEATURED_MODULE, [FETCH_FEATURED_PRODUCTS]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),


        onPreview(code) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.QUICK_VIEW,
                open: true,
                state: { code },
            });
        },
    },

};
</script>
