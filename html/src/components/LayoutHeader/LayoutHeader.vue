<template>
    <header class="header" :class="[{ 'header--scroll': scroll }]">
        <div class="header__desktop">
            <div class="header__top">
                <div class="container header__top-container">
                    <button class="text-medium header__top-city" title="Выбрать город">
                        Москва&nbsp;<v-svg name="arrow-down" width="20" height="20" />
                    </button>
                    <div class="header__top-middle">
                        <span class="header__top-middle-item">
                            <v-svg name="truck" width="16" height="16" />{{ $t('header.top.delivery') }}
                        </span>
                        <span class="header__top-middle-item">
                            <v-svg name="box" width="16" height="16" />{{ $t('header.top.benefits') }}
                        </span>
                        <span class="header__top-middle-item">
                            <v-svg name="gift" width="16" height="16" />{{ $t('header.top.gifts') }}
                        </span>
                    </div>
                    <button class="text-medium header__top-help" title="Помощь">
                        {{ $t('header.top.help') }}<v-svg name="arrow-down" width="20" height="20" />
                    </button>
                </div>
            </div>
            <div class="header__middle">
                <div class="container header__middle-container">
                    <search-filter class="header__middle-search" />

                    <div v-if="!search && scroll" class="text-sm text-grey header__middle-middle">
                        <span class="header__middle-middle-item">
                            <v-svg name="logo" width="32" height="32" />
                        </span>
                    </div>

                    <div v-else-if="!search" class="text-sm text-grey header__middle-middle">
                        <span class="header__middle-middle-item" v-html="$t('header.middle.platform')" />
                        <span class="header__middle-middle-item">
                            <v-svg name="logo-text" width="115" height="42" />
                        </span>
                        <span class="header__middle-middle-item" v-html="$t('header.middle.professionals')" />
                    </div>

                    <transition name="fade-in">
                        <div v-if="!search" class="header__middle-cart">
                            <div class="header__middle-cart-sum">
                                <v-svg name="account-middle" width="20" height="20" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <v-svg name="wishlist-middle" width="20" height="20" style="fill: #ffffff;" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="text-medium">15 780 ₽</span>&nbsp;
                                <v-svg name="cart-middle" width="20" height="20" style="fill: #ffffff;" />
                            </div>
                            <transition name="slide-in-bottom">
                                <div v-if="!scroll" class="text-sm text-grey header__middle-cart-discount">
                                    {{ $t('header.middle.free_delivery', { n: 890 }) }}
                                </div>
                            </transition>
                        </div>
                    </transition>
                </div>
            </div>
            <div class="header__bottom">
                <div class="container header__bottom-container">
                    <nav class="header__bottom-inner">
                        <v-link class="header__bottom-link" to="/top">{{ $t('header.links.new') }}</v-link>
                        <v-link class="header__bottom-link" to="/new">{{ $t('header.links.stocks') }}</v-link>
                        <v-link class="header__bottom-link" to="/show">{{ $t('header.links.collections') }}</v-link>
                        <v-link class="header__bottom-link" to="/ask">{{ $t('header.links.brands') }}</v-link>
                        <v-link class="header__bottom-link" to="/job">{{ $t('header.links.classes') }}</v-link>
                        <v-link class="header__bottom-link" to="/ui-kit">ui-kit</v-link>
                    </nav>
                </div>
            </div>
        </div>
        <div class="header__mobile">
            <div class="container header__mobile-container">
                <button>lalal</button>
                <div>lalal</div>
            </div>
        </div>
    </header>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';

import SearchFilter from '../SearchFilter/SearchFilter.vue';

import '../../assets/images/sprites/logo.svg';
import '../../assets/images/sprites/logo-text.svg';

import '../../assets/images/sprites/cart-middle.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import '../../assets/images/sprites/account-middle.svg';

import '../../assets/images/sprites/gift.svg';
import '../../assets/images/sprites/box.svg';
import '../../assets/images/sprites/truck.svg';
import '../../assets/images/sprites/arrow-down.svg';

import './LayoutHeader.critical.css';
import './LayoutHeader.css';

import { mapState } from 'vuex';

export default {
    name: 'layout-header',
    components: {
        VSvg,
        VLink,

        SearchFilter,
    },

    data() {
        return {};
    },

    computed: {
        ...mapState(['scroll', 'search']),
    },

    methods: {},
};
</script>

