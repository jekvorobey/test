<template>
    <general-modal class="mobile-menu" :show-close-btn="false" type="fullscreen" :is-mobile="isTabletLg">
        <template v-slot:header>
            <button
                v-if="!showCategories"
                class="mobile-menu__header-btn mobile-menu__header-btn--close"
                @click="onSetMenu(false)"
            >
                <v-svg name="cross" width="24" height="24" />Меню
            </button>
            <template v-else class="container mobile-menu__header">
                <button class="mobile-menu__header-btn mobile-menu__header-btn--arrow" @click.prevent="onBackClick">
                    <v-svg name="arrow-small" width="24" height="24" />
                    {{ selectedCategoryName }}
                </button>
                <button class="mobile-menu__header-btn" @click="onSetMenu(false)">
                    <v-svg name="cross" width="24" height="24" />
                </button>
            </template>
        </template>
        <template v-slot:content>
            <transition name="fade-in" mode="out-in">
                <div v-if="!showCategories" class="mobile-menu__panel-root">
                    <ul class="mobile-menu__menu">
                        <li
                            class="container mobile-menu__menu-item mobile-menu__menu-item--separator"
                            v-for="(item, index) in headerMenu.items"
                            :key="item.name"
                        >
                            <v-link class="mobile-menu__menu-link" :to="item.url">
                                {{ item.name }}
                            </v-link>
                            <v-link
                                v-if="index === 0"
                                tag="button"
                                class="mobile-menu__menu-btn"
                                @click.prevent="showCategories = true"
                            >
                                <v-svg name="arrow-down" width="24" height="24" />
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item mobile-menu__menu-item--separator">
                            <v-link class="mobile-menu__menu-link" to="/ui-kit">
                                ui-kit
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link tag="button" class="mobile-menu__menu-link" @click="onRegister">
                                <v-svg
                                    class="mobile-menu__menu-link-container"
                                    name="account-middle"
                                    width="24"
                                    height="24"
                                />Личный кабинет
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item" v-if="hasSession">
                            <v-link class="mobile-menu__menu-link" to="/favorites">
                                <span class="mobile-menu__menu-link-container">
                                    <v-svg :name="favoriteItemsIcon" width="24" height="24" />
                                    <span class="mobile-menu__menu-link-count" v-if="hasFavoriteItems">
                                        {{ favoriteItemsCount }}
                                    </span>
                                </span>

                                Избранное
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item mobile-menu__menu-item--separator">
                            <v-link tag="button" class="mobile-menu__menu-link" @click.prevent="onOpenCitySelection">
                                <v-svg class="mobile-menu__menu-link-container" name="pin" width="24" height="24" />
                                <v-clamp :max-lines="2" autoresize>{{ city }}</v-clamp>
                            </v-link>
                            <v-link tag="button" class="mobile-menu__menu-btn" @click.prevent="onOpenCitySelection">
                                <v-svg name="arrow-down" width="24" height="24" />
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link class="mobile-menu__menu-link" to="/">
                                Доставка и оплата
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link class="mobile-menu__menu-link" to="/">
                                Возврат товара
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item mobile-menu__menu-item--separator">
                            <v-link class="mobile-menu__menu-link" to="/">
                                Гарантии
                            </v-link>
                        </li>
                    </ul>
                    <div class="container mobile-menu__menu-socials">
                        <p class="text-grey">Каждый день с 9:00 до 21:00</p>
                        <v-link class="mobile-menu__menu-socials-phone" href="/">
                            8 800 730-12-34
                        </v-link>
                        <p class="text-grey">Всегда отвечаем на ваши сообщения</p>
                        <ul class="mobile-menu__menu-socials-links">
                            <li class="mobile-menu__menu-socials-link">
                                <v-svg name="telegram-bw" width="40" height="40" />
                            </li>
                            <li class="mobile-menu__menu-socials-link">
                                <v-svg name="whatsup-bw" width="40" height="40" />
                            </li>
                            <li class="mobile-menu__menu-socials-link">
                                <v-svg name="viber-bw" width="40" height="40" />
                            </li>
                        </ul>
                    </div>
                </div>

                <transition-group tag="ul" v-else class="mobile-menu__menu" name="fade-in" appear>
                    <li
                        class="container mobile-menu__menu-item mobile-menu__menu-item--separator"
                        v-for="category in currentCategories"
                        :key="category.id"
                    >
                        <v-link class="mobile-menu__menu-link" :to="`/catalog/${category.code}`">
                            {{ category.name }}
                        </v-link>
                        <v-link
                            v-if="category.items && category.items.length > 0"
                            tag="button"
                            class="mobile-menu__menu-btn"
                            @click="onCategoryClick(category)"
                        >
                            <v-svg name="arrow-down" width="24" height="24" />
                        </v-link>
                    </li>
                </transition-group>
            </transition>
        </template>
    </general-modal>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VClamp from 'vue-clamp';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { CATEGORIES } from '@store';
import { HEADER_MENU } from '@store/getters';
import { SET_MENU_OPEN } from '@store/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';
import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { FAVORITE_ITEMS_COUNT } from '@store/modules/Favorites/getters';

import { modalName } from '@enums';
import { productGroupTypes } from '@enums/product';
import '@images/sprites/socials/viber-bw.svg';
import '@images/sprites/socials/whatsup-bw.svg';
import '@images/sprites/socials/telegram-bw.svg';

import '@images/sprites/pin.svg';
import '@images/sprites/account-middle.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/wishlist-full.svg';
import '@images/sprites/arrow-small.svg';
import '@images/sprites/arrow-down.svg';
import './MobileMenu.css';

export default {
    name: 'mobile-menu',

    components: {
        VSvg,
        VLink,
        VSticky,
        VClamp,

        GeneralModal,
    },

    data() {
        return {
            showCategories: false,
            selectedCategories: [],
        };
    },

    computed: {
        ...mapState([CATEGORIES]),
        ...mapGetters([HEADER_MENU]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapGetters(FAVORITES_MODULE, [FAVORITE_ITEMS_COUNT]),
        ...mapState(GEO_MODULE, {
            city: state => (state[SELECTED_CITY] && state[SELECTED_CITY].name) || 'Выберите город',
        }),

        favoriteItemsIcon() {
            return this.hasFavoriteItems ? 'wishlist-full' : 'wishlist-middle';
        },

        hasFavoriteItems() {
            return this[FAVORITE_ITEMS_COUNT] > 0;
        },

        currentCategories() {
            return this.selectedCategory ? this.selectedCategory.items : this.categories;
        },

        selectedCategory() {
            return this.selectedCategories.length > 0
                ? this.selectedCategories[this.selectedCategories.length - 1]
                : null;
        },

        selectedCategoryName() {
            return this.selectedCategory
                ? this.selectedCategory.name
                : this.$t(`productGroups.links.${productGroupTypes.CATALOG}`);
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions([SET_MENU_OPEN]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSetMenu(open) {
            this[SET_MENU_OPEN](open);
        },

        onCategoryClick(item) {
            this.selectedCategories.push(item);
        },

        onOpenCitySelection() {
            this[SET_MENU_OPEN](false);
            this[CHANGE_MODAL_STATE]({ name: modalName.general.CITY_SELECTION, open: true });
        },

        onBackClick() {
            if (this.selectedCategories.length > 0) this.selectedCategories.pop();
            else this.showCategories = false;
        },

        onRegister() {
            if (this[HAS_SESSION]) this.$router.push({ name: 'Cabinet' });
            else this[CHANGE_MODAL_STATE]({ name: modalName.general.LOGIN, open: true });
        },
    },
};
</script>
