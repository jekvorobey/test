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

            <template v-if="isTabletLg && !isTablet">
                <router-link class="mobile-menu__header-logo" to="/">
                    <v-svg name="logo-text" width="278" height="28" />
                </router-link>

                <div class="mobile-menu__header-menu">
                    <search-filter class="mobile-menu__header-search" input-id="modal-filter" />
                    <header-user-panel class="mobile-menu__header-user" />
                </div>
            </template>
        </template>
        <template v-slot:content>
            <div class="container mobile-menu__container" v-if="!isTablet">
                <div class="mobile-menu__panel">
                    <ul class="mobile-menu__list mobile-menu__panel-part">
                        <group-list
                            class="nav-panel__main-list"
                            :items="categoriesCatalog"
                            :columns="3"
                            @link-click="onHandleClick"
                        />
                    </ul>
                </div>
                <div class="mobile-menu__panel">
                    <div class="mobile-menu__panel-part">
                        <ul class="mobile-menu__list">
                            <li class="mobile-menu__menu-item" v-for="item in headerMenuItems" :key="item.name">
                                <v-link class="mobile-menu__menu-link" :to="item.url" @click="onSetMenu(false)">
                                    {{ item.name }}
                                </v-link>
                            </li>
                        </ul>
                        <ul class="mobile-menu__list">
                            <li class="mobile-menu__menu-item">
                                <v-link
                                    tag="button"
                                    class="mobile-menu__menu-link mobile-menu__menu-link--full"
                                    @click="onRegister"
                                >
                                    <v-svg
                                        class="mobile-menu__menu-link-container"
                                        name="account-middle"
                                        width="24"
                                        height="24"
                                    />Личный кабинет
                                </v-link>
                            </li>
                            <li class="mobile-menu__menu-item">
                                <v-link
                                    class="mobile-menu__menu-link mobile-menu__menu-link--full"
                                    :to="{ name: 'Favorites' }"
                                    @click="onSetMenu(false)"
                                >
                                    <span class="mobile-menu__menu-link-container">
                                        <v-svg :name="favoriteItemsIcon" width="24" height="24" />
                                        <span class="mobile-menu__menu-link-count" v-if="hasFavoriteItems">
                                            {{ favoriteItemsCount }}
                                        </span>
                                    </span>

                                    Избранное
                                </v-link>
                            </li>
                            <li class="mobile-menu__menu-item">
                                <v-link
                                    tag="button"
                                    class="mobile-menu__menu-link"
                                    @click.prevent="onOpenCitySelection"
                                >
                                    <v-svg class="mobile-menu__menu-link-container" name="pin" width="24" height="24" />
                                    <v-clamp :max-lines="2" autoresize>{{ city }}</v-clamp>
                                </v-link>
                            </li>
                            <li class="mobile-menu__menu-item" v-for="item in helpMenu.items" :key="item.name">
                                <v-link
                                    class="mobile-menu__menu-link mobile-menu__menu-link--full"
                                    :to="item.url"
                                    @click="onSetMenu(false)"
                                >
                                    {{ item.name }}
                                </v-link>
                            </li>
                        </ul>
                        <div class="mobile-menu__menu-socials">
                            <p class="text-grey">Ежедневно с 9:00 до 21:00</p>
                            <v-link class="mobile-menu__menu-socials-phone" href="tel:88007079070">
                                8 800 707-90-70
                            </v-link>
                            <p class="text-grey">Всегда отвечаем на ваши сообщения</p>

                            <ul class="mobile-menu__menu-socials-links">
                                <li class="mobile-menu__menu-socials-link" v-for="link in links" :key="link.href">
                                    <v-link
                                        class="mobile-menu__menu-socials-icon"
                                        :href="link.href"
                                        :title="link.title"
                                        @mouseover="link.hover = true"
                                        @mouseleave="link.hover = false"
                                        target="_blank"
                                        rel="nofollow noreferrer noopener"
                                    >
                                        <v-svg :name="link.hover ? link.iconHover : link.icon" width="40" height="40" />
                                    </v-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <transition v-else name="fade-in" mode="out-in">
                <div v-if="!showCategories" class="mobile-menu__panel-root">
                    <ul class="mobile-menu__menu">
                        <li
                            class="container mobile-menu__menu-item mobile-menu__menu-item--separator"
                            v-for="(item, index) in headerMenuItems"
                            :key="item.name"
                        >
                            <v-link
                                v-if="index === 0"
                                class="mobile-menu__menu-link"
                                :class="{ 'mobile-menu__menu-link--full': index !== 0 }"
                                tag="button"
                                @click="showCategories = true"
                            >
                                {{ item.name }}
                            </v-link>
                            <v-link
                                v-else
                                class="mobile-menu__menu-link"
                                :to="item.url"
                                :class="{ 'mobile-menu__menu-link--full': index !== 0 }"
                                @click="onSetMenu(false)"
                            >
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
                        <li class="container mobile-menu__menu-item">
                            <v-link
                                tag="button"
                                class="mobile-menu__menu-link mobile-menu__menu-link--full"
                                @click="onRegister"
                            >
                                <v-svg
                                    class="mobile-menu__menu-link-container"
                                    name="account-middle"
                                    width="24"
                                    height="24"
                                />Личный кабинет
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link
                                class="mobile-menu__menu-link mobile-menu__menu-link--full"
                                :to="{ name: 'Favorites' }"
                                @click="onSetMenu(false)"
                            >
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
                        <li
                            class="container mobile-menu__menu-item"
                            :class="{ 'mobile-menu__menu-item--separator': index === helpMenu.items.length - 1 }"
                            v-for="(item, index) in helpMenu.items"
                            :key="item.name"
                        >
                            <v-link
                                class="mobile-menu__menu-link mobile-menu__menu-link--full"
                                :to="item.url"
                                @click="onSetMenu(false)"
                            >
                                {{ item.name }}
                            </v-link>
                        </li>
                    </ul>
                    <div class="container mobile-menu__menu-socials">
                        <p class="text-grey">Ежедневно с 9:00 до 21:00</p>
                        <v-link class="mobile-menu__menu-socials-phone" href="tel:88007079070">
                            8 800 707-90-70
                        </v-link>
                        <p class="text-grey">Всегда отвечаем на ваши сообщения</p>

                        <ul class="mobile-menu__menu-socials-links">
                            <li class="mobile-menu__menu-socials-link" v-for="link in links" :key="link.href">
                                <v-link
                                    class="mobile-menu__menu-socials-icon"
                                    :href="link.href"
                                    :title="link.title"
                                    @mouseover="link.hover = true"
                                    @mouseleave="link.hover = false"
                                    target="_blank"
                                    rel="nofollow noreferrer noopener"
                                >
                                    <v-svg :name="link.hover ? link.iconHover : link.icon" width="40" height="40" />
                                </v-link>
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
                        <v-link
                            class="mobile-menu__menu-link"
                            :to="category.url"
                            :class="{ 'mobile-menu__menu-link--final': !(category.items && category.items.length) }"
                            @click="onSetMenu(false)"
                        >
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
import VClamp from 'vue-clamp';

