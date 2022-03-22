<template>
    <div class="header-top" :class="{ 'header-top--search': search }">
        <div class="container header-top__container">
            <button class="header-top__city" title="Выбрать город" @click="onOpenCitySelection">
                <v-svg name="pin" width="16" height="16" />
                <v-clamp class="header-top__city-name" :max-lines="1" autoresize>{{ city }}</v-clamp>
            </button>

            <div class="header-top__middle">
                <self-router-link
                    class="header-top__middle-item"
                    v-for="link in links"
                    :key="link.id"
                    :to="link.to"
                    same-disabled
                >
                    <v-svg :name="link.icon" width="16" height="16" />{{ link.name }}
                </self-router-link>
            </div>

            <help-panel class="header-top__help">
                {{ $t('header.top.help')
                }}<v-svg name="arrow-down" class="help-panel__icon-arrow" width="20" height="20" />
            </help-panel>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VClamp from 'vue-clamp';
import SelfRouterLink from '@controls/VLink/SelfRouterLink.vue';

import HelpPanel from '@components/HelpPanel/HelpPanel.vue';

import { mapState, mapActions } from 'vuex';
import { SCROLL } from '@store';
import { NAME as SEARCH_MODULE, SEARCH } from '@store/modules/Search';
import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { SET_SELECTED_CITY } from '@store/modules/Geolocation/actions';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName, infoPages } from '@enums';
import '@images/sprites/gift.svg';
import '@images/sprites/box.svg';
import '@images/sprites/delivery.svg';
import '@images/sprites/pin.svg';
import '@images/sprites/arrow-down.svg';
import './HeaderTop.critical.css';
import { productGroupTypes } from '@enums/product';

export default {
    name: 'header-top',

    components: {
        VSvg,
        VClamp,
        SelfRouterLink,

        HelpPanel,
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState(SEARCH_MODULE, [SEARCH]),
        ...mapState(GEO_MODULE, {
            city: (state) => (state[SELECTED_CITY] && state[SELECTED_CITY].name) || 'Выберите город',
        }),

        links() {
            return [
                {
                    id: 1,
                    name: this.$t('header.top.delivery'),
                    to: { name: 'DeliveryAndPayment' },
                    icon: 'delivery',
                },
                {
                    id: 2,
                    name: this.$t('header.top.benefits'),
                    to: { name: 'Catalog', params: { type: productGroupTypes.CATALOG } },
                    icon: 'box',
                },
                {
                    id: 3,
                    to: { name: 'InfoPageStatic', params: { code: infoPages.BONUSES } },
                    name: this.$t('header.top.gifts'),
                    icon: 'gift',
                },
            ];
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(GEO_MODULE, [SET_SELECTED_CITY]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onOpenCitySelection() {
            this[CHANGE_MODAL_STATE]({ name: modalName.general.CITY_SELECTION, open: true });
        },
    },
};
</script>
