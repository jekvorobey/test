<template>
    <nav class="header-navigation-panel">
        <v-burger
            class="header-navigation-panel__burger"
            :is-open="isMenuOpen"
            btn-text="Меню"
            @isOpenChanged="SET_MENU_OPEN($event)"
        />
        <template v-for="item in headerMenu.items">
            <v-link
                v-if="item.url === '/catalog/'"
                class="header-navigation-panel__item"
                :to="item.url"
                :key="item.name"
            >
                <span @click.stop.prevent="onToggleMenu">{{ item.name }}</span>
            </v-link>
            <v-link class="header-navigation-panel__item" :class="{'scroll-size': scroll && isDesktop}" v-else :key="item.name" :to="item.url" same-disabled>
                {{ item.name }}
            </v-link>
        </template>
    </nav>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VBurger from '@controls/VBurger/VBurger.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { SCROLL, IS_MENU_OPEN } from '@store';
import { HEADER_MENU } from '@store/getters';
import { SET_MENU_OPEN } from '@store/actions';

import { NAME as CART_MODULE, CART_ITEMS } from '@store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '@store/modules/Cart/getters';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { productGroupTypes } from '@enums/product';
import './HeaderNavigationPanel.critical.css';

export default {
    name: 'header-navigation-panel',
    props: {
        scroll: {
            type: Boolean,
            default: false
        }
    },
    components: {
        VLink,
        VBurger,
    },

    computed: {
        ...mapState([SCROLL, IS_MENU_OPEN]),
        ...mapGetters([HEADER_MENU]),

        isTabletLg() {
            return this.$mq.isTabletLg;
        },

        isTablet() {
            return this.$mq.isTablet;
        },

        isDesktop() {
            return this.$mq.desktop;
        },
    },

    methods: {
        ...mapActions([SET_MENU_OPEN]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onToggleMenu() {
            const isMenuOpen = this[IS_MENU_OPEN];
            this[SET_MENU_OPEN](!isMenuOpen);
        },
    },
};
</script>
