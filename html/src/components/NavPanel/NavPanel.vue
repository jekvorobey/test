<template>
    <div class="nav-panel" v-scroll-lock="isMenuOpen">
        <div class="container">
            <div class="nav-panel__main">
                <group-list class="nav-panel__main-list" :items="categoriesCatalog" />
                <!-- <catalog-banner-card class="nav-panel__main-banner" :item="banner" /> -->
            </div>
        </div>
    </div>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VExpander from '@controls/VExpander/VExpander.vue';

import GroupList from '@components/GroupList/GroupList.vue';
import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';

import { BANNER, IS_MENU_OPEN } from '@store';
import { CATEGORIES_CATALOG } from '@store/getters';
import { mapState, mapGetters } from 'vuex';

import './NavPanel.css';

export default {
    name: 'nav-panel',

    components: {
        GroupList,
        CatalogBannerCard,
    },

    computed: {
        ...mapState([BANNER, IS_MENU_OPEN]),
        ...mapGetters([CATEGORIES_CATALOG]),
    },
};
</script>