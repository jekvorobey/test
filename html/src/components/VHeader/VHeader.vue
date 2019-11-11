<template>
    <header
        class="v-header"
        :class="[{ 'v-header--scroll': scroll }, { 'v-header--masked': showMask }, { 'v-header--search': search }]"
    >
        <div class="v-header__desktop">
            <div class="v-header__top">
                <div class="container v-header__top-container">
                    <button class="text-medium v-header__top-city" title="Выбрать город">
                        Москва&nbsp;<v-svg name="arrow-down" width="20" height="20" />
                    </button>
                    <div class="v-header__top-middle">
                        <span class="v-header__top-middle-item">
                            <v-svg name="truck" width="16" height="16" />{{ $t('header.top.delivery') }}
                        </span>
                        <span class="v-header__top-middle-item">
                            <v-svg name="box" width="16" height="16" />{{ $t('header.top.benefits') }}
                        </span>
                        <span class="v-header__top-middle-item">
                            <v-svg name="gift" width="16" height="16" />{{ $t('header.top.gifts') }}
                        </span>
                    </div>
                    <button class="text-medium v-header__top-help" title="Помощь">
                        {{ $t('header.top.help') }}<v-svg name="arrow-down" width="20" height="20" />
                    </button>
                </div>
            </div>
            <div class="v-header__middle" v-if="!scroll">
                <div class="container v-header__middle-container">
                    <search-filter input-id="desktop-search" class="v-header__middle-search" />

                    <div v-if="!search" class="text-sm text-grey v-header__middle-middle">
                        <v-link class="v-header__middle-middle-link" to="/">
                            <v-svg name="logo-text" width="341" height="35" />
                        </v-link>
                        <span class="v-header__middle-middle-text">
                            {{ $t('header.middle.professionals') }}
                        </span>
                    </div>

                    <div v-show="!search" class="v-header__middle-cart">
                        <v-svg class="v-header__middle-cart-item" name="account-middle" width="18" height="20" />
                        <v-svg class="v-header__middle-cart-item" name="wishlist-middle" width="20" height="20" />
                        <div class="v-header__middle-cart-item">
                            <span class="text-medium v-header__middle-cart-sum">15 780 ₽</span>&nbsp;
                            <v-link class="text-medium v-header__middle-cart-icon" to="/cart">
                                <v-svg name="cart-middle" width="20" height="24" />
                                <span class="text-bold v-header__middle-cart-count">{{ itemsCount }}</span>
                            </v-link>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!search" class="v-header__bottom">
                <div class="container v-header__bottom-container">
                    <nav class="v-header__bottom-inner">
                        <div class="v-header__bottom-menu">
                            <v-burger
                                class="v-header__bottom-menu-burger"
                                tag="button"
                                :is-open="isMenuOpen"
                                @isOpenChanged="SET_MENU_OPEN($event)"
                            />
                            <v-link to="/catalog">
                                {{ $t('header.links.catalog') }}
                            </v-link>
                        </div>
                        <v-link class="v-header__bottom-link" to="/top">{{ $t('header.links.new') }}</v-link>
                        <v-link class="v-header__bottom-link" to="/new">{{ $t('header.links.stocks') }}</v-link>
                        <v-link class="v-header__bottom-link" to="/show">{{ $t('header.links.collections') }}</v-link>
                        <v-link class="v-header__bottom-link" to="/ask">{{ $t('header.links.brands') }}</v-link>
                        <v-link class="v-header__bottom-link" to="/job">{{ $t('header.links.classes') }}</v-link>
                        <v-link class="v-header__bottom-link" to="/ui-kit">ui-kit</v-link>
                    </nav>
                </div>
            </div>
        </div>
        <div class="v-header__bottom v-header__mobile">
            <transition name="fade-in" mode="out-in">
                <div key="search" v-if="search" class="container v-header__bottom-container v-header__mobile-container">
                    <search-filter input-id="mobile-search" class="v-header__bottom-search" />
                </div>
                <div key="menu" v-else class="container v-header__bottom-container v-header__mobile-container">
                    <div class="v-header__bottom-left">
                        <v-burger
                            tag="button"
                            class="v-header__bottom-link"
                            :is-open="isMenuOpen"
                            @isOpenChanged="SET_MENU_OPEN($event)"
                        />
                    </div>
                    <div class="v-header__bottom-middle">
                        <v-link class="v-header__bottom-link" to="/">
                            <v-svg name="logo" width="24" height="24" />
                        </v-link>
                    </div>
                    <div class="v-header__bottom-right">
                        <v-link tag="button" class="v-header__bottom-link" @click="SET_SEARCH(true)">
                            <v-svg name="search-middle" width="20" height="20" />
                        </v-link>
                        <v-link class="v-header__bottom-link" to="/">
                            <v-svg name="cart-middle" width="20" height="20" />
                        </v-link>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="v-header__mask" v-if="showMask">
                <search-panel v-if="search" />
                <nav-panel v-else-if="isMenuOpen" />
            </div>
        </transition>
        <transition name="fade">
            <mobile-menu class="v-header__modal-menu" v-if="isMenuOpen && isTabletLg" />
        </transition>
    </header>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VBurger from '../controls/VBurger/VBurger.vue';

import SearchPanel from '../SearchPanel/SearchPanel.vue';
import SearchFilter from '../SearchFilter/SearchFilter.vue';
import NavPanel from '../NavPanel/NavPanel.vue';
import MobileMenu from '../MobileMenu/MobileMenu.vue';

import { mapState, mapActions } from 'vuex';
import { SCROLL, IS_MENU_OPEN, CATEGORIES } from '../../store';
import { SET_MENU_OPEN } from '../../store/actions';

import { NAME as CART_MODULE, CART_ITEMS } from '../../store/modules/Cart';

import { NAME as SEARCH_MODULE, SEARCH } from '../../store/modules/Search';
import { SET_SEARCH } from '../../store/modules/Search/actions';

import '../../assets/images/sprites/logo.svg';
import '../../assets/images/sprites/logo-text.svg';

import '../../assets/images/sprites/search-middle.svg';
import '../../assets/images/sprites/cart-middle.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import '../../assets/images/sprites/account-middle.svg';

import '../../assets/images/sprites/gift.svg';
import '../../assets/images/sprites/box.svg';
import '../../assets/images/sprites/truck.svg';
import '../../assets/images/sprites/arrow-down.svg';

import './VHeader.critical.css';
import './VHeader.css';

export default {
    name: 'v-header',
    components: {
        VSvg,
        VLink,
        VBurger,

        SearchPanel,
        SearchFilter,
        NavPanel,
        MobileMenu,
    },

    computed: {
        ...mapState([SCROLL, IS_MENU_OPEN]),
        ...mapState(SEARCH_MODULE, [SEARCH]),
        ...mapState(CART_MODULE, {
            itemsCount: state => (state[CART_ITEMS] ? state[CART_ITEMS].length : 0),
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        showMask() {
            return this[SEARCH] || (this[IS_MENU_OPEN] && !this.isTabletLg);
        },
    },

    methods: {
        ...mapActions([SET_MENU_OPEN]),
        ...mapActions(SEARCH_MODULE, [SET_SEARCH]),
    },

    watch: {
        search(value) {
            if (value) this[SET_MENU_OPEN](false);
        },
    },
};
</script>

