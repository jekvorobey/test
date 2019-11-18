<template>
    <general-modal class="mobile-menu" :show-close-btn="false" type="fullscreen">
        <template v-slot:header>
            <button
                v-if="!showCategories"
                class="mobile-menu__header-btn mobile-menu__header-btn--close"
                @click="SET_MENU_OPEN(false)"
            >
                <v-svg name="cross" width="24" height="24" />Меню
            </button>
            <template v-else class="container mobile-menu__header">
                <button class="mobile-menu__header-btn mobile-menu__header-btn--arrow" @click.prevent="onBackClick">
                    <v-svg name="arrow-small" width="24" height="24" />
                    {{ selectedCategory ? selectedCategory.name : $t('header.links.catalog') }}
                </button>
                <button class="mobile-menu__header-btn" @click="SET_MENU_OPEN(false)">
                    <v-svg name="cross" width="24" height="24" />
                </button>
            </template>
        </template>
        <template v-slot:content>
            <transition name="fade-in" mode="out-in">
                <div v-if="!showCategories" class="mobile-menu__panel-root">
                    <ul class="mobile-menu__menu">
                        <li class="container mobile-menu__menu-item mobile-menu__menu-item--separator">
                            <v-link class="mobile-menu__menu-link" to="/catalog">
                                {{ $t('header.links.catalog') }}
                            </v-link>
                            <v-link tag="button" class="mobile-menu__menu-btn" @click.prevent="showCategories = true">
                                <v-svg name="arrow-down" width="24" height="24" />
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link class="mobile-menu__menu-link" to="/top">
                                {{ $t('header.links.new') }}
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link class="mobile-menu__menu-link" to="/new">
                                {{ $t('header.links.stocks') }}
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link class="mobile-menu__menu-link" to="/show">
                                {{ $t('header.links.collections') }}
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link class="mobile-menu__menu-link" to="/ask">
                                {{ $t('header.links.brands') }}
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link class="mobile-menu__menu-link" to="/job">
                                {{ $t('header.links.classes') }}
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item mobile-menu__menu-item--separator">
                            <v-link class="mobile-menu__menu-link" to="/ui-kit">
                                ui-kit
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link class="mobile-menu__menu-link" to="/">
                                <v-svg name="account-middle" width="18" height="20" />Личный кабинет
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item">
                            <v-link class="mobile-menu__menu-link" to="/">
                                <v-svg name="wishlist-middle" width="20" height="18" /> Избранное
                            </v-link>
                        </li>
                        <li class="container mobile-menu__menu-item mobile-menu__menu-item--separator">
                            <v-link class="mobile-menu__menu-link" to="/">
                                <v-svg name="pin" width="24" height="24" /> Москва
                            </v-link>
                            <v-link tag="button" class="mobile-menu__menu-btn" @click.prevent="showCategories = true">
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
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VSticky from '../controls/VSticky/VSticky.vue';
import GeneralModal from '../GeneralModal/GeneralModal.vue';

import { CATEGORIES } from '../../store';
import { SET_MENU_OPEN } from '../../store/actions';
import { mapState, mapActions } from 'vuex';

import '../../assets/images/sprites/socials/viber-bw.svg';
import '../../assets/images/sprites/socials/whatsup-bw.svg';
import '../../assets/images/sprites/socials/telegram-bw.svg';

import '../../assets/images/sprites/pin.svg';
import '../../assets/images/sprites/account-middle.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import '../../assets/images/sprites/arrow-small.svg';
import '../../assets/images/sprites/arrow-down.svg';
import '../../assets/images/sprites/cross.svg';
import './MobileMenu.css';

export default {
    name: 'mobile-menu',

    components: {
        VSvg,
        VLink,
        VSticky,

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

        currentCategories() {
            return this.selectedCategory ? this.selectedCategory.items : this.categories;
        },

        selectedCategory() {
            return this.selectedCategories.length > 0
                ? this.selectedCategories[this.selectedCategories.length - 1]
                : null;
        },
    },

    methods: {
        ...mapActions([SET_MENU_OPEN]),

        onCategoryClick(item) {
            this.selectedCategories.push(item);
        },

        onBackClick() {
            if (this.selectedCategories.length > 0) this.selectedCategories.pop();
            else this.showCategories = false;
        },
    },
};
</script>