//import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import HeaderUserPanel from '@components/VHeader/HeaderUserPanel/HeaderUserPanel.vue';
import SearchFilter from '@components/SearchFilter/SearchFilter.vue';
import GroupList from '@components/GroupList/GroupList.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { CATEGORIES } from '@store';
import { HEADER_MENU, HELP_MENU, CATEGORIES_CATALOG } from '@store/getters';
import { SET_MENU_OPEN } from '@store/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';
import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { FAVORITE_ITEMS_COUNT } from '@store/modules/Favorites/getters';

import { modalName, authMode } from '@enums';
import { productGroupTypes } from '@enums/product';
import { generateCategoryUrl } from '@util/catalog';
import '@images/sprites/socials/telegram.svg';
import '@images/sprites/socials/telegram-hover.svg';
import '@images/sprites/socials/viber.svg';
import '@images/sprites/socials/viber-hover.svg';
import '@images/sprites/socials/vkontakte.svg';
import '@images/sprites/socials/vkontakte-hover.svg';
import '@images/sprites/socials/ok-rounded.svg';
import '@images/sprites/socials/ok-rounded-hover.svg';

import '@images/sprites/pin.svg';
import '@images/sprites/account-middle.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/wishlist-full.svg';
import '@images/sprites/arrow-small.svg';
import '@images/sprites/arrow-down.svg';
import '@images/sprites/logo-text.svg';
import './MobileMenu.css';

export default {
    name: 'mobile-menu',

    components: {
        VSvg,
        VLink,
        VClamp,

        GeneralModal,
        //CatalogBannerCard,
        HeaderUserPanel,
        SearchFilter,
        GroupList,
    },

    data() {
        return {
            showCategories: false,
            selectedCategories: [],

            links: [
                {
                    href: 'tg://resolve?domain=Bessovestnyj_bot',
                    title: 'Связаться с нами в Telegram',
                    hover: false,
                    icon: 'telegram',
                    iconHover: 'telegram-hover',
                },
                {
                    href: 'viber://pa/?chatURI=ibtru',
                    title: 'Связаться с нами в Viber',
                    hover: false,
                    icon: 'viber',
                    iconHover: 'viber-hover',
                },
                {
                    href: 'https://vk.me/bessovestnotalantlivy',
                    title: 'Связаться с нами в VK',
                    hover: false,
                    icon: 'vkontakte',
                    iconHover: 'vkontakte-hover',
                },
                {
                    href: 'https://ok.ru/group/62240588693625/messages',
                    title: 'Связаться с нами в OK',
                    hover: false,
                    icon: 'ok-rounded',
                    iconHover: 'ok-rounded-hover',
                },
            ],
        };
    },

    computed: {
        ...mapState([CATEGORIES]),
        ...mapGetters([HEADER_MENU, HELP_MENU]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapGetters(FAVORITES_MODULE, [FAVORITE_ITEMS_COUNT]),
        ...mapGetters([CATEGORIES_CATALOG]),
        ...mapState(GEO_MODULE, {
            city: (state) => (state[SELECTED_CITY] && state[SELECTED_CITY].name) || 'Выберите город',
        }),

        favoriteItemsIcon() {
            return this.hasFavoriteItems ? 'wishlist-full' : 'wishlist-middle';
        },

        hasFavoriteItems() {
            return this[FAVORITE_ITEMS_COUNT] > 0;
        },

        currentCategories() {
            const categories = this.selectedCategory ? this.selectedCategory.items : this.categories;
            return categories.map((c) => ({ ...c, url: generateCategoryUrl(productGroupTypes.CATALOG, null, c.code) }));
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

        headerMenuItems() {
            const { isTablet, headerMenu: { items = [] } = {} } = this;
            return !isTablet ? items.filter((i) => i.url && !i.url.includes('/catalog')) : items;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
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

        onHandleClick() {
            this[SET_MENU_OPEN](false);
        },

        onRegister() {
            if (this[HAS_SESSION]) {
                const profileRoute = { name: 'Cabinet' };
                const { href } = this.$router.resolve(profileRoute);
                if (href !== this.$route.fullPath) this.$router.push(profileRoute);
                else this.onSetMenu(false);
            } else {
                this.onSetMenu(false);
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.AUTH,
                    open: true,
                    state: {
                        activeTab: authMode.LOGIN,
                    },
                });
            }
        },
    },
};
</script>
