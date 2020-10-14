<template>
    <div class="cart-header-user-panel">
        <router-link
            class="cart-header-user-panel__link"
            :class="{ 'cart-header-user-panel__link--hidden': hideLink }"
            to="/"
        >
            Вернуться к покупкам
        </router-link>

        <help-panel class="cart-header-user-panel__help">
            {{ $t('header.top.help') }}
            <v-svg name="arrow-down" class="help-panel__icon-arrow" width="20" height="20" />
        </help-panel>

        <template v-if="hasSession">
            <div class="cart-header-user-panel__controls">
                <profile-navigation-panel class="cart-header-user-panel__account">
                    <button @click.prevent="onRegister" class="cart-header-user-panel__btn">
                        <v-svg name="account-middle" width="24" height="24" />
                    </button>
                </profile-navigation-panel>

                <favorites-panel
                    v-if="!hideFavorites"
                    :all-favorites="allFavorites"
                    :is-load-more="isLoadMore"
                    @fetchFavorites="fetchFavorites"
                >
                    <button class="cart-header-user-panel__btn cart-header-user-panel__favorite" @click="onToFavorites">
                        <v-svg :name="favoriteItemsIcon" width="24" height="24" />
                        <span class="cart-header-user-panel__btn-count" v-if="hasFavoriteItems">
                            {{ favoriteItemsCount }}
                        </span>
                    </button>
                </favorites-panel>
            </div>
        </template>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import HelpPanel from '@components/HelpPanel/HelpPanel.vue';
import ProfileNavigationPanel from '@components/ProfileNavigationPanel/ProfileNavigationPanel.vue';
import FavoritesPanel from '@components/FavoritesPanel/FavoritesPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, CAN_BUY } from '@store/modules/Auth';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as FAVORITES_MODULE, FAVORITES } from '@store/modules/Favorites';
import { FAVORITE_ITEMS_COUNT } from '@store/modules/Favorites/getters';
import { FETCH_FAVORITES } from '@store/modules/Favorites/actions';

import { modalName, authMode } from '@enums';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/wishlist-full.svg';
import '@images/sprites/account-middle.svg';
import '@images/sprites/arrow-down.svg';
import './CartHeaderUserPanel.css';

export default {
    name: 'header-cart-user-panel',

    components: {
        VSvg,

        ProfileNavigationPanel,
        HelpPanel,
        FavoritesPanel,
    },

    props: {
        hideLink: {
            type: Boolean,
            default: false,
        },

        hideFavorites: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            allFavorites: [],
            isLoadMore: true,
        };
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [FAVORITE_ITEMS_COUNT]),

        ...mapState(FAVORITES_MODULE, [FAVORITES]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),

        favoriteItemsIcon() {
            return this.hasFavoriteItems ? 'wishlist-full' : 'wishlist-middle';
        },

        hasFavoriteItems() {
            return this[FAVORITE_ITEMS_COUNT] > 0;
        },
    },

    async mounted() {
        await this.fetchFavorites(1);
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [FETCH_FAVORITES]),

        onRegister() {
            if (this[HAS_SESSION]) this.$router.push({ name: 'Cabinet' });
            else
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.AUTH,
                    open: true,
                    state: {
                        activeTab: authMode.LOGIN,
                    },
                });
        },

        async fetchFavorites(page) {
            await this[FETCH_FAVORITES]({
                page,
                orderField: 'price',
                orderDirection: 'desc',
            });

            this.allFavorites = [...this.allFavorites, ...this.favorites];
            if (!this.favorites.length || this.favorites.length < 12) {
                this.isLoadMore = false;
            }
        },

        onToFavorites() {
            this.$router.push({ name: 'Favorites' });
        },
    },
};
</script>
