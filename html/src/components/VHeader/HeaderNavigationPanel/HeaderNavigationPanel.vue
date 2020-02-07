<template>
    <nav class="header-navigation-panel">
        <v-burger
            class="header-navigation-panel__burger"
            tag="button"
            :is-open="isMenuOpen"
            @isOpenChanged="SET_MENU_OPEN($event)"
        />
        <v-link v-for="link in links" :key="link.name" class="header-navigation-panel__item" :to="link.to">
            {{ link.name }}
        </v-link>
    </nav>
</template>

<script>
import VLink from '../../controls/VLink/VLink.vue';
import VBurger from '../../controls/VBurger/VBurger.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { SCROLL, IS_MENU_OPEN } from '../../../store';
import { SET_MENU_OPEN } from '../../../store/actions';

import { NAME as CART_MODULE, CART_ITEMS } from '../../../store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '../../../store/modules/Cart/getters';

import { NAME as MODAL_MODULE } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { productGroupTypes } from '../../../assets/scripts/enums';
import './HeaderNavigationPanel.critical.css';

export default {
    name: 'header-navigation-panel',

    components: {
        VLink,
        VBurger,
    },

    computed: {
        ...mapState([SCROLL, IS_MENU_OPEN]),

        links() {
            return [
                {
                    to: { name: 'Catalog', params: { type: productGroupTypes.CATALOG } },
                    name: this.$t(`productGroups.links.${productGroupTypes.CATALOG}`),
                },
                {
                    to: { name: 'Catalog', params: { type: productGroupTypes.CATALOG } },
                    name: this.$t(`productGroups.links.${productGroupTypes.NEW}`),
                },
                {
                    to: { name: 'ProductGroups', params: { type: productGroupTypes.PROMO } },
                    name: this.$t(`productGroups.links.${productGroupTypes.PROMO}`),
                },
                {
                    to: { name: 'ProductGroups', params: { type: productGroupTypes.SETS } },
                    name: this.$t(`productGroups.links.${productGroupTypes.SETS}`),
                },
                {
                    to: { name: 'ProductGroups', params: { type: productGroupTypes.BRANDS } },
                    name: this.$t(`productGroups.links.${productGroupTypes.BRANDS}`),
                },
                {
                    to: { name: 'ProductGroups', params: { type: productGroupTypes.MASTERCLASSES } },
                    name: this.$t(`productGroups.links.${productGroupTypes.MASTERCLASSES}`),
                },
            ];
        },

        isTabletLg() {
            return this.$mq.isTabletLg;
        },
    },

    methods: {
        ...mapActions([SET_MENU_OPEN]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
    },
};
</script>
