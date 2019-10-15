<template>
    <header class="v-header" :class="[{ 'v-header--scroll': scroll }, { 'v-header--search': search }]">
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
                        <div class="v-header__middle-cart-sum">
                            <v-svg name="account-middle" width="18" height="20" />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <v-svg name="wishlist-middle" width="20" height="20" />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="text-medium">15 780 ₽</span>&nbsp;
                            <v-svg name="cart-middle" width="20" height="20" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="v-header__bottom">
                <div class="container v-header__bottom-container">
                    <nav class="v-header__bottom-inner">
                        <!-- захардкоженый линк на каталог -->
                        <v-link class="v-header__bottom-link" to="/catalog/makiyazh-4">
                            {{ $t('header.links.catalog') }}
                        </v-link>
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
                        <v-burger tag="button" class="v-header__bottom-link" :is-open.sync="isOpen" />
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
            <search-panel v-if="search" class="v-header__middle-search-panel" />
        </transition>
    </header>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VBurger from '../controls/VBurger/VBurger.vue';

import SearchPanel from '../SearchPanel/SearchPanel.vue';
import SearchFilter from '../SearchFilter/SearchFilter.vue';

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

import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-header',
    components: {
        VSvg,
        VLink,
        VBurger,

        SearchPanel,
        SearchFilter,
    },

    data() {
        return {
            isOpen: false,
        };
    },

    computed: {
        ...mapState(['scroll']),
        ...mapState('search', ['search']),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions('search', ['SET_SEARCH']),
    },
};
</script>

