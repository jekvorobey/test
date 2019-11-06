<template>
    <div class="nav-panel" v-scroll-lock="isMenuOpen">
        <div class="container">
            <div class="nav-panel__main">
                <ul class="nav-panel__main-list">
                    <li class="nav-panel__main-list-item" v-for="category in categories" :key="category.id">
                        <v-link class="nav-panel__main-list-title" :to="`/catalog/${category.code}`">
                            {{ category.name }}
                        </v-link>
                        <ul>
                            <li v-for="item in category.items" :key="item.id">
                                <v-link class="nav-panel__main-list-child" :to="`/catalog/${item.code}`">
                                    {{ item.name }}
                                </v-link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <catalog-banner-card
                    class="nav-panel__main-banner"
                    :banner-id="banner.id"
                    :title="banner.title"
                    :image="banner.image"
                    :upper-text="banner.upperText"
                    :btn-text="banner.btnText"
                />
            </div>
        </div>
    </div>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';
import CatalogBannerCard from '../CatalogBannerCard/CatalogBannerCard.vue';

import { CATEGORIES, BANNER, IS_MENU_OPEN } from '../../store';
import { mapState, mapActions } from 'vuex';

import './NavPanel.css';

export default {
    name: 'nav-panel',

    components: {
        VLink,
        CatalogBannerCard,
    },

    computed: {
        ...mapState([BANNER, CATEGORIES, IS_MENU_OPEN]),
    },
};
</script>