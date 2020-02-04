<template>
    <nav class="header-navigation-panel">
        <div class="header-navigation-panel__item header-navigation-panel__item--burger">
            <v-burger
                class="header-navigation-panel__item-burger"
                tag="button"
                :is-open="isMenuOpen"
                @isOpenChanged="SET_MENU_OPEN($event)"
            />
            <v-link to="/catalog">
                {{ $t('header.links.catalog') }}
            </v-link>
        </div>
        <v-link class="header-navigation-panel__item" :to="{ name: 'ProductGroups', params: { type: 'new' } }">
            {{ $t('header.links.new') }}
        </v-link>
        <v-link class="header-navigation-panel__item" :to="{ name: 'ProductGroups', params: { type: 'promo' } }">
            {{ $t('header.links.stocks') }}
        </v-link>
        <v-link class="header-navigation-panel__item" :to="{ name: 'ProductGroups', params: { type: 'sets' } }">
            {{ $t('header.links.collections') }}
        </v-link>
        <v-link class="header-navigation-panel__item" :to="{ name: 'ProductGroups', params: { type: 'brands' } }">
            {{ $t('header.links.brands') }}
        </v-link>
        <v-link class="header-navigation-panel__item" to="/job">
            {{ $t('header.links.classes') }}
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

import './HeaderNavigationPanel.critical.css';

export default {
    name: 'header-navigation-panel',

    components: {
        VLink,
        VBurger,
    },

    computed: {
        ...mapState([SCROLL, IS_MENU_OPEN]),

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
